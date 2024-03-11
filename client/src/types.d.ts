export interface User {
  email: string;
  username: string;
  id: string;
  likes: Dog[];
  admin: boolean;
}

export interface Dog {
  id: string;
  name: string;
  img: string;
  height: string;
  weight: string;
  lifeSpan: string;
  breedGroup: string | "Unknown";
  temperaments: string[];
}


export interface Filters {
  search: string;
  weight: string;
  height: string;
  temperaments: string[];
  breedGroups: string[];
  lifeSpan: string;
}







