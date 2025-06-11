import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Informacoes } from "../pages/Informacoes";
import { Articles } from "../pages/Articles";
import { Calendario } from "../pages/Calendario";
import { Location } from "@/pages/Location";
import { About } from "@/pages/About";
import { VaccinesCard } from "../pages/VaccinesCard";
import { ChatBot } from "../pages/ChatBot";
import { CoberturaNacional } from "@/pages/CoberturaNacional";

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
          path: "postos-de-vacinacao",
          element: <Location />,
        },
        {
          path: "/calendario",
          element: <Calendario />,
        },
        {
          path: "/sobre",
          element: <About />,
        },
        {
          path: "/cartao-de-vacinas",
          element: <VaccinesCard />,
        },
        {
          path: "/chatbot",
          element: <ChatBot />,
        },
        {
          path: "/cobertura",
          element: <CoberturaNacional />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
