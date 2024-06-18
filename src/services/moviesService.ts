import axiosInstance from './axiosInstance';
import { IFetchMovieByIDResponse,IFetchMovieBySearchResponse , IQuery } from '../interfaces/interfaces';
import { AxiosError } from 'axios';



export const fetchMovies = async (query: IQuery) => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        apikey: '6d8384ab', // Replace with your actual API key from .env
        v: 1,
        ...query
      },

    });
    return response.data as unknown //as IFetchMovieBySearchResponse 
  } catch (error) {

    return error as unknown as AxiosError
  }
};

