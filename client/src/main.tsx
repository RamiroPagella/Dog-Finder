import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { PagingContextProvider } from "./context/pagingContext.tsx";
import { UserContextProvider } from "./context/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <PagingContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PagingContextProvider>
      </UserContextProvider>
    </Provider>
  </React.StrictMode>,
);
