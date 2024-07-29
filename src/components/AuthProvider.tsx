import React, { useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { authContext } from "../hooks/useContext";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isUserID, setIsUserID] = useState<string | null>();

  useEffect(() => {
    const sortedUserID = Cookies.get("userID");
    if (sortedUserID) {
      setIsUserID(sortedUserID);
    }
  }, []);

  return (
    <authContext.Provider value={{ isAuth, setIsAuth, isUserID, setIsUserID }}>
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider };
