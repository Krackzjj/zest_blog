import { useStyles } from "@/shared/hooks/use-ressources.ts";
import { Child } from "hono/jsx";
import { Typography } from "./Typography.tsx";

interface CardProps {
    children: Child;
    title?: {
        text: string;
        underline: boolean;
    };
    direction?: 'vertical' | 'horizontal'
}
export const Card = ({ children, title, direction }: CardProps) => {
    useStyles("card", true);
    return (
        <article class={`card ${direction === "vertical" ? "card-v" : "card-h"}`}>
            {title ? <Typography underline={title.underline} is="h4">{title.text}</Typography> : ""}
            <div>
                {children}
            </div>
        </article>
    );
}