import { AxiosRequestConfig } from "axios";
import Axios from "../axios";
import { Dog, Dog as DogType, Filters, User } from "../types";

interface GetDogsResponse {
  dogs: DogType[];
  message: string;
  totalPages: number;
}

export const getDogs = async (
  pageNum: number = 1,
  filters: Filters,
  options: AxiosRequestConfig = {},
): Promise<GetDogsResponse> => {
  const { search, height, weight, temperaments, breedGroups, lifeSpan } =
    filters;
  const url = `/dogs?page=${pageNum}&search=${search}&height=${height}&weight=${weight}&temperaments=${temperaments.join()}&breedGroup=${breedGroups.join()}&lifeSpan=${lifeSpan}`;

  const response = await Axios.get<GetDogsResponse>(url, options);
  return response.data;
};

interface favDogResponse {
  User: User,
  isFav: boolean
}
export const favDog = async (dogId: Dog['id']) => {
  return Axios.post<favDogResponse>("/like", { dogId }).then(res => res)
};


