import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../components/Login";
import Register from "../components/Register";
import Todo from "../components/Todo";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";
import Breathe from "../components/Breathe";
import Quotes from "../components/Quotes"
import YoutubePlaylists from "../components/YoutubePlaylists";
import Music from "../components/Music";
import Search from "../components/Search";
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
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
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
          element: <Breathe />,
        },
        {
          path: "/music",
          element: <Music />,
        },
        {
          path: "/Search",
          element: <Search />,
        },
        {
          path: "/quotes",
          element: <Quotes />,
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