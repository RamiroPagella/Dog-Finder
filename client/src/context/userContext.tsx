import { ReactNode, createContext, useEffect, useState } from "react";
import { User as UserType } from "../types";

export interface UserContextType {
  User: UserType;
  setUser: (User: UserType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const [User, changeUser] = useState<UserType>({
    username: "",
    email: "",
    id: "",
    admin: false,
    likes: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setUser = (User: UserType) => {
    changeUser(User);
  };

  return (
    <UserContext.Provider
      value={{ User, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
