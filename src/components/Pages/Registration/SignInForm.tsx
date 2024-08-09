import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUser } from "../../../API/Api";
import { authContext } from "../../context/CreateContext";
import FormButton from "../../UI/Button/FormButton";
import SignInInput from "../../UI/Inputs/SignInInput";
import cl from "./SigninForm.module.scss";

interface FormInputs {
    login: string;
    password: string;
    password2: string;
    checkbox: boolean;
}
const SignInForm: React.FC = () => {
    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    const { isAuth, setIsAuth, setIsUserID } = useAuthCtx();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        getValues,
    } = useForm<FormInputs>({
        mode: "all",
    });

    const passwordVisibility = () => {
        setShowPassword((visibility) => !visibility);
    };
    const passwordVisibility2 = () => {
        setShowPassword2((visibility) => !visibility);
    };

    const secondPasswordValidation = async (value: string) => {
        const password1 = getValues("password");
        return value === password1 || "passwords don't match";
    };

    const onSubmitSignIn: SubmitHandler<FormInputs> = async (data) => {
        const userID = Date.now().toString();
        const userData = {
            id: userID,
                ...data,
            notes: []
        };
        try {
            await createUser(userData);
            setIsAuth(true);
            setIsUserID(userData.id)
            localStorage.setItem("isAuth", `${isAuth}`);
            Cookies.set("userID", userData.id, { expires: 365 });
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };
    return (
        <div className={cl.center}>
            <form onSubmit={handleSubmit(onSubmitSignIn)} className={cl.form}>
                <h1 className={cl.title}>Registration</h1>

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
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/,
                                message:
                                "password must be longer than 6 characters, shorter than 16 characters, include one uppercase letter, one lowercase letter, and one number.",
                            },
                        })}
                    />
                    <button type="button" onClick={passwordVisibility} className={cl.visibility} >
                        {showPassword ? "🙈" : "🙉"}
                    </button>
                </div>

                <div className={cl.password}>
                    <SignInInput
                        type={showPassword2 ? "text" : "password"}
                        placeholder="repeat password"
                        register={register("password2", {
                            required: "password2 is required",
                            validate: secondPasswordValidation,
                        })}
                    />

                    <button type="button" onClick={passwordVisibility2} className={cl.visibility} >
                        {showPassword2 ? "🙈" : "🙉"}
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "8px",
                    }}
                    >
                    <SignInInput
                        type="checkbox"
                        register={register("checkbox", {
                            required: "checkbox is required"
                        })}
                        className="checkbox"
                    />
                    <p className={cl.par}>I'm agree to work with my personal data</p>
                </div>

                <div className={cl.errors}>
                    {errors.login && <p>{errors.login.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                    {errors.password2 && <p>{errors.password2.message}</p>}
                    {errors.checkbox && <p>{errors.checkbox.message}</p>}
                </div>

                <a href="/logIn" className={cl.linkTo}>
                    Already have an account? Log in
                </a>

                <FormButton
                    disabled={!isValid || isSubmitting}
                    className={!isValid || isSubmitting ? cl.disabledBtn : cl.button}
                >
                    Sign In
                </FormButton>
            </form>
        </div>
    );
};
export default SignInForm;
