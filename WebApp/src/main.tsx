import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles>
        <MainLayout>
          <App />
        </MainLayout>
      </GlobalStyles>
    </BrowserRouter>
  </React.StrictMode>
);
