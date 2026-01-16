import { FontName, ThemeName } from "@shared/schemas/ui.schema.ts";
import { useZest } from "@contexts/zest-context.tsx";

export const useFonts = (name: FontName) => {
    const { c } = useZest();
    const registry = c.get('fonts-registry') as Set<FontName>;
    if (registry) {
        const normalizedName = name.toLowerCase() as FontName;
        registry.add(normalizedName)
    };
};
export const useScripts = (name: string, page?: boolean, components?: boolean) => {
    const { c } = useZest();
    const registry = c.get('scripts-registry');
    if (registry) {
        const normalizedName = name.toLowerCase();
        registry.add(`${page ? 'pages/' : ''}${components ? 'components/' : ''}${normalizedName}`)
    };
};
export const useStyles = (name: string, components?: boolean) => {
    const { c } = useZest();
    const registry = c.get('styles-registry');
    if (registry) {
        const normalizedName = name.toLowerCase();
        registry.add(`${components ? 'components/' : ''}${normalizedName}`)
    };
};
export const useThemes = (name: ThemeName) => {
    const { c } = useZest();
    const registry = c.get('themes-registry') as Set<ThemeName>;
    if (registry) {
        const normalizedName = name.toLowerCase() as ThemeName;
        registry.add(normalizedName);
    };
};
