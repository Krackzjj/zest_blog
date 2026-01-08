import { Context, Hono, Next } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Renderer } from "./core/renderer/Renderer.ts";
import { Homeview } from "./modules/blog/views/Homeview.ts";
import { PageMetadata, SafeHtml } from "./shared/schemas/html.schema.ts";
import { render } from "./shared/utils/render.ts";


type ZestEnv = {
    Variables: {
        renderZest: (view: SafeHtml, meta: PageMetadata) => Promise<Response>;
    }
};

const app = new Hono<ZestEnv>();

export const renderMiddleware = async (c: Context<ZestEnv>, next: Next) => {
    const renderer = new Renderer();

    c.set('renderZest', async (view: SafeHtml, meta: PageMetadata) => {
        const html = await renderer.render(view, meta);
        return c.html(html);
    });

    await next();
};
app.use("*", renderMiddleware)
app.use('/assets/theme/*', serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets\/theme/, 'src/core/theme')
}))
app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`);
    await next();
});

app.get("/", async (c) => {
    const view = Homeview({ name: "Zest" });
    return await render(c, view, { title: "Accueil", lang: "fr", styles: ["/assets/theme/style.css"] })
})
app.get("/test", (c) => {
    const s = performance.now();
    const v = Homeview({ name: "ZEST" });
    const e = performance.now();
    console.log(`Rendu en ${e - s}ms`);
    return c.html("vitesse test");
})

app.get('/favicon.ico', (c) => c.text('', 200));

serve({
    fetch: app.fetch,
    port: 3000,
    hostname: '127.0.0.1'
}, (info) => {
    console.log(`🚀 Serveur Zest lancé sur http://${info.address}:${info.port}`);
});