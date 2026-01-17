import { useStyles } from "@/shared/hooks/use-ressources.ts"
import { Child } from "hono/jsx"

interface UlProps {
    items: Child[]
}
export const Ul = ({ items }: UlProps) => {
    useStyles("ul-ol", true)
    return (
        <ul>
            {items.map((item, i) => <li>{item}</li>)}
        </ul>
    )
}