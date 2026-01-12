import { useFonts, useStyles } from "@/shared/hooks/use-ressources.ts";
import { Context } from "hono"
import Palette from "../components/palette.tsx";

interface StyleGuideProps {
    context: Context;
}
export const StyleGuideView = ({ context }: StyleGuideProps) => {
    useFonts(context, 'Inter');
    useStyles(context, 'styles-guide')

    const colors = ["accent", "primary", "secondary", "neutral", "success", "danger", "info", "warning"];

    return (
        <section>
            <h2>StyleGuide</h2>
            <p>Bienvenue dans le laboratoire de design de Zest</p>

            <div class="palette-container">
                {colors.map(color => <Palette color={color} context={context} />)}
            </div>
        </section>
    );
};