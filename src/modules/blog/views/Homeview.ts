import { z } from "zod/v4";
import { html } from "../../../core/renderer/Views.ts";

const HomeDataSchema = z.object({ name: z.string() });

export const Homeview = (data: unknown) => {
    const { name } = HomeDataSchema.parse(data);
    return html`
    <section>
        <h1>Bienvenue ${name}</h1>
        <p>Ceci est le contenu de ma page, géré par mon renderer</p>
    </section>
`
}