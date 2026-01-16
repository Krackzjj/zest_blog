import { useStyles } from "@/shared/hooks/use-ressources.ts";
import { TypographyTags, VariantName, ColorName } from "@/shared/schemas/ui.schema.ts";
import { Child } from "hono/jsx";

interface TypographyProps {
    tag: TypographyTags;
    variant?: VariantName;
    color?: ColorName;
    children: Child;
}

export const Typography = ({ tag: Tag, variant, color, children }: TypographyProps) => {
    useStyles("typography", true);
    return (
        <Tag data-color={color} data-variant={variant}>
            {children}
        </Tag>
    );
};