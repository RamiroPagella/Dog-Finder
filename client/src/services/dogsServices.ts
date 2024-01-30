import { AxiosRequestConfig } from 'axios';
import Axios from '../axios';
import { Response } from '../types';


export const getDogs = async (pageNum: number = 1, options: AxiosRequestConfig = {}): Promise<Response['getDogs']> => {
  const response = await Axios.get<Response['getDogs']>(`/dogs?page=${pageNum}`, options)
  return response.data;
}
