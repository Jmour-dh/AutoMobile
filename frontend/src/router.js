import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";

const Home = lazy(() => import("./Pages/Home/Home"));
const About = lazy(() => import("./Pages/About/About"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));
const Service = lazy(() => import("./Pages/Service/Service"));
const Occasion = lazy(() => import("./Pages/Occasion/Occasion"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/occasion",
        element: <Occasion />,
      },
    ],
  },
]);
