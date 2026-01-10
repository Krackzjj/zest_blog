import { ZestEnv } from "@/main.tsx";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

export const registerAssets = (app: Hono<ZestEnv>) => {
  /** Favicon */
  app.use("/favicon.ico", serveStatic({ path: "./public/favicon.svg" }));
  app.get("/favicon.ico", (c) => c.redirect("/favicon.svg", 301));

  app.use(
    "/assets/core/*",
    serveStatic({
      root: "./",
      rewriteRequestPath: (path) =>
        path.replace(/^\/assets\/core/, "src/core/themes"),
    })
  );

  app.use(
    "/assets/core/fonts/*",
    serveStatic({
      root: "./",
      rewriteRequestPath: (path) =>
        path.replace(/^\/assets\/core\/fonts/, "src/core/themes/"),
    })
  );

  app.use(
    "/assets/themes/*",
    serveStatic({
      root: "./",
      rewriteRequestPath: (path) =>
        path.replace(/^\/assets\/themes/, "src/core/themes"),
    })
  );
};
