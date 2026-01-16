import { useFonts, useScripts, useStyles } from "@/shared/hooks/use-ressources.ts";
import Palette from "../components/Palette.tsx";
import { Card } from "@/shared/views/components/Card.tsx";

interface StyleGuideProps {
}
export const StyleGuideView = ({ }: StyleGuideProps) => {
    useFonts('Inter');
    useStyles('styles-guide')
    useScripts("styles-guide", true);

    const colors = ["accent", "primary", "secondary", "neutral", "success", "danger", "info", "warning"];

    return (
        <>
            <h1>Laboratoire de composants</h1>
            <p>Ici ce trouve tout les composants utilisé sur le site web</p>
            <section class="style-section">
                <Card title="Palette de couleurs">
                    {colors.map((color, i) => <Palette id={`color-${i}`} color={color} />)}
                </Card>
                <Card>
                    [...]
                </Card>
            </section>
        </>
    );
};