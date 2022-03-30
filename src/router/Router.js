import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerticalLayout from "../layouts/VerticalLayout";
import PagesRoutes from "./routes/Pages";

const Router = () => {
  const GetVerticalRoutes = () => {
    return PagesRoutes.map((route, index) => {
      return <Route path={route.path} element={route.element} key={index} />;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<VerticalLayout/>}>{GetVerticalRoutes()}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
