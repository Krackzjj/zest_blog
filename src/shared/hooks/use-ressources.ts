import { Context } from "hono";
import { FontName, ScriptName, ThemeName } from "@shared/schemas/ui.schema.ts";

export const useFonts = (c: Context, name: FontName) => {
    const registry = c.get('fonts-registry') as Set<FontName>;
    if (registry) registry.add(name);
};
export const useScripts = (c: Context, name: ScriptName) => {
    const registry = c.get('scripts-registry') as Set<ScriptName>;
    if (registry) registry.add(name);
};
export const useStyles = (c: Context, name: string) => {
    const registry = c.get('styles-registry') as Set<string>;
    if (registry) registry.add(name);
};
export const useThemes = (c: Context, name: ThemeName) => {
    const registry = c.get('themes-registry') as Set<ThemeName>;
    if (registry) registry.add(name);
};
