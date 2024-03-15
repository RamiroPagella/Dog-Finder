export interface User {
  email: string;
  username: string;
  id: string;
  admin: boolean;
  likes: Dog[];
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

export interface CreatedDog {
  name: Dog["name"];
  height: Dog["height"];
  weight: Dog["weight"];
  temperaments: Dog["temperaments"];
  breedGroup: Dog["breedGroup"];
  lifeSpan: Dog["lifeSpan"];
  img: File | null;
  userId?: string;
}

export interface Filters {
  search: string;
  weight: string;
  height: string;
  temperaments: string[];
  breedGroups: string[];
  lifeSpan: string;
}
