import React, { ReactNode, createContext, useState } from "react";
import { Filters } from "../types";

export interface SearchAndfiltersContextType {
  setSearchAndFilters: React.Dispatch<React.SetStateAction<Filters>>;
  searchAndFilters: Filters;
  favSearch: string;
  setFavSearch: React.Dispatch<React.SetStateAction<string>>;
  pendingDogsSearch: string;
  setPendingDogsSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchAndfiltersContext =
  createContext<SearchAndfiltersContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export const SearchAndFiltersProvider = ({ children }: ProviderProps) => {
  const [searchAndFilters, setSearchAndFilters] = useState<Filters>({
    search: "",
    weight: "0 - 1000",
    height: "0 - 1000",
    temperaments: [],
    breedGroups: [],
    lifeSpan: "0 - 1000",
    sort: "A-Z",
    onlyCreated: false
  });
  const [favSearch, setFavSearch] = useState<string>("");
  const [pendingDogsSearch, setPendingDogsSearch] = useState<string>("");

  return (
    <SearchAndfiltersContext.Provider
      value={{
        searchAndFilters,
        setSearchAndFilters,
        favSearch,
        setFavSearch,
        pendingDogsSearch,
        setPendingDogsSearch,
      }}
    >
      {children}
    </SearchAndfiltersContext.Provider>
  );
};
