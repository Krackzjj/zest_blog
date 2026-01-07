import { html } from "./Views.ts";
import type { LayoutHelpers } from "../../shared/schemas/ui.schema.ts";
import { PageMetadataSchema, type PageMetadata, type SafeHtml } from "../../shared/schemas/html.schema.ts";
import { PublicLayout } from "./layouts/PublicLayout.ts";

export class Renderer {
    /**
     * Méthode universelle pour rendre une page
     * @param meta Données pour le <head> (validées par Zod)
     * @param view function qui retourne le corps d'une page
     */
    static render(
        meta: unknown,
        view: (h: LayoutHelpers) => SafeHtml
    ): string {

        //1. Validation des métas
        const validatedMeta = PageMetadataSchema.parse(meta);

        //2. Helpers injectés
        const helpers: LayoutHelpers = {
            theme: (name) => html`<link rel="stylesheet" href="/assets/theme/${name}.css">`,
            pageStyles: () => html`${validatedMeta.styles.map(s => html`<link rel="stylesheet" href="${s}">`)}`
        };

        //3. Rendu
        const result = PublicLayout({
            meta: validatedMeta,
            helpers,
            renderView: () => view(helpers)
        })

        return result.__html;
    }


}