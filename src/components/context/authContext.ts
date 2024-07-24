import { createContext } from "react";

interface AuthContext{
    isAuth: boolean,
    setIsAuth: (value:boolean) => void
}

export const authContext = createContext<AuthContext | null>(null)