interface PaletteProps {
    color: string;
    id?: string;
}

const Palette = ({ color, id }: PaletteProps) => {

    return (
        <>
            <div id={id} data-color={color} class="color-palette"></div>
        </>
    )
}

export default Palette;