import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../UI/Button/FormButton";
import Navbar from "../../UI/Navbar/Navbar";
import cl from "./Account.module.scss";
import { authContext } from "../../context/CreateContext";

const Account: React.FC = () => {
    const navigate = useNavigate();

    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };



    const { setIsAuth, setIsUserID } = useAuthCtx();

    const logOut = () => {
        setIsAuth(false);
        setIsUserID(null);

        localStorage.removeItem("isAuth");
        Cookies.remove("userID");
    };

    const back = () => {
        navigate("/myNotes");
    };

    return (
        <>
        <Navbar title="MyAccount" />

        <FormButton className={cl.logout} onClick={logOut}>
            log out
        </FormButton>
        <FormButton className={cl.back} onClick={back}>
            Back to MyNotes
        </FormButton>
        </>
    );
};

export default Account;
