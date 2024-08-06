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

    const toAbout = () => {
        navigate('/aboutMinimalMind')
    }

    return (
        <nav className={cl.navbar}>
            
            <header>
                <h1 className='title' onClick={toAbout}>MinimalMind |<span>{title}</span> </h1>
            </header>

            <div>
                <svg className={cl.accountIcon} onClick={toAccount} width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.5375 69.375C54.6731 69.375 69.375 54.8802 69.375 37C69.375 19.1198 54.6731 4.625 36.5375 4.625C18.4018 4.625 3.69995 19.1198 3.69995 37C3.69995 54.8802 18.4018 69.375 36.5375 69.375Z" fill="#515151" />
                    <path d="M36.5375 39.775C43.945 39.775 49.95 33.9771 49.95 26.825C49.95 19.6729 43.945 13.875 36.5375 13.875C29.13 13.875 23.125 19.6729 23.125 26.825C23.125 33.9771 29.13 39.775 36.5375 39.775Z" fill="#191919" />
                    <path d="M36.5481 42.55C33.9283 42.5566 31.3355 43.0824 28.9177 44.0974C26.4999 45.1124 24.3044 46.5967 22.4567 48.4655C20.6089 50.3343 19.1451 52.5511 18.1488 54.9893C17.1525 57.4274 16.6432 60.0392 16.65 62.6754C22.3802 67.0205 29.3595 69.372 36.5344 69.375C43.7094 69.378 50.6906 67.0324 56.4245 62.6922C56.4416 60.0541 55.9403 57.4387 54.9492 54.9963C53.9581 52.5539 52.4969 50.3329 50.6497 48.4609C48.8024 46.5889 46.6055 45.103 44.1854 44.0885C41.7653 43.0741 39.1698 42.5513 36.5481 42.55Z" fill="#191919" />
                </svg>
            </div>
            
        </nav>
    )
}

export default Navbar