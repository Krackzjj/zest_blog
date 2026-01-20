import { Child } from "hono/jsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import type { ThemeName } from "@shared/schemas/ui.schema.ts";
import { ZestProvider } from "@/shared/contexts/zest-context.tsx";
import { Context } from "hono";
import { asset } from "@/core/utils/assets.ts";
import { NavBar } from "./components/index.ts";

interface BaseTemplateProps {
    children: Child;
    meta: PageMetadata;
    theme: ThemeName;
    context: Context;
};

export const BaseTemplate = ({
    meta,
    theme,
    children,
    context
}: BaseTemplateProps & { context: Context }) => {
    return (
        <ZestProvider c={context}>
            <html lang={meta.lang || "fr"} data-theme={theme}>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>ZEST  | {meta.title} </title>
                    {meta.description && <meta name="description" content={meta.description} />}
                    <link rel="stylesheet" href={asset.css(theme)} />
                    <link rel="icon" type="image/svg+xml" href="/favicon.png" />
                    <script src={asset.js("htmx")} defer></script>
                    {process.env.NODE_ENV === 'development' && (
                        <script src="/public/scripts/hmr-client.js" defer />
                    )}
                </head>
                <body hx-boost="true">
                    <header>
                        <NavBar c={context} />
                    </header>
                    <main>
                        {children}
                    </main>
                </body>
            </html>
        </ZestProvider>
    );
}