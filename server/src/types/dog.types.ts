type breedGroup =
  | "Toy"
  | "Hound"
  | "Unknown"
  | "Terrier"
  | "Working"
  | "Mixed"
  | "Non-Sporting"
  | "Sporting"
  | "Herding";

export interface Dog {
  id?: number;
  userId?: string;
  name: string;
  img: string;
  height: `${number} - ${number}` | `${number}`;
  weight: `${number} - ${number}` | `${number}`;
  lifeSpan: `${number} - ${number} years` | `${number} years`;
  breedGroup: breedGroup;
  temperaments: string[] | "Unknown";
}

export type NonIdDog = Omit<Dog, "id">;

export interface DogFilters {
  page: number;
  search: string;
  height: `${number} - ${number}` | "";
  weight: `${number} - ${number}` | "";
  temperaments: string[] | "";
  breedGroup: breedGroup | "";
  lifeSpan: `${number} - ${number} years` | `${number} years` | "";
}
