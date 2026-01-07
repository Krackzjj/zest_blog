import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Renderer } from "./core/renderer/Renderer.ts";
import { Homeview } from "./modules/blog/views/Homeview.ts";

const app = new Hono();


app.use('/assets/theme/*', serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets\/theme/, 'src/core/theme')
}))
app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`);
    await next();
});

app.get("/", (c) => {
    return c.html(
        Renderer.render(
            { title: "Accueil" },
            () => Homeview({ name: 'Zest est en vie 🍋' })
        ))
});

console.log('Le serveur est lancé sur http://localhost:3000');

serve({
    fetch: app.fetch,
    port: 3000,
});