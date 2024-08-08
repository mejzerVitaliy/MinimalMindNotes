import React, { ReactNode } from 'react'

interface MyButton {
    disabled?: boolean,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    children?: string | ReactNode
}

const FormButton: React.FC<MyButton> = ({disabled, className, onClick, children, }) => {
    return (
        <button className={className} disabled={disabled} onClick={onClick} >{children}</button>
    )
}

export default FormButton