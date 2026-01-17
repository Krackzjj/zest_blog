import { useStyles } from "@/shared/hooks/use-ressources.ts"
import { Child } from "hono/jsx"

interface OlProps {
    items: Child[]
}
export const Ol = ({ items }: OlProps) => {
    useStyles("ul-ol", true)
    return (
        <ol>
            {items.map((item, i) => <li>{item}</li>)}
        </ol>
    )
}