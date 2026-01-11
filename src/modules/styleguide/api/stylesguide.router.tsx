import { Hono } from "hono";
import { StyleGuideController } from "./stylesguide.controller.tsx";

const SGR = new Hono();
const controller = new StyleGuideController();

SGR.get("/",(c)=> controller.index(c));

export default SGR;