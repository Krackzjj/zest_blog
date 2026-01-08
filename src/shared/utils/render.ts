import { Context } from "hono";
import { Renderer } from "../../core/renderer/Renderer.ts";
import { PageMetadata, SafeHtml } from "../schemas/html.schema.ts";

const renderer = new Renderer();

export const render = (c: Context, view: SafeHtml, meta: PageMetadata) => {
    return renderer.render(view, meta).then(html => c.html(html));
};