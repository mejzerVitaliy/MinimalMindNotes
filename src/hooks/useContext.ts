import {useContext, createContext} from 'react'


interface AuthContext{
    isAuth: boolean,
    isUserID: string | null | undefined,
    setIsAuth: (value: boolean) => void,
    setIsUserID: (value: string | null) => void
}

export const authContext = createContext<AuthContext | null>(null)

export const useAuthCtx = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error('authContext must be used within an AuthProvider')
    }
    return context
}

