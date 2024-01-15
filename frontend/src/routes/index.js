import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginForm from "../components/loginForm";
import RegistrationForm from "../components/register";
import Todo from "../components/todo";
import LandingPage from "../components/landing";
import Navbar from "../components/Navbar";
import BreatheAnimation from "../components/breathe";
import Quote from "../components/quotes"
import YoutubePlaylists from "../components/YoutubePlaylists";
import SpotifyMusic from "../components/music";
import Search from "../components/search";
import ChatComponent from "../components/solver";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Routes = () => {
  const { token } = useAuth();  

  const routesForPublic = [    
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/register",
      element: <RegistrationForm />,
    },
    {
      path:"/Navbar",
      element: <Navbar />
    } 
  ];

 
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, 
      children: [
        {
          path: "/todo",
          element: <Todo />,
        },
        {
          path: "/breathe",
          element: <BreatheAnimation />,
        },
        {
          path: "/music",
          element: <SpotifyMusic />,
        },
        {
          path: "/Search",
          element: <Search />,
        },
        {
          path: "/quotes",
          element: <Quote />,
        },
        {
          path: "/playlists",
          element: <YoutubePlaylists />,
        },
        {
          path: "/solver",
          element: <ChatComponent/>,
        },
      ],
    },
  ];

 
  const routesForNotAuthenticatedOnly = [
    
  ];

 
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  
  return <RouterProvider router={router} />;
};

export default Routes;