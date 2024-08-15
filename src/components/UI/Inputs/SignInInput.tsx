import React from 'react'

interface ImportProps {
    type: React.HTMLInputTypeAttribute,
    placeholder?: React.HTMLInputTypeAttribute,
    register: any,
    className?: string
    autocomplete?:string
}

const SignInInput: React.FC<ImportProps> = ({type, placeholder, register, autocomplete}) => {
    return (
        <input type={type} placeholder={placeholder} {...register} autoComplete={autocomplete} className={ type === "checkbox" ? 'h-3 w-3 mr-1 text-blue-600 focus:ring-blue-500 rounded-full' : "text-center text-[16px] xl:text-[20px] checked:w-3 checked:h-3 border-1 border-solid border-gray-300 rounded-lg transition-all duration-300 bg-slate-300 my-1 text-gray-800 h-5 md:h-6 w-full px-0 py-0 placeholder:text-gray-500"} />
    )
}

export default SignInInput