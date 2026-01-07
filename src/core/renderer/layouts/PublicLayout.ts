import type { PageMetadata, SafeHtml } from "../../../shared/schemas/html.schema.ts";
import { LayoutHelpers } from "../../../shared/schemas/ui.schema.ts";
import { html } from "../Views.ts";

interface PublicLayoutProps {
    meta: PageMetadata;
    helpers: LayoutHelpers;
    renderView: () => SafeHtml;
};


export const PublicLayout = ({ meta, helpers, renderView }: PublicLayoutProps): SafeHtml => html`
    <!DOCTYPE html>
    <html lang="${meta?.lang}">
    <head>
        <meta charset="UTF-8">
        <title>${meta.title} | Zest</title>
        ${helpers.theme("default")}
        ${helpers.pageStyles()}
    </head>
    <body>
        <header>
            <nav><a href="/">🍋 Zest</a></nav>
        </header>

        <main>
            ${renderView()}
        </main>

        <footer><div>&copy; 2026 Zest Framework</div></footer>
    </body>
    </html>
`;
