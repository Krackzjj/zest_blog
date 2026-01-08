import type { PageMetadata, SafeHtml } from "../../../shared/schemas/html.schema.ts";
import { LayoutHelpers } from "../../../shared/schemas/ui.schema.ts";
import { _z } from "../Views.ts";

interface PublicLayoutProps {
    children: SafeHtml;
    meta: PageMetadata;
    helpers: LayoutHelpers;
    renderView: () => SafeHtml;
};


export const PublicLayout = ({ meta, helpers, children }: PublicLayoutProps) => {
    const _ = _z.html({ lang: meta.lang }, [
        _z.head([
            _z.meta({ charset: "UTF-8" }),
            _z.meta({ name: "viewport", content: "width=device-width, initial-scale=1.0" }),
            _z.title(meta.title),
            helpers.theme("default"),
            helpers.pageStyles()
        ]),
        _z.body({ class: "bg-gray-50 text-gray-900" }, [
            _z.main({ id: "app" }, children)
        ])
    ]);
    return _;
}
