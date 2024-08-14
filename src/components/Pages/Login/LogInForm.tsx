import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkAuth } from "../../../API/Api";
import { authContext } from "../../context/CreateContext";
import FormButton from "../../UI/Button/FormButton";
import SignInInput from "../../UI/Inputs/SignInInput";
import Modal from "../../UI/ModalWindow/Modal";
import { useNavigate } from "react-router-dom";

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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const nav = useNavigate()
    
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
            const users = await checkAuth(data.login, data.password);
            if (users.length > 0) {
                console.log(users);
                
                setIsAuth(true);
                setIsUserID(users[0].id)
                localStorage.setItem("isAuth", `${isAuth}`);
                Cookies.set("userID", users[0].id, {expires: 365})
                
            } else {
                setIsModalOpen(true)
                setTimeout(() => {
                    setIsModalOpen(false)
                }, 2000)
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('src/assets/backgroundBlack.png')]">
            <form onSubmit={handleSubmit(onSubmitLogIn)} className="flex flex-col justify-center items-center border-2 border-solid border-gray-300 backdrop-blur-lg shadow-2xl shadow-black p-2 md:py-4 md:p-3 w-3/5 sm:w-2/6 md:w-[240px] xl:w-[270px] rounded-[20px]">
                <h1 className="text-[30px] sm:text-[36px] lg:text[40px] xl:text-[44px] leading-none mt-1 mb-1 sm:mb-2 lg:mb-4 xl:mb-5 text-white">Log in</h1>
            
                <SignInInput
                    type="text"
                    placeholder="enter login"
                    register={register("login", {
                        required: "login is required",
                    })}
                    autocomplete="username"
                />
        
                <div className="relative flex items-center w-full">
                    <SignInInput
                        autocomplete="current-password"
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
                    <button type="button" onClick={passwordVisibility} className="absolute right-1 text-[18px] p-0 bg-transparent border-none cursor-pointer outline-none transition duration-200 ease-in-out hover:scale-110">
                        {showPassword ? "🙈" : "🙉"}
                    </button>
                </div>
            
                <div className="border-1 border-solid border-gray-900 text-red-400 rounded-lg w-full max-h-9 overflow-y-scroll my-1 text-center text-[10px] md:text-[14px] xl:text-[16px]">
                    {errors.login && <p>{errors.login.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
            
                <p onClick={() => nav('signIn')} className="text-white text-center text-[12px] md:text-[14px] xl:text-[18px] transition duration-300 ease-in-out hover:scale-110 my-2">Don't have an account yet?   Sign Up!</p>

                <FormButton
                    disabled={!isValid || isSubmitting}
                    className="  bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-black hover:scale-105  py-1 my-3 mx-0 w-full border-2 border-solid border-gray-300 rounded-full transition duration-200 ease-in-out disabled:bg-gray-600 disabled:text-slate-400 disabled:cursor-auto disabled:border-none disabled:transform-none "
                >
                    Log In
                </FormButton>
            </form>

            {isModalOpen && <Modal message="Invalid login or password" message2="Try again!" style={{height: '70px', animation: 'none'}} />}
        </div>
    );
};
export default LoginForm;
