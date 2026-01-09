import { z } from "zod/v4"
import { PageMetadata } from "@shared/schemas/html.schema.ts";
import { Child } from "hono/jsx";

export const ThemeNameSchema = z.enum(["default", "dark", "zest-gold"]);
export type ThemeName = z.infer<typeof ThemeNameSchema>;
export const FontNameSchema = z.enum(["Inter", "JetBrains Mono"]);
export type FontName = z.infer<typeof FontNameSchema>;

export interface LayoutHelpers {
    theme: (name: ThemeName) => Child,
    pageStyles: () => Child,
    fonts: (names: FontName | FontName[]) => Child
}

export type LayoutComponent = (props: {
    meta: PageMetadata,
    helpers: LayoutHelpers
    children: Child;
}) => Child | Promise<Child>;