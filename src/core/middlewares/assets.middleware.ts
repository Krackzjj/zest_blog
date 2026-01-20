import { join } from "path";
import { ZestEnv } from "@/main.tsx";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

export const registerAssets = (app: Hono<ZestEnv>) => {
  const root = './';

  app.use("/public/*", async (c, next) => {
    await next();
    if (c.res.ok) {
      c.res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
  });

  app.use("/public/*", serveStatic({ root: root }));

  /** Favicon */
  app.use("/favicon.ico", serveStatic({ path: join(root, "public/favicon.png") }));
  app.use("/favicon.png", serveStatic({ path: join(root, "public/favicon.png") }));

  app.use(
    "/js/*",
    serveStatic({
      root: join(root, "public/scripts"),
      rewriteRequestPath: (path) => path.replace(/^\/js/, ""),
    })
  );

  app.use(
    "/images/*",
    serveStatic({
      root: join(root, "public/assets/images"),
      rewriteRequestPath: (path) => path.replace(/^\/images/, ""),
    })
  );

  app.use(
    "/css/*",
    serveStatic({
      root: join(root, "public/styles"),
      rewriteRequestPath: (path) => path.replace(/^\/css/, ""),
    })
  );
};
