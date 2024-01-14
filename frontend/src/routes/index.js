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
const Routes = () => {
  const { token } = useAuth();
  
  const routesForPublic = [    
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/register",
      element: <RegistrationForm />,
    },
    {
      path: "/landing",
      element: <LandingPage />,
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