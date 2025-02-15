import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./router/index.tsx";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";
import { UserProvider } from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrismicProvider client={client}>
      <UserProvider>
        <Router />
      </UserProvider>
    </PrismicProvider>
  </StrictMode>
);
