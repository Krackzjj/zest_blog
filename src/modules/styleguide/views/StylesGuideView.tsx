import { useFonts, useStyles } from "@/shared/hooks/use-ressources.ts";
import { Context } from "hono"

interface StyleGuideProps {
    context: Context;
}
export const StyleGuideView = ({context}: StyleGuideProps) => {
    useStyles(context, "styleguide");
    useFonts(context,'Inter');

    return (
        <section>
            <h2>StyleGuide</h2>
            <p>Bienvenue dans le laboratoire de design de Zest</p>

            <div>
                <p>Si cette boîte est stylée c'est que <strong>useStyle</strong> est chargé !</p>
            </div>
        </section>
    );
};