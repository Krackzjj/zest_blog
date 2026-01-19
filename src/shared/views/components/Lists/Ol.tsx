import { Child } from "hono/jsx"

interface OlProps {
    items: Child[]
}
export const Ol = ({ items }: OlProps) => {
    return (
        <ol>
            {items.map((item, i) => <li>{item}</li>)}
        </ol>
    )
}