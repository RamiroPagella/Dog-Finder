export interface Dog {
  id: number;
  name: string;
  img: string;
  height: string;
  weight: string;
  lifeSpan: string;
  breedGroup: string | "Unknown";
  temperaments: string[] | "Unknown";
}

export type NonIdDog = Omit<Dog, 'id'>;

export interface DogFilters {
  search: string | undefined;
  height: `${number} - ${number}` | `${number}` | '';
  weight: `${number} - ${number}` | `${number}` | '';
  temperaments: string[] | '';
  breedGroup: string | '';
  lifeSpan: `${number} - ${number} years` | `${number} years` | '';
}
