export interface User {
  email: string,
  username: string,
  id: string;
}

export interface DogType {
  id: string;
  name: string;
  img: string;
  height: string;
  weight: string;
  lifeSpan: string;
  breedGroup: string | "Unknown";
  temperaments: string[] | "Unknown"
}
