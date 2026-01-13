import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import { Child } from "hono/jsx";
import { registerRenderer } from "@core/middlewares/renderer.middleware.ts";
import { registerAssets } from "@core/middlewares/assets.middleware.ts";
import { registerLogger } from "@core/middlewares/logs.middleware.ts";
import { FontName, ScriptName, ThemeName } from "./shared/schemas/ui.schema.ts";
import AppRouter from "@modules/shared.module.ts";
import EventEmitter from "node:events";
import { streamSSE } from "hono/streaming";
import { watch } from "node:fs";

export type ZestEnv = {
  Variables: {
    "zest-render": (view: Child, meta: PageMetadata) => Promise<Response>;
    "fonts-registry": Set<FontName>;
    "scripts-registry": Set<ScriptName>;
    "styles-registry": Set<any>; //TODO: Pour les composants....
    "themes-registry": Set<ThemeName>;
  };
};

const app = new Hono<ZestEnv>();
const hmrEvents = new EventEmitter();

hmrEvents.setMaxListeners(20);
app.get("/__hmr", (c) => {
  return streamSSE(c, async (stream) => {
    await stream.writeSSE({ data: "connected", event: "ping" });
    const listener = (data: string) => {
      stream.writeSSE({ data, event: 'message' });
    };

    hmrEvents.on('reload', listener);

    stream.onAbort(() => {
      hmrEvents.off('reload', listener);
    });

    while (true) {
      await stream.sleep(30000)
    }
  })
});

if (process.env.NODE_ENV !== 'production') {
  // Cette syntaxe récupère automatiquement le bon type (Number ou Timer object)
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  watch('./src/core/themes', { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.css')) {
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const normalizedFile = filename.replace(/\\/g, '/');
        console.log(`✨ Style modifié : ${normalizedFile}`);
        hmrEvents.emit('reload', JSON.stringify({ file: normalizedFile }));
        debounceTimer = null;
      }, 50);
    }
  });
}



registerAssets(app);
registerRenderer(app);
registerLogger(app);

app.route("/", AppRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
    hostname: "127.0.0.1",
  },
  (info) => {
    console.log(
      `🚀 Serveur Zest lancé sur http://${info.address}:${info.port}`
    );
  }
);

export default app;
