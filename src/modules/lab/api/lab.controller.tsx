import { render } from "@/shared/utils/render.ts";
import { Context } from "hono";
import { LabView } from "../views/LabView.tsx";

export class LabController {
    async index(c: Context) {
        const view = <LabView />;
        return await render(c, view, { title: 'Laboratoire de composants' });
    }
}