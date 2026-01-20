import { Hono } from "hono";
import { serve } from "@hono/node-server";

import { Child } from "hono/jsx";
import { registerRenderer } from "@core/middlewares/renderer.middleware.ts";
import { registerAssets } from "@core/middlewares/assets.middleware.ts";
import { registerLogger } from "@core/middlewares/logs.middleware.ts";
import type { ThemeName } from "@shared/schemas/ui.schema.ts";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import AppRouter from "@modules/shared.module.ts";
import EventEmitter from "events";
import { streamSSE } from "hono/streaming";
import { watch } from "fs";
import { handleError, handleNotFound } from "@core/errors/handler.tsx";

export type ZestEnv = {
  Variables: {
    "zest-render": (view: Child, meta: PageMetadata) => Promise<Response>;
    "themes-registry": Set<ThemeName>;
  };
};

const app = new Hono<ZestEnv>();
const hmrEvents = new EventEmitter();
hmrEvents.setMaxListeners(20);

//1. SSE Endpoint
app.get("/__hmr", (c) => {
  return streamSSE(c, async (stream) => {
    await stream.writeSSE({ data: "connected" });

    const listener = (data: string) => {
      stream.writeSSE({ data });
    };

    hmrEvents.on("hmr-message", listener);

    stream.onAbort(() => {
      hmrEvents.off("hmr-message", listener);
    });

    while (true) {
      await stream.sleep(30000);
      await stream.writeSSE({ data: "ping" });
    };
  });
});

//2. Surveillance
if (process.env.NODE_ENV !== "production") {
  let debounceTimer: NodeJS.Timeout | undefined;

  watch("./public", { recursive: true }, (enventType, filename) => {
    if (!filename) return;
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (filename.endsWith(".css")) {
        console.log(`✨ CSS mis à jour dans public : ${filename}`);
      }

      hmrEvents.emit("hmr-message", JSON.stringify({
        type: "style",
        path: filename
      }));
    }, 100);
  });
};


registerAssets(app);
registerRenderer(app);
registerLogger(app);

app.route("/", AppRouter);
app.notFound(handleNotFound);
app.onError(handleError)

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
