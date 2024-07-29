import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppRouter from "./components/AppRouter/AppRouter";
import { useAuthCtx } from "./hooks/useContext";

const App: React.FC = () => {
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
