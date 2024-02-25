import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";

const Home = lazy(() => import("./Pages/Home/Home"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ]
  }])