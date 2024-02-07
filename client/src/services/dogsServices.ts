import { AxiosRequestConfig } from 'axios';
import Axios from '../axios';
import { Dog as DogType } from '../types';

interface GetDogsResponse {
  dogs: DogType[];
  message: string;
  totalPages: number;
}

export const getDogs = async (pageNum: number = 1, options: AxiosRequestConfig = {}): Promise<GetDogsResponse> => {
  const response = await Axios.get<GetDogsResponse>(`/dogs?page=${pageNum}`, options)
  return response.data;
}

