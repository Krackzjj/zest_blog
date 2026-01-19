import { ThemeName } from "@shared/schemas/ui.schema.ts";
import { useZest } from "@contexts/zest-context.tsx";

export const useThemes = (name: ThemeName) => {
    const { c } = useZest();
    const registry = c.get('themes-registry') as Set<ThemeName>;
    if (registry) {
        const normalizedName = name.toLowerCase() as ThemeName;
        registry.add(normalizedName);
    };
};