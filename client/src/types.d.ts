export interface User {
  email: string;
  username: string;
  id: string;
  admin: boolean;
  likes: Dog[];
  dogs: Dog[];
  pendingDogs: Dog[]
}


export interface Dog {
  id: number;
  name: string;
  img: string;
  height: string;
  weight: string;
  lifeSpan: string;
  breedGroup: string | "Unknown";
  temperaments: string[];
  user?: Pick<User, 'username'>;
  userId?: string;
}

export interface CreatedDog {
  id?: Dog['id'];
  name: Dog["name"];
  height: Dog["height"];
  weight: Dog["weight"];
  temperaments: Dog["temperaments"];
  breedGroup: Dog["breedGroup"];
  lifeSpan: Dog["lifeSpan"];
  img: File | string | null;
  userId?: string;
}

export interface Filters {
  search: string;
  weight: string;
  height: string;
  temperaments: string[];
  breedGroups: string[];
  lifeSpan: string;
  sort: "height asc" | "height desc" | "weight asc" | "weight desc" | "A-Z" | "Z-A";
  onlyCreated: boolean;
}
