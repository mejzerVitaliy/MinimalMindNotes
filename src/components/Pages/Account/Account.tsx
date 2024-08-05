import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../UI/Button/FormButton";
import Navbar from "../../UI/Navbar/Navbar";
import cl from "./Account.module.scss";
import { authContext } from "../../context/CreateContext";
import { getUserByID } from "../../../API/notesServise";
import Modal from "../../UI/ModalWindow/Modal";

const Account: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>({})
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };

    const { setIsAuth, setIsUserID, isUserID } = useAuthCtx();

    const logOut = () => {
        setIsAuth(false);
        setIsUserID(null);

        localStorage.removeItem("isAuth");
        Cookies.remove("userID");
    };

    const back = () => {
        navigate("/myNotes");
    };

    const getUserData = async (isUserID: string | null | undefined) => {
        const userDataByID = await getUserByID(isUserID)
        console.log(userDataByID);

        setUserData(userDataByID)
    }

    const modalSwitcher = () => {
        setIsModalOpen(true)
    }

    const cancelModal = () => {
        setIsModalOpen(false)
    }


    useEffect(() => {
        const userID = Cookies.get('userID')
        setIsUserID(userID)

        getUserData(isUserID)

    }, [isUserID])

    return (
        <body>
            <main className={cl.accountPage}>
                <Navbar title="MyAccount" />

                <section className={cl.userAccount}>

                    <div className={cl.userAvatar}>
                        <svg width="250" height="250" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.5375 69.375C54.6731 69.375 69.375 54.8802 69.375 37C69.375 19.1198 54.6731 4.625 36.5375 4.625C18.4018 4.625 3.69995 19.1198 3.69995 37C3.69995 54.8802 18.4018 69.375 36.5375 69.375Z" fill="#515151" />
                            <path d="M36.5375 39.775C43.945 39.775 49.95 33.9771 49.95 26.825C49.95 19.6729 43.945 13.875 36.5375 13.875C29.13 13.875 23.125 19.6729 23.125 26.825C23.125 33.9771 29.13 39.775 36.5375 39.775Z" fill="#191919" />
                            <path d="M36.5481 42.55C33.9283 42.5566 31.3355 43.0824 28.9177 44.0974C26.4999 45.1124 24.3044 46.5967 22.4567 48.4655C20.6089 50.3343 19.1451 52.5511 18.1488 54.9893C17.1525 57.4274 16.6432 60.0392 16.65 62.6754C22.3802 67.0205 29.3595 69.372 36.5344 69.375C43.7094 69.378 50.6906 67.0324 56.4245 62.6922C56.4416 60.0541 55.9403 57.4387 54.9492 54.9963C53.9581 52.5539 52.4969 50.3329 50.6497 48.4609C48.8024 46.5889 46.6055 45.103 44.1854 44.0885C41.7653 43.0741 39.1698 42.5513 36.5481 42.55Z" fill="#191919" />
                        </svg>
                    </div>

                    <div className={cl.userInfo}>
                        <h3>Login: <u>{ userData.login }</u></h3>
                        <h3>Password: <u>{userData.password}</u></h3>
                        <h3>Notes created: { userData.notes?.length || 0 }</h3>
                    </div>

                </section>

                <FormButton className={cl.logout} onClick={modalSwitcher}>
                    <h3>log out</h3>
                </FormButton>
        
                <FormButton className={cl.back} onClick={back}>
                    <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M7.33337 22L6.62627 21.2929L5.91916 22L6.62627 22.7071L7.33337 22ZM34.8334 23C35.3857 23 35.8334 22.5523 35.8334 22C35.8334 21.4477 35.3857 21 34.8334 21V23ZM17.6263 10.2929L6.62627 21.2929L8.04048 22.7071L19.0405 11.7071L17.6263 10.2929ZM6.62627 22.7071L17.6263 33.7071L19.0405 32.2929L8.04048 21.2929L6.62627 22.7071ZM7.33337 23H34.8334V21H7.33337V23Z"
                        fill="#DDDDDD"
                    />
                    </svg>
                </FormButton>
    
                
            </main>

            {isModalOpen && <Modal message="Are you sure that you wanna exit of your account?" onClose={cancelModal}>
                <FormButton className={cl.modalBtns} onClick={cancelModal}>CANCEL</FormButton>
                <FormButton className={cl.modalBtns} onClick={logOut}>EXIT</FormButton>
            </Modal>}
        </body>
        
    );
};

export default Account;
