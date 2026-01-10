import { Child } from "hono/jsx";
import { Base } from "@core/renderer/layouts/Base.tsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import type { FontName, LayoutComponent, ScriptName, ThemeName } from "@shared/schemas/ui.schema.ts";
import { Context } from "hono";

export class Renderer {
    public async render(
        c: Context,
        viewContent: Child,
        meta: PageMetadata & { layout?: Child },
    ): Promise<string> {

        if (!c.get('styles-registry')) c.set('styles-registry', new Set<string>());
        if (!c.get('scripts-registry')) c.set('scripts-registry', new Set<string>());
        if (!c.get('fonts-registry')) c.set('fonts-registry', new Set<string>());
        if (!c.get('theme-name')) c.set('theme-name', 'default');

        const renderedContent = viewContent;

        // 2. Appel du Layout
        const SelectedLayout = (meta.layout || Base) as LayoutComponent

        const layoutElement = await (SelectedLayout({
            meta,
            theme: c.get('theme-name') as ThemeName,
            fonts: Array.from(c.get('fonts-registry') as Set<FontName>),
            styles: Array.from(c.get('styles-registry') as Set<string>),
            scripts: Array.from(c.get('scripts-registry') as Set<ScriptName>),
            children: renderedContent
        }) as Child);

        

        if (!layoutElement) throw new Error("Render failed: layout is empty");
        return `<!DOCTYPE html>\n${layoutElement}`;
    }
}