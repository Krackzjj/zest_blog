import { Child } from "hono/jsx";
import { Typography } from "./index.ts";
import { asset } from "@/core/utils/assets.ts";

interface CardProps {
    children?: Child;
    title?: {
        text: string;
        underline: boolean;
    };
    img?: string;
    direction?: 'vertical' | 'horizontal',
}
const Card = ({ children, title, direction, img }: CardProps) => {
    return (
        <article class={`card ${direction === "vertical" ? "card-v" : "card-h"}`}>
            {title ? <Typography underline={title.underline} is="h4">{title.text}</Typography> : ""}
            {img ? <img src={asset.img(img)} alt={"img"} /> : ""}
            <div>
                {children}
            </div>
        </article>
    );
};

export default Card;