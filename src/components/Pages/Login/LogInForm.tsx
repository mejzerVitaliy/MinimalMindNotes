import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SignInInput from "../../UI/Inputs/SignInInput";
import { useNavigate } from "react-router-dom";
import FormButton from "../../UI/Button/FormButton";
import cl from './LoginForm.module.scss'
// import { authContext } from "../../context/authContext";

interface FormInputs {
    login: string;
    password: string;
}

const LoginForm: React.FC = () => {
    
    // const { isAuth, setIsAuth } = useContext(authContext)


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormInputs>({
        mode: "all",
    });
    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
  
    const passwordVisibility = () => {
        setShowPassword((visibility) => !visibility);
    };

    const onSubmit: SubmitHandler<FormInputs> = data => {
        navigate("/account");
        console.log(data);
        setIsAuth(true)
    };

    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
        <h1>Login</h1>

        <SignInInput
            type="text"
            placeholder="enter login"
            register={register("login", {
            required: "login is required",
            })}
        />

        <div className={cl.password}>
            <SignInInput
            type={showPassword ? "text" : "password"}
            placeholder="enter password"
            register={register("password", {
                required: "password is required",
                pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/,
                message:
                    "password must be longer than 6 characters, shorter than 10 characters, include one uppercase letter, one lowercase letter, and one number.",
                },
            })}
            />
            <button
            type="button"
            onClick={passwordVisibility}
            className={cl.visibility}
            >
            {showPassword ? "🙈" : "🙉"}
            </button>
        </div>

        <div className={cl.errors}>
            {errors.login && <p>{errors.login.message}</p>}
            {errors.password && <p>{errors.password.message}</p>}
        </div>

        <a href="/signIn">Don't have an account yet? Sign up</a>

        <FormButton
            disabled={!isValid || isSubmitting}
            className={!isValid || isSubmitting ? cl.disabledBtn : cl.button}
        />
        </form>
    );
};

export default LoginForm;
