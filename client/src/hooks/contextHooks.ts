import { useContext } from "react";
import { PagingContext, PagingContextType } from "../context/pagingContext";
import { UserContext, UserContextType } from "../context/userContext";
import {
  SearchAndfiltersContext,
  SearchAndfiltersContextType,
} from "../context/searchAndfiltersContext";
import { AppContext, AppContextType } from "../context/AppContext";

export const usePagingContext = () => {
  const context = useContext(PagingContext) as PagingContextType;

  return {
    ...context,
  };
};

export const useUserContext = () => {
  const context = useContext(UserContext) as UserContextType;

  return {
    ...context,
  };
};

export const useSearcAndfiltersContext = () => {
  const context = useContext(
    SearchAndfiltersContext,
  ) as SearchAndfiltersContextType;

  return {
    ...context,
  };
};

export const useAppContext = () => {
  const context = useContext(AppContext) as AppContextType;

  return {
    ...context,
  };
};
