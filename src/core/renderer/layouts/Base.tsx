import { Child } from "hono/jsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import type { FontName, LayoutComponent, ScriptName, ThemeName} from "@shared/schemas/ui.schema.ts";

interface BaseProps {
    children: Child;
    meta: PageMetadata;
    theme: ThemeName;
    fonts: FontName[];
    styles: string[];    // Récupéré depuis c.get('styles_registry')
    scripts: ScriptName[];

};

export const Base: LayoutComponent = ({ 
    meta,
    fonts,
    theme,
    children
}: BaseProps) => {
    return (
        <html lang={meta.lang || "fr"} data-theme={theme}>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>ZEST  | {meta.title} </title>
                {meta.description && <meta name="description" content={meta.description}/>}
                <link rel="stylesheet" href="/assets/core/reset.css" />
                <link rel="stylesheet" href={`/assets/themes/${theme}/tokens.css`} />
                {fonts.map((font) => (
                    <link key={font} rel="stylesheet" href={`/assets/fonts/${font}.css`} />
                ))}
                <link ref="icon" type="image/svg+xml" href="/favicon.svg" />
                
            </head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}