import { Typography } from "@ui";

interface ErrorTemplateProps {
    code: number;
    title: string;
    message: string;
}
export const ErrorTemplate = ({ code, message, title }: ErrorTemplateProps) => {
    return (
        <main>
            <Typography is="h1">Erreur {code}</Typography>
            <Typography is="h1">Titre: {title}</Typography>
            <p>{message}</p>
            <a href="/">Retour à la maison</a>
        </main>
    )
}