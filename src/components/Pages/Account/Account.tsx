import React, { useContext } from 'react'
import cl from './Account.module.scss'
import FormButton from '../../UI/Button/FormButton'
import { authContext } from '../../context/authContext'
import Navbar from '../../UI/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Account: React.FC = () => {
    const navigate = useNavigate()
    const AuthCtx = useContext(authContext)
    
    if (!AuthCtx) {
        throw new Error('authContext must be used within an AuthProvider')
    }

    const { setIsAuth} = AuthCtx


    const logOut = () => {
        setIsAuth(false)
        localStorage.removeItem('isAuth')
    }

    const back = () => {
        navigate('/myNotes')
    }
    
    return (
        <>
            <Navbar title='MyAccount'/>
            <FormButton className={cl.button} onClick={logOut}>log out</FormButton>
            <FormButton className={cl.button} onClick={back}>Back to MyNotes</FormButton>
        </>
    )
}

export default Account