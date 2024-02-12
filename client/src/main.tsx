import "./style/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PagingContextProvider } from "./context/pagingContext.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import { SearchAndFiltersProvider } from "./context/searchAndfiltersContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <PagingContextProvider>
        <SearchAndFiltersProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchAndFiltersProvider>
      </PagingContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
