import { Child, Fragment } from "hono/jsx";
import { Base } from "@core/renderer/layouts/Base.tsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import type { FontName, LayoutComponent, LayoutHelpers, ThemeName } from "@shared/schemas/ui.schema.ts";

export class Renderer {
    public async render(
        viewContent: Child,
        meta: PageMetadata & { layout?: Child }
    ): Promise<string> {

        // 1. Définition de l'objet helpers
        const helpers: LayoutHelpers = {
            theme: (name: ThemeName) => (
                <link rel="stylesheet" href={`/assets/themes/${name}/variables.css`} />
            ),

            pageStyles: () => {
                // Si pas de styles, on retourne un fragment vide
                if (!meta.styles || meta.styles.length === 0) {
                    return <Fragment />;
                }

                // Sinon on retourne la liste des liens
                return (
                    <Fragment>
                        {meta.styles.map(href => (
                            <link rel="stylesheet" href={href} />
                        ))}
                    </Fragment>
                ) as any;
            },
            fonts: (names: FontName | FontName[]) => {
                const fontsList = Array.isArray(names) ? names : [names];
                return (
                    <>
                        {fontsList.map(name => (
                            <link rel="stylesheet" href={`/assets/core/fonts/${name.toLowerCase().replace(/\s+/g, '-')}.css`} />
                        ))}
                    </>
                )

            }
        };

        // 2. Appel du Layout
        const SelectedLayout = (meta.layout || Base) as LayoutComponent

        const layoutElement = await (SelectedLayout({
            meta,
            helpers,
            children: viewContent
        }) as Child)

        if (!layoutElement) throw new Error("Render failed: layout is empty");
        return `<!DOCTYPE html>\n${layoutElement}`;
    }
}