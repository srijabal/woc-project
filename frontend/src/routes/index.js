import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginForm from "../components/loginForm";
import RegistrationForm from "../components/register";
import Todo from "../components/todo";
import LandingPage from "../components/landing";
import Navigation from "../components/navbar";
import BreatheAnimation from "../components/breathe";
import Quote from "../components/quotes"
import PlaylistComponent from "../components/youtubeplaylist";
import SpotifyMusic from "../components/music";
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
      path: "/playlists",
      element: <PlaylistComponent />,
    },
    {
      path: "/landing",
      element: <LandingPage />,
    },
    {
      path:"/navbar",
      element: <Navigation />
    } ,
    {
      path: "/music",
      element: <SpotifyMusic />,
    },
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
          path: "/quotes",
          element: <Quote />,
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