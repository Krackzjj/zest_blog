import { Child } from "hono/jsx"

interface ListProps {
    items: Child[],
    ordered?: boolean
}
const List = ({ items, ordered }: ListProps) => {
    if (ordered) {
        return (
            <ol>
                {items.map((item, i) => <li key={`list-item-${i}`}>{item}</li>)}
            </ol>
        )
    }
    return (
        <ul>
            {items.map((item, i) => <li key={`list-item-${i}`}>{item}</li>)}
        </ul>
    )
};

export default List;