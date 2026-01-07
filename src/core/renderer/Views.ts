import { SafeHtmlSchema, type SafeHtml } from "../../shared/schemas/html.schema.ts";
import { escapeHtml } from "../../shared/utils/security.ts";

/**
 * Permet de distinguer le HTML sûr des chaînes brute
 */
export function html(strings: TemplateStringsArray, ...values: any[]): SafeHtml {
    const result = strings.reduce((acc, str, i) => {
        const value = values[i];
        let processed = "";

        /** On gère les tableaux / Object */
        if (Array.isArray(value)) {
            processed = value.map((v) => {
                /** Si c'est déjà du safeHtml */
                if (isSafeHtml(v)) return v.__html;
                return escapeHtml(String(v));
            }).join("");
        } else if (isSafeHtml(value)) {
            processed = value.__html;
        } else if (value === undefined || value === null) {
            processed = "";
        } else {
            processed = escapeHtml(String(value));
        }
        return acc + str + processed;
    }, "");
    return SafeHtmlSchema.parse({ __html: result });
};

/**
 * Type Guard
*/

function isSafeHtml(value: any): value is SafeHtml {
    return (
        value !== null && typeof value === "object" && "__html" in value && typeof value.__html === "string"
    );
}