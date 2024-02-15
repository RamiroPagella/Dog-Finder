import { ReactNode, createContext, useState } from "react"; 



export interface PagingContextType {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => void;
  setTotalPages: (totalPages: number) => void;
}

const PagingContext = createContext<PagingContextType | null>(null);

interface Props {
  children: ReactNode;
}

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