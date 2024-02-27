import { createBrowserRouter, redirect } from "react-router-dom";
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

//Admin
//Avis
const Avis = lazy(() => import("./Pages/UsersPages/Admin/Pages/Avis/Avis"));
const ListOfAvis = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Avis/Pages/ListOfAvis/ListOfAvis")
);

//Contacts
const Contacts = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Contacts/Contacts")
);
const ListOfContacts = lazy(() =>
  import(
    "./Pages/UsersPages/Admin/Pages/Contacts/Pages/ListOfContacts/ListOfContacts"
  )
);

//Messages
const Messages = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Messages/Messages")
);
const ListOfMessages = lazy(() =>
  import(
    "./Pages/UsersPages/Admin/Pages/Messages/Pages/ListOfMessages/ListOfMessages"
  )
);

//Motos
const Motos = lazy(() => import("./Pages/UsersPages/Admin/Pages/Motos/Motos"));
const AddMoto = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Motos/Pages/AddMoto/AddMoto")
);
const UpdateMoto = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Motos/Pages/UpdateMoto/UpdateMoto")
);
const ListOfMotos = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Motos/Pages/ListOfMotos/ListOfMotos")
);

//Personals
const Personals = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Personals/Personals")
);
const AddPersonal = lazy(() =>
  import(
    "./Pages/UsersPages/Admin/Pages/Personals/Pages/AddPersonal/AddPersonal"
  )
);
const UpdatePersonal = lazy(() =>
  import(
    "./Pages/UsersPages/Admin/Pages/Personals/Pages/UpdatePersonal/UpdatePersonal"
  )
);
const ListOfPersonals = lazy(() =>
  import(
    "./Pages/UsersPages/Admin/Pages/Personals/Pages/ListOfPersonals/ListOfPersonals"
  )
);

//Users
const Users = lazy(() => import("./Pages/UsersPages/Admin/Pages/Users/Users"));
const AddUser = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Users/Pages/AddUser/AddUser")
);
const UpdateUser = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Users/Pages/UpdateUser/UpdateUser")
);
const ListOfUsers = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Users/Pages/ListOfUsers/ListOfUsers")
);

//Services
const Services = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Services/Services")
);
const AddService = lazy(() =>
  import("./Pages/UsersPages/Admin/Pages/Services/Pages/AddService/AddService")
);
const UpdateService = lazy(() =>
  import(
    "./Pages/UsersPages/Admin/Pages/Services/Pages/UpdateService/UpdateService"
  )
);
const ListOfServices = lazy(() =>
  import(
    "./Pages/UsersPages/Admin/Pages/Services/Pages/ListOfServices/ListOfServices"
  )
);

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
        children: [
          {
            
            path: "avis",
            element: <Avis />,
            children: [
              {
                path: "list",
                element: <ListOfAvis />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/avis/list"),
              },
            ],
          },
          {
            path: "contacts",
            element: <Contacts />,
            children: [
              {
                path: "list",
                element: <ListOfContacts />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/contacts/list"),
              },
            ],
          },
          {
            path: "messages",
            element: <Messages />,
            children: [
              {
                path: "list",
                element: <ListOfMessages />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/messages/list"),
              },
            ],
          },
          {
            path: "motos",
            element: <Motos />,
            children: [
              {
                path: "list",
                element: <ListOfMotos />,
              },
              {
                path: "new",
                element: <AddMoto />,
              },
              {
                path: "updateMoto/:motoId",
                element: <UpdateMoto />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/motos/list"),
              },
            ],
          },
          {
            path: "personals",
            element: <Personals />,
            children: [
              {
                path: "list",
                element: <ListOfPersonals />,
              },
              {
                path: "new",
                element: <AddPersonal />,
              },
              {
                path: "updatePersonal/:userId",
                element: <UpdatePersonal />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/personals/list"),
              },
            ],
          },
          {
            path: "users",
            element: <Users />,
            children: [
              {
                path: "list",
                element: <ListOfUsers />,
              },
              {
                path: "new",
                element: <AddUser />,
              },
              {
                path: "updateUser/:userId",
                element: <UpdateUser />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/users/list"),
              },
            ],
          },
          {
            path: "services",
            element: <Services />,
            children: [
              {
                path: "list",
                element: <ListOfServices />,
              },
              {
                path: "new",
                element: <AddService />,
              },
              {
                path: "updateService/:serviceId",
                element: <UpdateService />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/services/list"),
              },
            ],
          },
        ],
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
