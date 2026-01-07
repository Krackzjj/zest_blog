import { z } from "zod/v4";

export const SafeHtmlSchema = z.object({
    __html: z.string()
});
export type SafeHtml = z.infer<typeof SafeHtmlSchema>;

export const HtmlEscapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
} as const;

const mapKeys = Object.keys(HtmlEscapeMap) as [keyof typeof HtmlEscapeMap, ...Array<keyof typeof HtmlEscapeMap>];
export const UnsafeCharsEnum = z.enum(mapKeys);

export const ExcapedStringSchema = z.string().brand<"EscapedString">();
export type EscapedString = z.infer<typeof ExcapedStringSchema>;

export const PageMetadataSchema = z.object({
    lang: z.string().min(2).optional().default("fr"),
    title: z.string().min(1),
    description: z.string().optional(),
    styles: z.array(z.string()).default(["/public/main.css"])
});
export type PageMetadata = z.infer<typeof PageMetadataSchema>;