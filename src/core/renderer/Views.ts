import { SafeHtmlSchema, type SafeHtml } from "../../shared/schemas/html.schema.ts";
import { escapeHtml } from "../../shared/utils/security.ts";


/**
 * 
 * @param child 
 * @returns 
 */
const renderChilds = (child: any): string => {
    if (child === null || child === undefined || child === false) return "";
    if (Array.isArray(child)) return child.map(renderChilds).join("");

    // 2.1 Cas: SafeHtml
    if (isSafeHtml(child)) return child.__html;

    // 2.2 Cas: Text brut => on echape
    return escapeHtml(String(child))
};

/**
 * 
 * @param tag 
 * @param props 
 * @param children 
 * @returns 
 */
export function h(
    tag: string,
    props: Record<string, any> | null = {},
    ...children: any[]
): SafeHtml {
    const attrs = props ? Object.entries(props).map(([key, value]) => ` ${key}="${escapeHtml(String(value))}"`).join("") : "";

    const content = renderChilds(children)

    return {
        __html: `<${tag}${attrs}>${content}</${tag}>`
    } as SafeHtml;
}

/**
 * 
 * @param children 
 * @returns 
 */
export function fragment(...children: any[]): SafeHtml {
    return {
        __html: renderChilds(children)
    } as SafeHtml;
};

type HTMLTags = keyof HTMLElementTagNameMap;

type HTMLAttrs<K extends HTMLTags> = Partial<{
    [P in keyof HTMLElementTagNameMap[K]as HTMLElementTagNameMap[K][P] extends string | number | boolean | undefined ? P : never]: HTMLElementTagNameMap[K][P]
}> & {
    class?: string;
    style?: string;
    for?: string;
    charset?: string;
};

type TagFunction<K extends HTMLTags> = {
    (props: HTMLAttrs<K>, ...children: any[]): SafeHtml;
    (...children: any[]): SafeHtml;
};

type ZestRenderer = {
    [K in HTMLTags]: TagFunction<K>;
} & {
    fragment: (...children: any[]) => SafeHtml;
};

/**
 * Proxy
 */
export const _z = new Proxy({} as ZestRenderer, {
    get(_, tag: string) {
        if (tag === "fragement") {
            return (...children: any[]) => fragment(children)
        }
        return (propsOrFirstChild?: any, ...otherChildren: any[]) => {
            // 1. Detection props ou child ?
            const isProps = propsOrFirstChild !== null &&
                typeof propsOrFirstChild === "object" &&
                !("__html" in propsOrFirstChild) &&
                !Array.isArray(propsOrFirstChild);

            if (isProps) {
                return h(tag, propsOrFirstChild, ...otherChildren);
            }
            return h(tag, {}, propsOrFirstChild, ...otherChildren);
        }
    }
})

/*
 * Type Guard
*/

function isSafeHtml(value: any): value is SafeHtml {
    return (
        value !== null && typeof value === "object" && "__html" in value && typeof value.__html === "string"
    );
}