import React, { useContext } from 'react'
import cl from './Account.module.scss'
import FormButton from '../../UI/Button/FormButton'
import { authContext } from '../../context/authContext'

const Account: React.FC = () => {
    
    const AuthCtx = useContext(authContext)
    
    if (!AuthCtx) {
        throw new Error('authContext must be used within an AuthProvider')
    }

    const { setIsAuth} = AuthCtx


    const logOut = () => {
        setIsAuth(false)

        localStorage.removeItem('isAuth')
        
    }
    
    return (
        <div>
            <nav className={cl.navigate}>
                <h1>Account</h1>
                <FormButton onClick={logOut}>log out</FormButton>
                
            </nav>
        </div>
    )
}

export default Account