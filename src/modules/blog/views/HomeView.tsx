import { asset } from "@/core/utils/assets.ts";
import { Card, Typography } from "@ui";

interface HomeProps {
    name: string
}

export const HomeView = ({ name }: HomeProps) => {
    const props = {
        title: "Réinventer ses matins : l’art de commencer la journée autrement",
        desc: "Réveille ton potentiel chaque matin grâce à des rituels simples, inspirants et adaptés à ton rythme",
        tags: ["motivation", "bienetre", "routine"],
    }
    return (
        <section class="blog-card-home-container" >
            <Card class="blog-card-home" {...props} img={{
                src: "blog1.png",
                alt: "test", placement: "left"
            }} meta={{
                date: "2026-01-24",
                author: "Billy",
                comments: 2
            }} />
        </section>
    )
};