import { Child } from "hono/jsx";
import { Base } from "@core/renderer/layouts/Base.tsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import type { FontName, LayoutComponent, ScriptName, ThemeName } from "@shared/schemas/ui.schema.ts";
import { Context } from "hono";
import { html, raw } from "hono/html";

export class Renderer {
    public async render(
        c: Context,
        viewContent: Child,
        meta: PageMetadata & { layout?: Child },
    ): Promise<string> {

        const stylesSet = new Set<string>();
        const scriptSet = new Set<ScriptName>();
        const fontSet = new Set<string>();

        c.set('styles-registry', stylesSet);
        c.set('scripts-registry', scriptSet);
        c.set('fonts-registry', fontSet);
        c.set('theme-name', 'default');

        const viewResult = await viewContent;

        const contentHtml = raw(viewResult?.toString())

        const stylesArray = Array.from(c.get('styles-registry') as Set<string>);
        const fontsArray = Array.from(c.get('fonts-registry') as Set<FontName>);
        const scriptsArray = Array.from(c.get('scripts-registry') as Set<ScriptName>);
        const theme = c.get('theme-name') as ThemeName;

        // 2. Appel du Layout
        const SelectedLayout = (meta.layout || Base) as LayoutComponent

        const layoutElement = await (SelectedLayout({
            meta,
            theme,
            fonts: fontsArray,
            styles: stylesArray,
            scripts: scriptsArray,
            children: contentHtml
        }) as Child);



        if (!layoutElement) throw new Error("Render failed: layout is empty");
        return `<!DOCTYPE html>\n${layoutElement}`;
    }
}