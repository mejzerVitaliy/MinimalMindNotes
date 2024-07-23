import React from 'react'
import cl from './Account.module.scss'

const Account: React.FC = () => {
    return (
        <div>
            <nav className={cl.navigate}>
                <h1>Account</h1>
                <a href="/">log out</a>
            </nav>
        </div>
    )
}

export default Account