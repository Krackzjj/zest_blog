import { useStyles } from "@/shared/hooks/use-ressources.ts";

interface PaletteProps {
    color: string;
    id?: string;
}

const Palette = ({ color, id }: PaletteProps) => {
    useStyles("palette", true);

    return (
        <>
            <div id={id} data-color={color} class="color-palette"></div>
        </>
    )
}

export default Palette;