import { useStyles } from "@/shared/hooks/use-ressources.ts";

interface PaletteProps {
    color: string;
}

const Palette = ({ color }: PaletteProps) => {
    useStyles("palette", true);

    return (
        <>
            <div data-color={color} class="color-palette"></div>
        </>
    )
}

export default Palette;