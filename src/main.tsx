import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Renderer } from "@core/renderer/Renderer.tsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import { Child } from "hono/jsx";
import AppRouter from "@modules/shared.module.ts";

// On définit le type de notre contexte Hono
export type ZestEnv = {
    Variables: {
        renderZest: (view: Child, meta: PageMetadata) => Promise<Response>;
    }
};

const app = new Hono<ZestEnv>();

// --- MIDDLEWARES ---

// Middleware de rendu
app.use("*", async (c, next) => {
    const renderer = new Renderer();

    c.set('renderZest', async (view: Child, meta: PageMetadata) => {
        const html = await renderer.render(view, meta);
        return c.html(html);
    });

    await next();
});

app.use('/favicon.svg', serveStatic({ path: './public/favicon.svg' }));
app.get('/favicon.ico', (c) => c.redirect('/favicon.svg', 301));

// Accès au reset : /assets/core/reset.css
app.use('/assets/core/*', serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets\/core/, 'src/core/themes')
}));
// Accès aux fonts
app.use('/assets/core/fonts/*', serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets\/core\/fonts/, 'src/core/themes/fonts')
}));
// Accès aux thèmes : /assets/core/[theme]
app.use('/assets/themes/*', serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets\/themes/, 'src/core/themes')
}));

// Logger simple
app.use('*', async (c, next) => {
    const start = performance.now();
    await next();
    const end = performance.now();
    console.log(`[${c.req.method}] ${c.req.url} - ${(end - start).toFixed(2)}ms`);
});

// --- ROUTES ---

app.route("/", AppRouter);

// --- LANCEMENT ---

serve({
    fetch: app.fetch,
    port: 3000,
    hostname: '127.0.0.1'
}, (info) => {
    console.log(`🚀 Serveur Zest lancé sur http://${info.address}:${info.port}`);
});