import { Context } from "hono";
import { Renderer } from "@core/renderer/Renderer.tsx";
import { PageMetadata } from "@shared/schemas/html.schema.ts";
import { Child } from "hono/jsx";

const renderer = new Renderer();

export const render = async (c: Context, view: Child, meta: PageMetadata) => {
    const html = await renderer.render(view, meta);
    return c.html(html);
};