import React from 'react'
import cl from "./FormButton.module.scss";

const FormButton: React.FC = () => {
    return (
        <button className={cl.button}>Sign In</button>
    )
}

export default FormButton