import { ColorName, VariantName } from "@shared/schemas/ui.schema.ts";

interface BadgeProps {
    pill?: boolean;
    color?: ColorName;
    text?: string;
    variant?: VariantName;
};

const Badge = ({ text, color = "primary", pill, variant = "md" }: BadgeProps) => {
    return (
        <span class={`badge ${pill ? 'pill' : ''}`} data-color={color} data-variant={variant}>{text}</span>
    )
}

export default Badge;