import { z } from "zod/v4"

export const ThemeNameSchema = z.enum(["default", "dark", "zest-gold"]);
export type ThemeName = z.infer<typeof ThemeNameSchema>;
export const FontNameSchema = z.enum(["Inter", "JetBrains Mono", "Outfit", "Plus Jakarta Sans", "Space Mono"]);
export type FontName = z.infer<typeof FontNameSchema>;

export const VariantName = z.enum(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]);
export type VariantName = z.infer<typeof VariantName>;
export const ColorName = z.enum(["accent", "primary", "secondary", "neutral", "success", "danger", "info", "warning"]);
export type ColorName = z.infer<typeof ColorName>;
export const PlacementName = z.enum(["right", "top", "left", "bottom"]); //TODO: ajouté des placement si besoin
export type PlacementName = z.infer<typeof PlacementName>;

export const TypographyTags = z.enum(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label"]); //TODO: ajouté des tags au besoin
export type TypographyTags = z.infer<typeof TypographyTags>;
