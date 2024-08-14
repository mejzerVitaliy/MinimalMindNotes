import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { getUserByID } from "../../../API/notesServise";
import { authContext } from "../../context/CreateContext";
import FormButton from "../../UI/Button/FormButton";
import Modal from "../../UI/ModalWindow/Modal";
import Navbar from "../../UI/Navbar/Navbar";
import useBackTo from "../../../hooks/useBackTo";

const Account: React.FC = () => {
    const BackToMenu = useBackTo('/myNotes')
    const [userData, setUserData] = useState<any>({})
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const currenTheme = localStorage.getItem('theme')
    const [theme, setTheme] = useState<boolean>(true) 

    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    const { setIsAuth, setIsUserID, isUserID } = useAuthCtx();
    
    const getUserData = async (isUserID: string | null | undefined) => {
        const userDataByID = await getUserByID(isUserID)
        setUserData(userDataByID)
    }
    const logOut = () => {
        setIsAuth(false);
        setIsUserID(null);
        localStorage.removeItem("isAuth");
        Cookies.remove("userID");
    };

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

    const switchTheme = () => {
        const newTheme = !theme
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme ? 'white' : 'dark')
        document.body.classList.toggle('white', newTheme)
    }
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')    
        const isWhiteTheme = savedTheme === 'white'
        setTheme(isWhiteTheme)
        document.body.classList.toggle('white', isWhiteTheme)
    }, [])

    return (
        <section className="h-full w-full flex justify-center items-center">
            <main className="h-full w-full flex justify-center items-center">
                <Navbar title="Account" />
                <section className={ currenTheme === 'white' ? "p-5 sm:p-10 transform  flex flex-col md:flex-row xl:h-[280px] items-center border-4 border-double border-gray-600 backdrop-blur-2xl rounded-[30px] w-[70%] mt-28 text-black" : "p-5 sm:p-10 transform  flex flex-col md:flex-row xl:h-[280px]  items-center border-4 border-double border-gray-600 backdrop-blur-2xl rounded-[30px] w-[70%] mt-28" }>
                    <article className="w-36 h-36 xl:w-52 xl:h-52">
                        <svg viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.5375 69.375C54.6731 69.375 69.375 54.8802 69.375 37C69.375 19.1198 54.6731 4.625 36.5375 4.625C18.4018 4.625 3.69995 19.1198 3.69995 37C3.69995 54.8802 18.4018 69.375 36.5375 69.375Z" fill="#515151" />
                            <path d="M36.5375 39.775C43.945 39.775 49.95 33.9771 49.95 26.825C49.95 19.6729 43.945 13.875 36.5375 13.875C29.13 13.875 23.125 19.6729 23.125 26.825C23.125 33.9771 29.13 39.775 36.5375 39.775Z" fill={ currenTheme === 'dark' ? "#191919" : '#fff'} />
                            <path d="M36.5481 42.55C33.9283 42.5566 31.3355 43.0824 28.9177 44.0974C26.4999 45.1124 24.3044 46.5967 22.4567 48.4655C20.6089 50.3343 19.1451 52.5511 18.1488 54.9893C17.1525 57.4274 16.6432 60.0392 16.65 62.6754C22.3802 67.0205 29.3595 69.372 36.5344 69.375C43.7094 69.378 50.6906 67.0324 56.4245 62.6922C56.4416 60.0541 55.9403 57.4387 54.9492 54.9963C53.9581 52.5539 52.4969 50.3329 50.6497 48.4609C48.8024 46.5889 46.6055 45.103 44.1854 44.0885C41.7653 43.0741 39.1698 42.5513 36.5481 42.55Z" fill={ currenTheme === 'dark' ? "#191919" : '#fff'} />
                        </svg>
                    </article>

                    <article className="text-center md:ml-4 lg:ml-10">
                        <h3 className="text-[20px] xl:text-[33px]" >Login: <u>{ userData.login }</u></h3>
                        <h3 className="text-[20px] xl:text-[33px]" >Password: <u>{userData.password}</u></h3>
                        <h3 className="text-[20px] xl:text-[33px]" >Notes created: { userData.notes?.length || 0 }</h3>
                    </article>
                </section>

                <FormButton className="fixed bottom-5 xl:bottom-16 xl:right-10  w-[90%] lg:w-4/5 xl:w-32 h-[40px] rounded-[30px] border-2 border-gray-500 bg-[#6f0000] transition-transform duration-400 cursor-pointer lg:hover:scale-125 hover:bg-[#8e0000]" onClick={modalSwitcher}>
                    <h3 className={ currenTheme === "white" ? "m-0  text-white" : 'm-0'}>Log out</h3>
                </FormButton>
        
                <FormButton className="fixed z-[1000] top-14 md:top-16 lg:top-20 left-3 xl:top-24 xl:left-7 p-0 m-0 bg-transparent border-none cursor-pointer transition-transform duration-200 hover:scale-125" onClick={BackToMenu}>
                    <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.33337 22L6.62627 21.2929L5.91916 22L6.62627 22.7071L7.33337 22ZM34.8334 23C35.3857 23 35.8334 22.5523 35.8334 22C35.8334 21.4477 35.3857 21 34.8334 21V23ZM17.6263 10.2929L6.62627 21.2929L8.04048 22.7071L19.0405 11.7071L17.6263 10.2929ZM6.62627 22.7071L17.6263 33.7071L19.0405 32.2929L8.04048 21.2929L6.62627 22.7071ZM7.33337 23H34.8334V21H7.33337V23Z"
                            fill={ currenTheme === 'white' ? "#000" : '#DDDDDD'}
                    />
                    </svg>
                </FormButton>

                

                <FormButton
                    className={ !theme? "fixed top-16 right-5 lg:top-24 w-5 h-5 p-0 bg-transparent border-none transition-transform duration-300 cursor-pointer hover:scale-125" : 'fixed top-16 right-3 lg:top-24 w-9 h-9 p-0 bg-transparent border-none transition-transform duration-300 cursor-pointer hover:scale-125'}
                    onClick={switchTheme}
                >
                    {!theme
                        ? <svg viewBox="0 0 34 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M30.5164 0.930043C32.4262 1.28859 33.3811 1.46787 33.5142 2.12895C33.6473 2.79003 32.7259 3.39742 30.8831 4.61219C24.1008 9.08324 19.625 16.7689 19.625 25.5C19.625 34.2311 24.1008 41.9168 30.8831 46.3878C32.7259 47.6026 33.6473 48.21 33.5142 48.8711C33.3811 49.5321 32.4262 49.7114 30.5164 50.07C29.0124 50.3523 27.461 50.5 25.875 50.5C12.0679 50.5 0.875 39.3071 0.875 25.5C0.875 11.6929 12.0679 0.5 25.875 0.5C27.461 0.5 29.0124 0.647681 30.5164 0.930043Z" fill="#888" />
                        </svg>
                        : <svg viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="37.5" cy="37.5" r="12.5" fill="#222222" />
                            <path d="M37.5 15.625V9.375" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                            <path d="M37.5 65.625V59.375" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                            <path d="M52.968 22.0311L57.3875 17.6117" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                            <path d="M17.6128 57.3888L22.0322 52.9694" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                            <path d="M59.375 37.5L65.625 37.5" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                            <path d="M9.375 37.5L15.625 37.5" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                            <path d="M52.968 52.9689L57.3875 57.3883" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                            <path d="M17.6128 17.6112L22.0322 22.0306" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    }

                </FormButton>
            </main>

            {isModalOpen && <Modal message="Are you sure that you wanna exit of your account?" onClose={cancelModal}>
                <FormButton className="bg-gray-600 rounded-[20px] border-none transition-transform duration-300 w-[100px] h-[40px] border-2 border-gray-800 cursor-pointer hover:scale-125" onClick={cancelModal}>CANCEL</FormButton>
                <FormButton className="bg-gray-600 rounded-[20px] border-none transition-transform duration-300 w-[100px] h-[40px] border-2 border-gray-800 cursor-pointer hover:scale-125" onClick={logOut}>EXIT</FormButton>
            </Modal>}
        </section>
    );
};
export default Account;
