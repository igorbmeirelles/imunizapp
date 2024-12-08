import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./router/index.tsx";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrismicProvider client={client}>
      <Router />
    </PrismicProvider>
  </StrictMode>
);
