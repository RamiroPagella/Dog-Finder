import { ReactNode, createContext, useState } from "react";

export interface PagingContextType {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  favCurrentPage: number;
  setFavCurrentPage: (currentPage: number) => void;
  favTotalPages: number;
  setFavTotalPages: (totalPages: number) => void;
  pendingsCurrentPage: number;
  setPendingsCurrentPage: (currentPage: number) => void;
  pendingsTotalPages: number;
  setPendingsTotalPages: (totalPages: number) => void;
}

const PagingContext = createContext<PagingContextType | null>(null);

interface Props {
  children: ReactNode;
}

const PagingContextProvider = ({ children }: Props) => {
  const [currentPage, changeCurrentPage] = useState<number>(1);
  const [totalPages, changeTotalPages] = useState<number>(1);
  const [favCurrentPage, changeFavCurrentPage] = useState<number>(1);
  const [favTotalPages, changeFavTotalPages] = useState<number>(1);
  const [pendingsCurrentPage, changePendingCurrentPage] = useState<number>(1);
  const [pendingsTotalPages, changePendingsTotalPages] = useState<number>(1);

  const setCurrentPage = (currentPage: number) => {
    changeCurrentPage(currentPage);
  };
  const setTotalPages = (totalPages: number) => {
    changeTotalPages(totalPages);
  };
  const setFavCurrentPage = (currentPage: number) => {
    changeFavCurrentPage(currentPage);
  };
  const setFavTotalPages = (totalPages: number) => {
    changeFavTotalPages(totalPages);
  };
  const setPendingsCurrentPage = (currentPage: number) => {
    changePendingsTotalPages(currentPage);
  }
  const setPendingsTotalPages = (totalPages: number) => {
    changePendingsTotalPages(totalPages);
  }

  return (
    <PagingContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        favCurrentPage,
        setFavCurrentPage,
        favTotalPages,
        setFavTotalPages,
        pendingsCurrentPage,
        setPendingsCurrentPage,
        pendingsTotalPages,
        setPendingsTotalPages
      }}
    >
      {children}
    </PagingContext.Provider>
  );
};

export { PagingContext, PagingContextProvider };
