import { Context } from "hono";
import { Renderer } from "@core/renderer/Renderer.tsx";
import { PageMetadata } from "@shared/schemas/html.schema.ts";
import { Child } from "hono/jsx";
import { ContentfulStatusCode } from "hono/utils/http-status";

const renderer = new Renderer();

export const render = async (c: Context, view: Child, meta: PageMetadata, status: ContentfulStatusCode = 200) => {
  const html = await renderer.render(c, view, meta);
  return c.html(html, status);
};
