import { render } from "@/shared/utils/render.ts";
import { Context } from "hono";
import { StyleGuideView } from "../views/StylesguideView.tsx";

export class StyleGuideController {
    async index(c: Context){
        const view = <StyleGuideView context={c}/>;
        return await render(c,view,{title: 'StyleGuide'});
    }
}