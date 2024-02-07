export interface Dog {
  id: number;
  name: string;
  img: string;
  height: string;
  weight: string;
  lifeSpan: string;
  breedGroup: string | "Unknown";
  temperaments: string[] | "Unknown"
}

export type NonIdDog = Omit<Dog, 'id'>
