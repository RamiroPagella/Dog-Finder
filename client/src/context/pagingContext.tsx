import { ReactNode, createContext, useState } from "react";

export interface PagingContextType {
  currentPage: number;
  totalPages: number;
  favCurrentPage: number;
  favTotalPages: number;
  setCurrentPage: (currentPage: number) => void;
  setTotalPages: (totalPages: number) => void;
  setFavCurrentPage: (currentPage: number) => void;
  setFavTotalPages: (totalPages: number) => void;
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
      }}
    >
      {children}
    </PagingContext.Provider>
  );
};

export { PagingContext, PagingContextProvider };
