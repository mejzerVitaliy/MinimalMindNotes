import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthCtx } from "../../hooks/useContext";
import { privateRoutes, publicRoutes } from "./router";

const AppRouter: React.FC = () => {
  const { isAuth } = useAuthCtx();
  console.log(isAuth);

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
