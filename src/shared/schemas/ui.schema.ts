import { z } from "zod/v4"
import { PageMetadata } from "@shared/schemas/html.schema.ts";
import { Child } from "hono/jsx";
import { Context } from "hono";

export const ThemeNameSchema = z.enum(["default", "dark", "zest-gold"]);
export type ThemeName = z.infer<typeof ThemeNameSchema>;
export const ScriptNameSchema = z.enum(["main"]);
export type ScriptName = z.infer<typeof ScriptNameSchema>;
export const FontNameSchema = z.enum(["Inter", "JetBrains Mono"]);
export type FontName = z.infer<typeof FontNameSchema>;

export type LayoutComponent = (props: {
    meta: PageMetadata,
    children: Child;
    theme: ThemeName;
    fonts: FontName[];
    styles: string;
    scripts: ScriptName[];
}) => Child | Promise<Child>;