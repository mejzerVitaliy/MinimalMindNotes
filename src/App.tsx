import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppRouter from "./components/AppRouter/AppRouter";
import { authContext } from "./components/context/CreateContext";

const App: React.FC = () => {
    AOS.init()

    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    
    
    const { setIsAuth } = useAuthCtx();

    useEffect(() => {
        if (localStorage.getItem(`isAuth`)) {
        setIsAuth(true);
        } else setIsAuth(false);
    }, []);

    return (
        <BrowserRouter>
        <AppRouter />
        </BrowserRouter>
    );
};

export default App;
