import React, { useState, ReactNode } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import { authContext } from "./components/context/authContext";


const App: React.FC = () => {
    
    const {isAuth, setIsAuth} = useState(false)
    
    return (

        <authContext.Provider value={{isAuth, setIsAuth}}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </authContext.Provider>

        
    );
};

export default App;
