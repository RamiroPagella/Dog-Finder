import { ReactNode, createContext, useEffect, useState } from "react";
import { CreatedDog } from "../types";
import { useUserContext } from "../hooks/contextHooks";

export interface AppContextType {
  allTemperaments: string[];
  allBreedGroups: string[];
  createdDog: CreatedDog;
  setAllTemperaments: React.Dispatch<React.SetStateAction<string[]>>;
  setAllBreedGroups: React.Dispatch<React.SetStateAction<string[]>>;
  setCreatedDog: React.Dispatch<React.SetStateAction<CreatedDog>>;
}

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {
  const { User } = useUserContext();

  const [allTemperaments, setAllTemperaments] = useState<string[]>([]);
  const [allBreedGroups, setAllBreedGroups] = useState<string[]>([]);
  const [createdDog, setCreatedDog] = useState<CreatedDog>({
    name: "",
    height: "",
    weight: "",
    temperaments: [],
    breedGroup: "",
    lifeSpan: "",
    img: null,
    userId: User?.id
  });

  return (
    <AppContext.Provider
      value={{
        allBreedGroups,
        allTemperaments,
        setAllTemperaments,
        setAllBreedGroups,
        createdDog,
        setCreatedDog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
