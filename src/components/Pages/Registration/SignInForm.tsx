import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Validate } from "react-hook-form";
import { checkLogins, createUser } from "../../../API/Api";
import { authContext } from "../../context/CreateContext";
import FormButton from "../../UI/Button/FormButton";
import SignInInput from "../../UI/Inputs/SignInInput";

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

    const loginValidation: Validate<string, FormInputs> = async (value: string) => {
        try {
            const existingLogins = await checkLogins(value);
            if (existingLogins.length > 0) {
                return "Login already exists";
            }
            return true;
        } catch (error) {
            console.error("Error checking logins:", error);
        }
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
        <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('src/assets/backgroundImg.png')]">
            <form onSubmit={handleSubmit(onSubmitSignIn)} className="flex flex-col justify-center items-center border-2 border-solid border-gray-300 backdrop-blur-lg shadow-2xl shadow-black p-5 rounded-[20px]">
                <h1 className="text-[52px] leading-none mt-2 mb-10 text-white">Registration</h1>

                <SignInInput
                    type="text"
                    placeholder="enter login"
                    register={register("login", {
                        required: "login is required",
                        validate: loginValidation
                    })}
                />

                <div className="relative flex items-center w-[245px]">
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
                    <button type="button" onClick={passwordVisibility} className="absolute right-2 p-0 bg-transparent border-none cursor-pointer outline-none transition duration-200 ease-in-out hover:scale-110" >
                        {showPassword ? "🙈" : "🙉"}
                    </button>
                </div>

                <div className="relative flex items-center w-[245px] mb-1">
                    <SignInInput
                        type={showPassword2 ? "text" : "password"}
                        placeholder="repeat password"
                        register={register("password2", {
                            required: "password2 is required",
                            validate: secondPasswordValidation,
                        })}
                    />

                    <button type="button" onClick={passwordVisibility2} className="absolute right-2 p-0 bg-transparent border-none cursor-pointer outline-none transition duration-200 ease-in-out hover:scale-110">
                        {showPassword2 ? "🙈" : "🙉"}
                    </button>
                </div>

                <div className="flex justify-around m-2">
                    <SignInInput
                        type="checkbox"
                        register={register("checkbox", {
                            required: "checkbox is required"
                        })}
                        className="checkbox"
                    />
                    <p className='text-[16px] text-white mx-1'>I'm agree to work with my personal data</p>
                </div>

                <div className="border-2 border-solid border-gray-900 text-red-400 rounded-lg w-[280px] my-2 text-center text-[16px]">
                    {errors.login && <p>{errors.login.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                    {errors.password2 && <p>{errors.password2.message}</p>}
                    {errors.checkbox && <p>{errors.checkbox.message}</p>}
                </div>

                <a href="/logIn" className="text-white text-[18px] transition duration-300 ease-in-out hover:scale-110 my-4">
                    Already have an account? Log in
                </a>

                <FormButton
                    disabled={!isValid || isSubmitting}
                    className=" bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-black hover:scale-105  py-1 my-3 mx-0 w-[300px] border-2 border-solid border-gray-300 rounded-full transition duration-200 ease-in-out disabled:bg-gray-600 disabled:text-slate-400 disabled:cursor-auto disabled:border-none disabled:transform-none "
                >
                    Sign In
                </FormButton>
            </form>
        </div>
    );
};
export default SignInForm;
