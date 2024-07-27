import React from 'react'
import { useNavigate } from 'react-router-dom'
import cl from './Navbar.module.scss'


interface NavbarPropsTypes{
    title: string
}


const Navbar: React.FC<NavbarPropsTypes> = ({ title}) => {
    const navigate = useNavigate()
    
    const toAccount = () => {
        navigate('/account')
    }

    return (
        <nav className={cl.navbar}>
            
            <header>
                <h1>MinimalMind | {title}</h1>
            </header>

            <div>
                <h3>MyNotes</h3>
                <h3>About</h3>
                <img src="src/assets/accountDefaultIcon.png" alt="MyAccount" onClick={toAccount}/>
            </div>
            
        </nav>
    )
}

export default Navbar