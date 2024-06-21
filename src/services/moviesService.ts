import axiosInstance from './axiosInstance';
import { IQuery } from '../interfaces/interfaces';
import { AxiosError } from 'axios';
import Config from 'react-native-config';



export const fetchMovies = async (query: IQuery) => {
  try {
    const response = await axiosInstance.get('/', {
      params: {
        apikey: Config.API_KEY, // Replace with your actual API key from .env
        v: 1,
        ...query
      },

    });
    return response.data as unknown //as IFetchMovieBySearchResponse 
  } catch (error) {

    return error as unknown as AxiosError
  }
};

