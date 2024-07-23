import React from 'react'

interface MyButton {
    disabled: boolean,
    className?: string
}

const FormButton: React.FC<MyButton> = ({disabled, className}) => {
    return (
        <button className={className} disabled={disabled}>Sign In</button>
    )
}

export default FormButton