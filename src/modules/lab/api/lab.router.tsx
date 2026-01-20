import { Hono } from "hono";
import { LabController } from "./lab.controller.tsx";

const SGR = new Hono();
const controller = new LabController();

SGR.get("/", (c) => controller.index(c));

export default SGR;