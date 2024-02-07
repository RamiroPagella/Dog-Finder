import { ReactNode, createContext, useState } from "react";
import { UserContext as UserContextType} from "../types";


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

