import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from './router';
import { authContext } from '../context/authContext';



const AppRouter: React.FC = () => {

    const AuthCtx = useContext(authContext)

    if (!AuthCtx) {
        throw new Error('authContext must be used within an AuthProvider')
    }

    const { isAuth } = AuthCtx
    console.log(isAuth);
    
    
    return isAuth? (
        
        <Routes>
            {privateRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                />
            ))}
            <Route path='/*' element= {<Navigate to='/account' />} />
        </Routes>
        
    ) : (
        
        <Routes>
            {publicRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element/>}
                />
            ))}
            <Route path='/*' element= {<Navigate to='/signIn' />} />
        </Routes>
        
    )
}

export default AppRouter