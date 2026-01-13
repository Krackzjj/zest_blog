// src/core/renderer/Renderer.tsx
import { Child } from "hono/jsx";
import { Base } from "@core/renderer/layouts/Base.tsx";
import { ZestProvider } from "@shared/contexts/zest-context.tsx";
import { raw } from "hono/html";
import { Context } from "hono";

export class Renderer {
    public async render(
        c: Context,
        viewContent: Child,
        meta: any
    ): Promise<string> {
        // 1. Initialisation des registres
        const stylesSet = new Set<string>();
        const fontSet = new Set<string>();
        c.set('styles-registry', stylesSet);
        c.set('fonts-registry', fontSet);
        c.set('theme-name', 'default');

        // 2. PREMIER RENDU : On génère uniquement la vue dans le Provider.
        const viewHtml = (
            <ZestProvider c={c}>
                {viewContent}
            </ZestProvider>
        ).toString();

        // 3. RÉCUPÉRATION DES DONNÉES : Maintenant les Sets sont pleins !
        const stylesArray = Array.from(stylesSet);
        const fontsArray = Array.from(fontSet);
        const theme = c.get('theme-name');
        const SelectedLayout = (meta.layout || Base);

        // 4. SECOND RENDU : On rend le Layout final.
        const finalHtml = (
            <ZestProvider c={c}>
                <SelectedLayout
                    meta={meta}
                    theme={theme}
                    fonts={fontsArray}
                    styles={stylesArray}
                    children={raw(viewHtml)}
                />
            </ZestProvider>
        ).toString();

        return `<!DOCTYPE html>\n${finalHtml}`;
    }
}