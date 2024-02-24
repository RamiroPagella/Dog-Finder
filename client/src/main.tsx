import "./style/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PagingContextProvider } from "./context/pagingContext.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import { SearchAndFiltersProvider } from "./context/searchAndfiltersContext.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <UserContextProvider>
        <PagingContextProvider>
          <SearchAndFiltersProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SearchAndFiltersProvider>
        </PagingContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
);
