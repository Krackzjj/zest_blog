import { HtmlEscapeMap, UnsafeCharsEnum, ExcapedStringSchema, EscapedString } from "../schemas/html.schema.ts";

export const escapeHtml = (str: string): EscapedString => {

    const charsToEscape = Object.keys(HtmlEscapeMap).join("");
    const regex = new RegExp(`[${charsToEscape}]`, "g");

    const escaped = str.replace(regex, (char) => {
        const validation = UnsafeCharsEnum.safeParse(char);
        if (validation.success) {
            return HtmlEscapeMap[validation.data];
        }
        return char;
    });
    return ExcapedStringSchema.parse(escaped);
}