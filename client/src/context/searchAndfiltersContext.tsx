import React, { ReactNode, createContext, useState } from "react";

export interface SearchAndfiltersContextType {
  search: string;
  weight: string;
  height: string;
  temperaments: string[];
  breedGroup: string;
  lifeSpan: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  setTemperaments: React.Dispatch<React.SetStateAction<string[]>>;
  setBreedGroup: React.Dispatch<React.SetStateAction<string>>;
  setLifeSpan: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchAndfiltersContext =
  createContext<SearchAndfiltersContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export const SearchAndFiltersProvider = ({ children }: ProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [temperaments, setTemperaments] = useState<string[]>([]);
  const [breedGroup, setBreedGroup] = useState<string>("");
  const [lifeSpan, setLifeSpan] = useState<string>("");

  return (
    <SearchAndfiltersContext.Provider
      value={{
        search,
        weight,
        height,
        temperaments,
        breedGroup,
        lifeSpan,
        setSearch,
        setWeight,
        setHeight,
        setTemperaments,
        setBreedGroup,
        setLifeSpan,
      }}
    >
      {children}
    </SearchAndfiltersContext.Provider>
  );
};
