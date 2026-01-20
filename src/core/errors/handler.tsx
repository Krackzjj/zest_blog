import { Context } from "hono";
import { render } from "@shared/utils/render.ts";
import { ErrorTemplate } from "@core/templates/Error.tsx";
import { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * Gère les pages non trouvées (404)
 */
export const handleNotFound = async (c: Context) => {
    const status: ContentfulStatusCode = 404;

    return await render(
        c,
        <ErrorTemplate
            code={status}
            title="Zest introuvable"
            message="La page que vous cherchez n'existe pas ou a été déplacée dans une autre corbeille de fruits."
        />,
        { title: "Page non trouvée" },
        status
    );
};

/**
 * Gère les erreurs globales du serveur (500)
 */
export const handleError = async (err: Error, c: Context) => {
    console.error(`🚨 [SYSTEM ERROR]: ${err.stack}`);

    const status: ContentfulStatusCode = 500;
    const isDev = process.env.NODE_ENV !== 'production';

    return await render(
        c,
        <ErrorTemplate
            code={status}
            title="Erreur du serveur"
            message={isDev ? err.message : "Une erreur technique est survenue. Nous essayons de presser le problème au plus vite."}
        />,
        { title: "Erreur 500" },
        status
    );
};