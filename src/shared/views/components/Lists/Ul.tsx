import { Child } from "hono/jsx"

interface UlProps {
    items: Child[]
}
export const Ul = ({ items }: UlProps) => {
    return (
        <ul>
            {items.map((item, i) => <li>{item}</li>)}
        </ul>
    )
}