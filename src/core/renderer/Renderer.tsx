import { Context } from "hono";
import { Child } from "hono/jsx";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { BaseTemplate } from "@/core/templates/Base.tsx";
import { ZestProvider } from "@shared/contexts/zest-context.tsx";

export class Renderer {
    public async render(
        c: Context,
        viewContent: Child,
        meta: any,
        status: ContentfulStatusCode = 200
    ): Promise<string> {
        c.set('theme-name', 'default');

        const theme = c.get('theme-name');
        const SelectedLayout = (meta.layout || BaseTemplate);

        const finalHtml = (
            <ZestProvider c={c}>
                <SelectedLayout
                    meta={meta}
                    theme={theme}
                    status={status}
                    context={c}
                >
                    {viewContent}
                </SelectedLayout>
            </ZestProvider>
        ).toString();

        return `<!DOCTYPE html>\n${finalHtml}`;
    }
}