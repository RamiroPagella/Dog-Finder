import { ReactNode, createContext, useState } from "react"; 
import { PagingContext as PagingContextType } from "../types";

interface Props {
  children: ReactNode;
}

const PagingContext = createContext<PagingContextType | null>(null);

const PagingContextProvider = ({ children }: Props) => {
  const [currentPage, changeCurrentPage] = useState<number>(1);
  const [totalPages, changeTotalPages] = useState<number>(1);

  const setCurrentPage = (currentPage: number) => {
    changeCurrentPage(currentPage);
  }
  const setTotalPages = (totalPages: number) => {
    changeTotalPages(totalPages)
  }

  return (
    <PagingContext.Provider value={{currentPage, setCurrentPage, totalPages, setTotalPages}}>
      {children}
    </PagingContext.Provider>
  )
}

export { PagingContext, PagingContextProvider}