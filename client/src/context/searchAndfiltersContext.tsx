import React, { ReactNode, createContext, useState } from "react";
import { Filters } from "../types";

// export interface SearchAndfiltersContextType extends Filters {
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
//   setWeight: React.Dispatch<React.SetStateAction<string>>;
//   setHeight: React.Dispatch<React.SetStateAction<string>>;
//   setTemperaments: React.Dispatch<React.SetStateAction<string[]>>;
//   setBreedGroups: React.Dispatch<React.SetStateAction<string[]>>;
//   setLifeSpan: React.Dispatch<React.SetStateAction<string>>;
// }
export interface SearchAndfiltersContextType {
  setSearchAndFilters: React.Dispatch<React.SetStateAction<Filters>>;
  searchAndFilters: Filters;
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
  });

  return (
    <SearchAndfiltersContext.Provider
      value={{ searchAndFilters, setSearchAndFilters }}
    >
      {children}
    </SearchAndfiltersContext.Provider>
  );
};
