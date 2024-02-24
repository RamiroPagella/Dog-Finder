import { ReactNode, createContext, useState } from "react";

export interface AppContextType {
  allTemperaments: string[];
  allBreedGroups: string[];
  setAllTemperaments: (newAllTemperaments: string[]) => void;
  setAllBreedGroups: (newallBreedGroups: string[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {
  const [allTemperaments, changeAllTemperaments] = useState<string[]>([]);
  const [allBreedGroups, changeAllBreedGroups] = useState<string[]>([]);

  const setAllTemperaments = (newAllTemperaments: string[]) => {
    changeAllTemperaments(newAllTemperaments);
  };
  const setAllBreedGroups = (newAllBreedGroups: string[]) => {
    changeAllBreedGroups(newAllBreedGroups);
  };

  return (
    <AppContext.Provider
      value={{
        allBreedGroups,
        allTemperaments,
        setAllTemperaments,
        setAllBreedGroups,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
