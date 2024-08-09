import React, { useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authContext } from './context/CreateContext';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isUserID, setIsUserID] = useState<string | null>();

    const fetchUserID = () => {
        const sortedUserID = Cookies.get('userID');
        if (sortedUserID) {
            setIsUserID(sortedUserID);
        }
    };

    useEffect(() => {
        fetchUserID();
    }, []);

    return (
        <authContext.Provider value={{ isAuth, setIsAuth, isUserID, setIsUserID }}>
            {children}
        </authContext.Provider>
    );
};




export { AuthProvider }