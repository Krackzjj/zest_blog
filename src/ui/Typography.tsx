import { TypographyTags, VariantName, ColorName } from "@shared/schemas/ui.schema.ts";
import { Child } from "hono/jsx";

interface TypographyProps {
    is: TypographyTags;
    variant?: VariantName;
    color?: ColorName;
    children: Child;
    class?: string;
    underline?: boolean;
}

const Typography = ({ is: Tag, variant, color, class: classname, underline, children }: TypographyProps) => {
    if (!classname) {
        return (
            <Tag data-color={color} data-variant={variant}>
                {children}
            </Tag>
        )
    }
    return (
        <Tag class={classname} data-color={color} data-variant={variant}>
            {children}
        </Tag>
    );
};

export default Typography;