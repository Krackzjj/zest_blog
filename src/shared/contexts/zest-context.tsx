import type { Context } from "hono";
import type { Child } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";

interface ZestContextProps {
    c: Context;
}

const ZestContext = createContext<ZestContextProps | undefined>(undefined);

export const ZestProvider = ({ children, c }: { children: Child, c: Context }) => {
    return (
        <ZestContext.Provider value={{ c }}>
            {children}
        </ZestContext.Provider>
    )
};

export const useZest = () => {
    const context = useContext(ZestContext);
    if (!context) {
        throw new Error("useZest doit être utilisé dans ZestProvider");
    }
    return context;
}