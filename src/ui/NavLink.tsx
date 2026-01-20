import { Context } from "hono";
import { Child } from "hono/jsx";

interface NavLinkProps {
    href: string;
    children: Child;
    className?: string;
}

const NavLink = ({ href, className, children, c }: NavLinkProps & { c: Context }) => {
    const currentPath = c.req.path;

    const isActive = currentPath === href;
    const activeClass = isActive ? "is-active" : "";

    return (
        <a href={href} class={`${className} ${activeClass}`.trim()}>{children}</a>
    )
};

export default NavLink;