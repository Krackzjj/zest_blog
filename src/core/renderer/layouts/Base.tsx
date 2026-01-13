import { Child } from "hono/jsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import type { FontName, LayoutComponent, ScriptName, ThemeName } from "@shared/schemas/ui.schema.ts";
import { ZestProvider } from "@/shared/contexts/zest-context.tsx";
import { Context } from "hono";

interface BaseProps {
    children: Child;
    meta: PageMetadata;
    theme: ThemeName;
    fonts: FontName[];
    styles: Set<string> | string[];
    scripts: ScriptName[];
    context: Context;
};

export const Base = ({
    meta,
    fonts,
    theme,
    styles,
    children,
    context
}: BaseProps & { context: Context }) => {
    const styleArray = Array.from(styles);
    return (
        <ZestProvider c={context}>
            <html lang={meta.lang || "fr"} data-theme={theme}>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>ZEST  | {meta.title} </title>
                    {meta.description && <meta name="description" content={meta.description} />}
                    <link rel="stylesheet" href="/assets/core/reset.css" />
                    <link rel="stylesheet" href={`/assets/themes/${theme}/tokens.css`} />
                    <link rel="stylesheet" href={`/assets/themes/${theme}/main.css`} />
                    {styleArray.map((style) => (
                        <link key={style} rel="stylesheet" href={`/assets/themes/${theme}/${style}.css`} />
                    ))}
                    {fonts.map((font) => (
                        <link key={font} rel="stylesheet" href={`/assets/fonts/${font}.css`} />
                    ))}
                    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                    {process.env.NODE_ENV === 'development' && (
                        <script src="/public/scripts/hmr-client.js" defer />
                    )}
                </head>
                <body>
                    <main>
                        {children}
                    </main>
                </body>
            </html>
        </ZestProvider>
    );
}