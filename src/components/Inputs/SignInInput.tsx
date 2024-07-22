import React from 'react'
import cl from "./SignInInput.module.scss";
import classNames from 'classnames';

interface ImportProps {
    type: React.HTMLInputTypeAttribute,
    placeholder?: React.HTMLInputTypeAttribute,
    register: any,
    className?: string
}

const SignInInput: React.FC<ImportProps> = ({type, placeholder, register, className}) => {
    return (
        <input type={type} placeholder={placeholder} {...register} className={classNames(cl.inputs, className)} />
    )
}

export default SignInInput