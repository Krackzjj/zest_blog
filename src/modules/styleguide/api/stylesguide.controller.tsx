import { render } from "@/shared/utils/render.ts";
import { Context } from "hono";
import { StyleGuideView } from "../views/StylesGuideView.tsx";

export class StyleGuideController {
    async index(c: Context) {
        const view = <StyleGuideView />;
        return await render(c, view, { title: 'StyleGuide' });
    }
}