import { Hono } from "hono";
import { Renderer } from "@core/renderer/Renderer.tsx";
import { ZestEnv } from "@/main.tsx";
import { Child } from "hono/jsx";
import { PageMetadata } from "@/shared/schemas/html.schema.ts";

export const registerRenderer = (app: Hono<ZestEnv>)=> {
    app.use("*", async (c, next) => {
        const renderer = new Renderer();
    
        c.set('render-zest', async (view: Child, meta: PageMetadata) => {
            const html = await renderer.render(view, meta);
            return c.html(html);
        });
    
        await next();
    });
}