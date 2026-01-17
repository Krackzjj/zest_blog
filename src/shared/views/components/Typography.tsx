import { useStyles } from "@/shared/hooks/use-ressources.ts";
import { TypographyTags, VariantName, ColorName } from "@/shared/schemas/ui.schema.ts";
import { Child } from "hono/jsx";

interface TypographyProps {
    is: TypographyTags;
    variant?: VariantName;
    color?: ColorName;
    children: Child;
    class?: string[];
    underline?: boolean;
}

export const Typography = ({ is: Tag, variant, color, class: classname, underline, children }: TypographyProps) => {
    useStyles("typography", true);
    const classNames = [classname, underline ? "text-ud" : ""].flat();

    return (
        <Tag class={classNames.join(" ").trim()} data-color={color} data-variant={variant}>
            {children}
        </Tag>
    );
};