import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedRouteRegister from "./utils/ProtectedRouteRegister";

const Home = lazy(() => import("./Pages/Home/Home"));
const About = lazy(() => import("./Pages/About/About"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));
const Service = lazy(() => import("./Pages/Service/Service"));
const Occasion = lazy(() => import("./Pages/Occasion/Occasion"));

//users
const Admin = lazy(() => import("./Pages/UsersPages/Admin/Admin"));
const User = lazy(() => import("./Pages/UsersPages/User/User"));
const Personal = lazy(() => import("./Pages/UsersPages/Personal/Personal"));

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
        element: (
          <ProtectedRouteRegister>
            <Register />
          </ProtectedRouteRegister>
        ),
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/occasion",
        element: <Occasion />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute allowedRoles={[2]}>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: "/personal",
        element: (
          <ProtectedRoute allowedRoles={[3]}>
            <Personal />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
