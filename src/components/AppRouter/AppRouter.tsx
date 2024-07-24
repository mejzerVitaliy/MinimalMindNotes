import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from './router';
import { authContext } from '../context/authContext';


const AppRouter: React.FC = () => {
    
    const { isAuth, setIsAuth } = useContext(authContext)
    

    
    return isAuth? (
        
        <Routes>
            {publicRoutes.map(route => (
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
            {privateRoutes.map(route => (
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