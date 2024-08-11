import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { chekAuth } from "../../../API/Api";
import { authContext } from "../../context/CreateContext";
import FormButton from "../../UI/Button/FormButton";
import SignInInput from "../../UI/Inputs/SignInInput";

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
        <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('src/assets/backgroundImg.png')]">
            <form onSubmit={handleSubmit(onSubmitLogIn)} className="flex flex-col justify-center items-center border-2 border-solid border-gray-300 backdrop-blur-lg shadow-2xl shadow-black p-5 rounded-[20px]">
                <h1 className="text-[52px] leading-none mt-2 mb-10 text-white">Login</h1>
            
                <SignInInput
                    type="text"
                    placeholder="enter login"
                    register={register("login", {
                        required: "login is required",
                    })}
                className="mb-4"
                />
        
                <div className="relative flex items-center w-[245px] mb-1">
                    <SignInInput
                        type={showPassword ? "text" : "password"}
                        placeholder="enter password"
                        register={register("password", {
                            required: "password is required",
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/,
                              message: "password must be longer than 6 characters, shorter than 10 characters, include one uppercase letter, one lowercase letter, and one number.",
                            },
                        })}
                    />
                    <button type="button" onClick={passwordVisibility} className="absolute right-2 p-0 bg-transparent border-none cursor-pointer outline-none transition duration-200 ease-in-out hover:scale-110">
                        {showPassword ? "🙈" : "🙉"}
                    </button>
                </div>
            
                <div className="border-2 border-solid border-gray-900 text-red-400 rounded-lg w-[280px] my-2 text-center  text-[16px]">
                    {errors.login && <p>{errors.login.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
            
                <a href="/signIn" className="text-white text-[18px] transition duration-300 ease-in-out hover:scale-110 my-4">Don't have an account yet? Sign up</a>

                <FormButton
                    disabled={!isValid || isSubmitting}
                    className=" bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-black hover:scale-105  py-1 my-3 mx-0 w-[300px] border-2 border-solid border-gray-300 rounded-full transition duration-200 ease-in-out disabled:bg-gray-600 disabled:text-slate-400 disabled:cursor-auto disabled:border-none disabled:transform-none "
                >
                    Log In
                </FormButton>
            </form>
        </div>
    );
};
export default LoginForm;
