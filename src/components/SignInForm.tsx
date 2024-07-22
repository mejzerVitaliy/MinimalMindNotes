import React, { useState } from 'react'
import SignInInput from './Inputs/SignInInput'
import {useForm, SubmitHandler } from 'react-hook-form'
import FormButton from './Button/FormButton'

interface FormInputs{
    login: string,
    password: string,
    password2: string,
    checkbox: boolean
}

const SignInForm: React.FC = () => {
    
    const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>({
        mode: 'onBlur'
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    
    
    const onSubmit: SubmitHandler<FormInputs> = data => {
        data.password===data.password2? alert('registration completed successfully'):alert('password != password2')
    }

    const passwordVisibility = () => {
        setShowPassword(visibility => !visibility)
        
    }

    const passwordVisibility2 = () => {
        
        setShowPassword2(visibility => !visibility)
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='signInForm'>
            <h1>Sign In</h1>

            <SignInInput type="text" placeholder="Enter your login" register={register('login', {required: 'login is required'})} />
            
            <SignInInput
                
                type={showPassword? 'text' : 'password'}
                placeholder="Enter your password"
                register={register('password', {
                    required: 'password is required',
                    minLength: { value: 6, message: "password must be longer than 6 characters" },
                    maxLength: { value: 10, message: "password must be shorter than 10 characters" },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]$/,
                        message: 'password must be longer than 6 characters, shorter than 10 characters, include one uppercase letter, one lowercase letter, one number, and one special character.'
                    }
                })}
            />
            <button type='button' onClick={passwordVisibility}>
                {showPassword ? '🙈' : '🙉'}
            </button>

            
            <SignInInput   
                type={showPassword2? 'text' : 'password'}   
                placeholder="Repeat your password"    
                register={register('password2', {
                    required: 'password2 is required',
                    minLength: { value: 6, message: "password must be longer than 6 characters" },
                    maxLength: { value: 10, message: "password must be shorter than 10 characters" }
                })}
            />
            <button type='button' onClick={passwordVisibility2}>
                {showPassword2 ? '🙈' : '🙉'}
            </button>
            
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '8px'
            }}>
                <SignInInput type="checkbox" placeholder="" register={register('checkbox', {required: 'checkbox is required'})}/>
                <p>I'm agree to work with my personal data</p>
            </div>
            
            
            <details className='errors'>
                {errors.login && <p>{ errors.login.message }</p>}
                {errors.password && <p>{errors.password.message}</p>}
                {errors.password2 && <p>{errors.password2.message}</p>}             
                {errors.checkbox && <p>{ errors.checkbox.message }</p>}
            </details>
            

            <FormButton />
            
        </form>
    )
}

export default SignInForm 