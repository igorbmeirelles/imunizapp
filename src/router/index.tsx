import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Informacoes } from "../pages/Informacoes";
import { Articles } from "../pages/Articles";
import { Calendario } from "../pages/Calendario";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/informacoes",
          element: <Informacoes />,
        },
        {
          path: "/post/:slug",
          element: <Articles />,
        },
        {
          path: "/calendario",
          element: <Calendario />,
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
