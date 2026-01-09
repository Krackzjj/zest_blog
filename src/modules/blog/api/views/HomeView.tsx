interface HomeProps {
    name: string
}

export const HomeView = ({ name }: HomeProps) => {
    return (
        <section>Hello {name}</section>
    )
};