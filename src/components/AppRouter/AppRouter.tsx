import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authContext } from "../context/CreateContext";
import { privateRoutes, publicRoutes } from "./router";

const AppRouter: React.FC = () => {
    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    const { isAuth } = useAuthCtx();

    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
            <Route path="/*" element={<Navigate to="/myNotes" />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
            <Route path="/*" element={<Navigate to="/signIn" />} />
        </Routes>
    );
};
export default AppRouter;
