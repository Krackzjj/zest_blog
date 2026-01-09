import { Child } from "hono/jsx";
import type { PageMetadata } from "@shared/schemas/html.schema.ts";
import type { LayoutComponent, LayoutHelpers } from "@shared/schemas/ui.schema.ts";

interface BaseProps {
    children: Child;
    meta: PageMetadata;
    helpers: LayoutHelpers;
};

export const Base: LayoutComponent = ({ meta, helpers, children }: BaseProps) => {
    return (
        <html lang={meta.lang || "fr"} >
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{meta.title} </title>
                <link rel="stylesheet" href="/assets/core/reset.css" />
                {helpers.fonts(["Inter", "JetBrains Mono"])}
                <link ref="icon" type="image/svg+xml" href="/favicon.svg" />
                {helpers.theme("default")}
            </head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}