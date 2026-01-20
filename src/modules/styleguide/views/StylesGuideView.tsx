import Palette from "../components/Palette.tsx";
import { Typography, List, Card } from "@ui";
import { ColorName, FontName, TypographyTags } from "@/shared/schemas/ui.schema.ts";
import { Child } from "hono/jsx";

interface StyleGuideProps {
}
export const StyleGuideView = ({ }: StyleGuideProps) => {
    const colors: ColorName[] = ["accent", "primary", "secondary", "neutral", "success", "danger", "info", "warning"];
    const headings: TypographyTags[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const fontFams: { font: FontName, href: string, className: string }[] = [
        { font: "JetBrains Mono", href: "https://www.jetbrains.com/fr-fr/lp/mono/", className: "ff-jm" },
        { font: "Inter", href: "https://rsms.me/inter/", className: "ff-i" },
        { font: "Outfit", href: "#", className: "ff-o" },
        { font: "Plus Jakarta Sans", href: "#", className: "ff-jk" },
        { font: "Space Mono", href: "#", className: "ff-sm" },
    ];
    const listItems: Child[] = [
        "Les étoiles dansent sur l'océan des rêves",
        "Le vent murmure des secrets aux montagnes",
        "Les couleurs de l'aube peignent l'infini",
        "Chaque goutte de pluie chante sa liberté",
        "L'horizon embrasse l'âme des voyageurs"
    ];

    return (
        <>
            <h1>Laboratoire de composants</h1>
            <p>Ici ce trouve tout les composants utilisé sur le site web</p>
            <section class="style-section">
                <Card title={{ text: "Palette de couleurs", underline: true }}>
                    {colors.map((color, i) => <Palette id={`color-${i}`} color={color} />)}
                </Card>
                <div className="style-card-h">
                    <Card title={{ text: "Polices d'écritures", underline: true }}>
                        <div className="font-grid">
                            {fontFams.map((font, i) => (
                                <p key={`font-${i}`}>
                                    <a href={font.href} class={font.className}>{font.font}</a>
                                </p>
                            ))}
                        </div>
                    </Card>
                    <Card title={{ text: "Paragraphe", underline: true }}>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores placeat, perspiciatis provident temporibus quod facilis! Error id aspernatur illo quae! Harum accusamus asperiores totam tenetur!</p>
                    </Card>
                </div>
                <div class="style-card-h">
                    <Card direction="vertical" title={{ text: "Titres", underline: true }}>
                        {headings.map((heading, i) => <Typography is={heading}>Titre {i + 1}</Typography>)}
                    </Card>
                    <div class="style-card-v">
                        <Card direction="horizontal" title={{ text: "Textes colorés", underline: true }}>
                            {colors.map((color, i) => <Typography color={color} is="span" >{color.charAt(0).toUpperCase() + color.slice(1)}</Typography>)}
                        </Card>
                        <Card direction="horizontal" title={{ text: "Listes", underline: true }}>
                            <List items={listItems} />
                            <List ordered items={listItems} />
                        </Card>
                        <Card direction="horizontal" title={{ text: "Diviseur", underline: true }}>
                            <hr />
                        </Card>
                    </div>
                    <Card img="placeholders/1:1-2.png" direction="vertical" title={{ text: "Images", underline: true }} />
                </div>
            </section>
        </>
    );
};