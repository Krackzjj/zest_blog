import { useStyles } from "@/shared/hooks/use-ressources.ts";
import { Child } from "hono/jsx";
import { Typography } from "./Typography.tsx";

interface CardProps {
    children?: Child;
    title?: {
        text: string;
        underline: boolean;
    };
    img?: string;
    direction?: 'vertical' | 'horizontal',
}
export const Card = ({ children, title, direction, img }: CardProps) => {
    useStyles("card", true);
    return (
        <article class={`card ${direction === "vertical" ? "card-v" : "card-h"}`}>
            {title ? <Typography underline={title.underline} is="h4">{title.text}</Typography> : ""}
            {img ? <img src={img} alt={"img"} /> : ""}
            <div>
                {children}
            </div>
        </article>
    );
}