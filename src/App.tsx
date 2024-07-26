import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import AuthProvider from "./components/AuthProvider";




const App: React.FC = () => {
    

    
    return (

        <AuthProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
