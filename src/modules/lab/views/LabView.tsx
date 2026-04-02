import Palette from "../components/Palette.tsx";
import { Typography, List, Card, Badge } from "@ui";
import { ColorName, FontName, TypographyTags, VariantName } from "@shared/schemas/ui.schema.ts";
import { Child } from "hono/jsx";
import { asset } from "@/core/utils/assets.ts";

interface LabProps {
}
export const LabView = ({ }: LabProps) => {
    const colors: ColorName[] = ["accent", "primary", "secondary", "neutral", "success", "danger", "info", "warning"];
    const headings: TypographyTags[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const fontFams: { font: FontName, href: string, className: string }[] = [
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
    const blogTags = [
        "Aéronéfices",
        "Chronométrie",
        "Alchimagie",
        "Oniriques",
        "Quantique",
        "Étherique",
        "Automates",
        "Sidérales"
    ];


    const sizes: VariantName[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

    return (
        <>
            <h1>Laboratoire de composants</h1>
            <p>Ici ce trouve tout les composants utilisé sur le site web</p>
            <section class="style-section">
                <Card dumb title="Palette de couleurs">
                    <div class="style-palette-container">
                        {colors.map((color, i) => (<div class="style-palette" data-color={color}></div>))}
                    </div>
                </Card>
                <div className="style-card-h">
                    <Card dumb title="Polices d'écritures">
                        <div className="font-grid">
                            {fontFams.map((font, i) => (
                                <p key={`font-${i}`}>
                                    <a href={font.href} class={font.className}>{font.font}</a>
                                </p>
                            ))}
                        </div>
                    </Card>
                    <Card dumb title="Paragraphe">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores placeat, perspiciatis provident temporibus quod facilis! Error id aspernatur illo quae! Harum accusamus asperiores totam tenetur!</p>
                    </Card>
                </div>
                <div class="style-card-h">
                    <Card dumb title="Titres">
                        {headings.map((heading, i) => <Typography is={heading}>Titre {i + 1}</Typography>)}
                    </Card>
                    <div class="style-card-v">
                        <Card dumb title="Textes colorés">
                            <div class="style-texts-c-container">
                                {colors.map((color, i) => <Typography color={color} is="span" >{color.charAt(0).toUpperCase() + color.slice(1)}</Typography>)}
                            </div>
                        </Card>
                        <Card dumb title="Listes">
                            <div class="style-lists-container">
                                <List items={listItems} />
                                <List ordered items={listItems} />
                            </div>
                        </Card>
                        <Card dumb title="Diviseur" variant="column">
                            <hr />
                        </Card>
                    </div>
                    <Card dumb class="style-img" title="Images">
                        <img src={asset.img("placeholders/500x800-3.png")} alt="" />
                    </Card>
                </div>
                <Card dumb title="Badges tailles" variant="column">
                    <div class="style-badges-container-t">
                        <div class="style-badges-t-container">
                            {sizes.toReversed().map((size, i) => <Badge key={`badge-${i}`} text={blogTags[i]} color={"neutral"} variant={size} />)}
                        </div>
                        <div class="style-badges-t-container">
                            {sizes.toReversed().map((size, i) => <Badge key={`badge-${i}`} text={blogTags[i]} color={"neutral"} variant={size} pill />)}
                        </div>
                    </div>
                </Card>
                <div class="style-card-h">
                    <Card dumb title="Badges" variant="column">
                        <div className="style-badges-container">
                            {colors.map((color, i) => <Badge key={`badge-${i}`} text={blogTags[i]} color={color} />)}
                        </div>
                    </Card>
                    <Card dumb title="Badges pillules" variant="column">
                        <div className="style-badges-container">
                            {colors.map((color, i) => <Badge key={`badge-${i}`} text={blogTags[i]} color={color} pill />)}
                        </div>
                    </Card>
                </div>
                <div class="style-card-h">
                </div>
            </section>
        </>
    );
};