import React, { useContext, useEffect } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import { authContext } from "./components/context/authContext";




const App: React.FC = () => {
    
    const AuthCtx = useContext(authContext) 
    if (!AuthCtx) {
        throw new Error('authContext must be used within an AuthProvider')
    }
    const { setIsAuth } = AuthCtx

    useEffect(() => {
        if (localStorage.getItem(`isAuth`)){
            setIsAuth(true)
        } else setIsAuth(false)
        
    }, [])

    return (

        
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
        
    );
};

export default App;
