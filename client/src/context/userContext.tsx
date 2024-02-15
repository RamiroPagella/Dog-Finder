import { ReactNode, createContext, useState } from "react";
import { User } from "../types";

export interface UserContextType {
  User: User;
  setUser: (User: User) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const [User, setUser] = useState({
    username: '',
    email: '',
    id: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{User, setUser, isAuthenticated, setIsAuthenticated}}>
      {children}
    </UserContext.Provider>
  )
}

