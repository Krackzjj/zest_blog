import { Hono } from "hono";
import { ZestEnv } from "@/main.tsx";
import blogRouter from "./blog/api/blog.router.tsx"

const appRouter = new Hono<ZestEnv>;

appRouter.route("/", blogRouter)

export default appRouter;