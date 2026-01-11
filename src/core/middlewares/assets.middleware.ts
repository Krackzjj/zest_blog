import { join } from "node:path";
import { ZestEnv } from "@/main.tsx";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

export const registerAssets = (app: Hono<ZestEnv>) => {

  const root = process.cwd();
  /** Favicon */
  app.use("/favicon.ico", serveStatic({ path: join(root,"public/favicon.svg") }));
  app.use("/favicon.svg", serveStatic({ path: join(root,"public/favicon.svg") }));

  app.use(
    "/assets/core/*",
    serveStatic({
      root,
      rewriteRequestPath: (path) => {
        const newPath = path.replace(/^\/assets\/core/, "src/core/themes");
        return newPath;
      },
    })
  );

  app.use(
    "/assets/core/fonts/*",
    serveStatic({
      root,
      rewriteRequestPath: (path) =>
        path.replace(/^\/assets\/core\/fonts/, "src/core/themes/"),
    })
  );

  app.use(
    "/assets/themes/*",
    serveStatic({
      root,
      rewriteRequestPath: (path) =>
        path.replace(/^\/assets\/themes/, "src/core/themes"),
    })
  );
};
