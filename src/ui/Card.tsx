import { Child } from "hono/jsx";
import { Typography } from "./index.ts";
import { asset } from "@core/utils/assets.ts";
import { PlacementName, VariantName } from "@shared/schemas/ui.schema.ts";

interface CardProps {
    children?: Child;
    dumb?: boolean;
    title?: string;
    href?: string;
    class?: string;
    img?: {
        src: string;
        alt?: string;
        placement?: Extract<PlacementName, "right" | "left">
    }
    desc?: string;
    variant?: string;
    size?: Extract<VariantName, 'sm' | 'md' | 'lg'>
}
const Card = ({ title, img, class: className, href, desc, dumb, variant, children, size }: CardProps) => {
    const fullClassName = `card-${size ?? "md"} ${className ?? ""}`.trim();
    const dataVariant = variant || undefined;

    const renderContent = () => {
        if (dumb) {
            return (
                <div class="card-content dumb">
                    <Typography class="card-title" is="h3">{title}</Typography>
                    {children}
                </div>
            );
        }

        return (
            <>
                {img?.placement === "left" && (
                    <div class="card-img">
                        <img src={asset.img(img.src)} alt={img.alt} />
                    </div>
                )}
                <div class="card-content">
                    {href ? (
                        <a href={href} hx-boost="true">
                            <Typography class="card-title" is="h3">{title}</Typography>
                        </a>
                    ) : (
                        <Typography class="card-title" is="h3">{title}</Typography>
                    )}
                    <p>{desc}</p>
                    <a href={href || "#"}>En savoir plus</a>
                </div>
                {img?.placement === "right" && (
                    <div class="card-img">
                        <img src={asset.img(img.src)} alt={img.alt} />
                    </div>
                )}
            </>
        );
    };

    return (
        <article class={fullClassName} data-variant={dataVariant}>
            {renderContent()}
        </article>
    );
};
export default Card;