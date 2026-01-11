import { Hono } from "hono";
import { Renderer } from "@core/renderer/Renderer.tsx";
import { ZestEnv } from "@/main.tsx";
import { Child } from "hono/jsx";
import { PageMetadata } from "@/shared/schemas/html.schema.ts";

export const registerRenderer = (app: Hono<ZestEnv>)=> {
    app.use("*", async (c, next) => {
        const renderer = new Renderer();
    
        c.set('zest-render', async (view: Child, meta: PageMetadata) => {
            const html = await renderer.render(c, view, meta);
            return c.html(html);
        });
    
        await next();
    });
}