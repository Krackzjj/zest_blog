import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import { Child } from "hono/jsx";
import { registerRenderer } from "@core/middlewares/renderer.middleware.ts";
import { registerAssets } from "@core/middlewares/assets.middleware.ts";
import { registerLogger } from "@core/middlewares/logs.middleware.ts";
import { FontName, ScriptName, ThemeName } from "./shared/schemas/ui.schema.ts";
import AppRouter from "@modules/shared.module.ts";

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
