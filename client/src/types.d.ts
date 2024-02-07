export interface User {
  email: string,
  username: string,
  id: string;
}

export interface Dog {
  id: string;
  name: string;
  img: string;
  height: string;
  weight: string;
  lifeSpan: string;
  breedGroup: string | "Unknown";
  temperaments: string[] | "Unknown"
}

export interface PagingContext {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export interface UserContext {
  User: User;
  setUser: (User) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}



