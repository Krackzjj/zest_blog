import { useStyles } from "@/shared/hooks/use-ressources.ts";
import { Context } from "hono";

interface PaletteProps {
    context: Context;
    color: string;
}

const Palette = ({ context, color }: PaletteProps) => {
    useStyles(context, "palette", true);

    return (
        <>
            <div data-color={color} class="color-palette"></div>
        </>
    )
}

export default Palette;