import { ZestEnv } from "@/main.tsx";
import { Hono } from "hono";

export const registerLogger = (app: Hono<ZestEnv>) => {
  app.use("*", async (c, next) => {
    const start = performance.now();
    await next();
    const end = performance.now();
    console.log(
      `[${c.req.method}] ${c.req.url} - ${(end - start).toFixed(2)}ms`
    );
  });
};
