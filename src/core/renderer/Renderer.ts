import { PublicLayout } from "./layouts/PublicLayout.ts";
import { _z } from "./Views.ts";
import type { PageMetadata, SafeHtml } from "../../shared/schemas/html.schema.ts";
import type { LayoutHelpers } from "../../shared/schemas/ui.schema.ts";

export class Renderer {
    /**
     * Rend une vue complète à l'intérieur du Layout
     */
    public async render(viewContent: SafeHtml, meta: PageMetadata): Promise<string> {

        // 1. Définition des helpers pour le layout
        // Ils utilisent maintenant ton Proxy _z pour rester cohérents
        const helpers: LayoutHelpers = {
            theme: (name: string) =>
                _z.link({ rel: "stylesheet", href: `/assets/themes/${name}.css` }),

            pageStyles: () => {
                if (!meta.styles || meta.styles.length === 0) return _z.fragment();

                // On utilise le fragment pour injecter plusieurs liens sans div parente
                return _z.fragment(
                    meta.styles.map(href => _z.link({ rel: "stylesheet", href }))
                );
            }
        };

        // 2. Appel du Layout
        // Comme le Layout renvoie un SafeHtml, tout est déjà échappé et sécurisé
        const layoutHtml = PublicLayout({
            meta,
            helpers,
            children: viewContent,
            renderView: () => viewContent
        });

        // 3. Assemblage final
        // C'est le SEUL endroit où on extrait la string brute .__html
        // On ajoute le DOCTYPE manuellement car ce n'est pas une balise HTML standard
        return `<!DOCTYPE html>\n${layoutHtml.__html}`;
    }
}