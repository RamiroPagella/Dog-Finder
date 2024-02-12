import { useContext } from "react";
import { PagingContext } from "../context/pagingContext";
import { PagingContext as PagingContextType } from "../types";
import { UserContext } from "../context/userContext";
import { UserContext as UserContextType } from "../types";
import { SearchAndfiltersContext, SearchAndfiltersContextType } from "../context/searchAndfiltersContext";

export const usePagingContext = () => {
  const context = useContext(PagingContext) as PagingContextType;

  return {
    ...context,
  };
};

export const useUserContext = () => {
  const context = useContext(
    UserContext,
  ) as UserContextType;

  return {
    ...context
  }
};

export const useSearcAndfiltersContext = () => {
  const context = useContext(SearchAndfiltersContext) as SearchAndfiltersContextType;

  return {
    ...context
  }
}
