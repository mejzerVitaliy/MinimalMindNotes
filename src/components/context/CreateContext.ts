import { createContext } from "react";

interface AuthContext {
    isAuth: boolean;
    isUserID: string | null | undefined;
    setIsAuth: (value: boolean) => void;
    setIsUserID: (value: string | null) => void;
}

export const authContext = createContext<AuthContext | null>(null);