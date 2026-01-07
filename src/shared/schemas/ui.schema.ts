import { z } from "zod/v4"
import { SafeHtml } from "./html.schema.ts";

export const ThemeNameSchema = z.enum(["default", "dark", "zest-gold"]);
export type ThemeName = z.infer<typeof ThemeNameSchema>;

export interface LayoutHelpers {
    theme: (name: string) => SafeHtml
    pageStyles: () => SafeHtml
}