import { asset } from "@core/utils/assets.ts";
import { NavLink } from "@ui";
import { Context } from "hono";
import { Child } from "hono/jsx";

interface NavbarProps {
    items?: Child[];
}
const Navbar = ({ c }: NavbarProps & { c: Context }) => {
    return (
        <nav class="nav-bar">
            <NavLink className="nav-logo" href="/" c={c}><img id="logo" src={asset.img("logo.png")} /></NavLink>
            <div class="nav-menu">
                <NavLink className="nav-item" href="/" c={c}>Accueil</NavLink>
                <NavLink className="nav-item" href="/components-lab" c={c}>Laboratoire de composants</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;