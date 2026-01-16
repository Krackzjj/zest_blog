import { useStyles } from "@/shared/hooks/use-ressources.ts";
import { Child } from "hono/jsx";
import { Typography } from "./Typography.tsx";

interface CardProps {
    children: Child;
    title?: string;
}
export const Card = ({ children, title }: CardProps) => {
    useStyles("card", true);
    return (
        <article class="card">
            {title ? <Typography tag="h2" variant="lg">{title}</Typography> : ""}
            <div>
                {children}
            </div>
        </article>
    );
}