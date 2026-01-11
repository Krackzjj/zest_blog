import { Hono } from "hono";
import { ZestEnv } from "@/main.tsx";
import blogRouter from "./blog/api/blog.router.tsx"
import SGR from "./styleguide/api/stylesguide.router.tsx";

const appRouter = new Hono<ZestEnv>;

appRouter.route("/", blogRouter)
appRouter.route("/sg", SGR)

export default appRouter;