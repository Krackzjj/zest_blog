import { Context } from "hono";
import { FontName, ScriptName, ThemeName } from "@shared/schemas/ui.schema.ts";

export const useFonts = (c: Context, name: FontName) => {
    const registry = c.get('fonts-registry') as Set<FontName>;
    if (registry) {
        const normalizedName = name.toLowerCase() as FontName;
        registry.add(normalizedName)
    };
};
export const useScripts = (c: Context, name: ScriptName) => {
    const registry = c.get('scripts-registry') as Set<ScriptName>;
    if (registry) {
        const normalizedName = name.toLowerCase() as ScriptName;
        registry.add(normalizedName)
    };
};
export const useStyles = (c: Context, name: string, components?: boolean) => {
    const registry = c.get('styles-registry');
    if (registry) {
        const normalizedName = name.toLowerCase();
        registry.add(`${components ? 'components/' : ''}${normalizedName}`)
    };
};
export const useThemes = (c: Context, name: ThemeName) => {
    const registry = c.get('themes-registry') as Set<ThemeName>;
    if (registry) {
        const normalizedName = name.toLowerCase() as ThemeName;
        registry.add(normalizedName);
    };
};
