import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { chekAuth } from "../../../API/Api";
import { authContext } from "../../context/CreateContext";
import FormButton from "../../UI/Button/FormButton";
import SignInInput from "../../UI/Inputs/SignInInput";
import cl from "./LoginForm.module.scss";

interface FormInputs {
    login: string;
    password: string;
}
const LoginForm: React.FC = () => {
    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    const { isAuth, setIsAuth, setIsUserID } = useAuthCtx();
    const [showPassword, setShowPassword] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormInputs>({
        mode: "all",
    });

    const passwordVisibility = () => {
        setShowPassword((visibility) => !visibility);
    };

    const onSubmitLogIn: SubmitHandler<FormInputs> = async (data) => {
        try {
            const users = await chekAuth(data.login, data.password);
            if (users.length > 0) {
                setIsAuth(true);
                setIsUserID(users[0].id)
                localStorage.setItem("isAuth", `${isAuth}`);
                Cookies.set("userID", users[0].id, {expires: 365})
                
            } else alert("Invalid login or password");
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    return (
        <div className={cl.center}>
            <form onSubmit={handleSubmit(onSubmitLogIn)} className={cl.form}>
                <h1 className={cl.title}>Login</h1>
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
                    <button type="button" onClick={passwordVisibility} className={cl.visibility} >
                        {showPassword ? "🙈" : "🙉"}
                    </button>
                </div>

                <div className={cl.errors}>
                    {errors.login && <p>{errors.login.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <a href="/signIn" className={cl.linkTo}>
                    Don't have an account yet? Sign up
                </a>

                <FormButton
                    disabled={!isValid || isSubmitting}
                    className={!isValid || isSubmitting ? cl.disabledBtn : cl.button}
                >
                    Log In
                </FormButton>
            </form>
        </div>
    );
};
export default LoginForm;
