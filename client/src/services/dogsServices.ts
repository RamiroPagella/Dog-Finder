import { AxiosRequestConfig } from "axios";
import Axios from "../axios";
import { Dog as DogType, Filters } from "../types";

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
  const { search, height, weight, temperaments, breedGroup, lifeSpan } =
    filters;
  const url = `/dogs?page=${pageNum}&search=${search}&height=${height}&weight=${weight}&temperaments=${temperaments.join()}&breedGroup=${breedGroup}&lifeSpan=${lifeSpan}`;

  const response = await Axios.get<GetDogsResponse>(url, options);
  console.log(response.data)
  return response.data;
};
