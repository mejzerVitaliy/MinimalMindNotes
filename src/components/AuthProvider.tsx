import React, {useState, ReactNode} from 'react'
import { authContext } from './context/authContext'

const AuthProvider: React.FC<{children:ReactNode}> = ({children}) => {
    
    const [isAuth, setIsAuth] = useState(false)
    

    return (
        <authContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider