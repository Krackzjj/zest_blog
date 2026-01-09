import { Hono } from "hono";
import { ZestEnv } from "@/main.tsx";
import { HomeView } from "@blog/api/views/HomeView.tsx";
import { render } from "@shared/utils/render.ts";
import { PageMetadata } from "@shared/schemas/html.schema.ts";

const blog = new Hono<ZestEnv>()

// 1. Page d'accueil
blog.get("/", async (c) => {
    const view = <HomeView name="Zest" />
    const meta: PageMetadata = {
        title: "Accueil",
    }
    return await render(c, view, meta)
})

export default blog;