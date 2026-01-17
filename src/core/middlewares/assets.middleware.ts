import { join } from "path";
import { ZestEnv } from "@/main.tsx";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

export const registerAssets = (app: Hono<ZestEnv>) => {
  const root = './';

  app.use("/public/*", serveStatic({ root: './' }));

  /** Favicon */
  app.use("/favicon.ico", serveStatic({ path: join(root, "public/favicon.svg") }));
  app.use("/favicon.svg", serveStatic({ path: join(root, "public/favicon.svg") }));

  app.use(
    "/assets/core/*",
    serveStatic({
      root,
      rewriteRequestPath: (path) => path.replace(/^\/assets\/core/, "src/core/themes"),
    })
  );

  app.use(
    "/assets/themes/*",
    serveStatic({
      root,
      rewriteRequestPath: (path) => path.replace(/^\/assets\/themes/, "src/core/themes"),
    })
  );

  app.use(
    "/assets/fonts/*",
    serveStatic({
      root,
      rewriteRequestPath: (path) => path.replace(/^\/assets\/fonts/, "src/core/themes/fonts"),
    })
  );
};
