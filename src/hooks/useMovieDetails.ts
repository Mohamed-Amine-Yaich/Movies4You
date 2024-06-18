
import { useEffect, useCallback, useState } from 'react';
import { fetchMovies } from '../services/moviesService';
import { predefinedMovies } from '../data/predefinedMovieIDs';
import { IAPIErrorResponse, IFetchMovieBySearchResponse, IMovie, MovieDetails } from '../interfaces/interfaces';
import { debounce } from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';
import { INavigation } from '../navigation/Inavigation';
import { PAGE_SIZE } from '../constants';
import { MovieSceenRouteProps } from '../navigation/RouteProps';



const useMovieDetails = () => {

    const navigation = useNavigation<INavigation>();
    const { params } = useRoute<MovieSceenRouteProps>();
    const [movie, setMovie] = useState<MovieDetails>();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchMovieById = useCallback(async (movieId: string) => {
        setLoading(true);
        try {
            const fetchMovieByIdRes = await fetchMovies({ i: movieId }) as unknown as IAPIErrorResponse | MovieDetails;
            if ('Response' in fetchMovieByIdRes) {
                if (fetchMovieByIdRes.Response === 'True') {
                    setMovie(fetchMovieByIdRes as MovieDetails);
                } else {
                    setApiError((fetchMovieByIdRes as IAPIErrorResponse).Error);
                }
            } else {
                setError("Failed to fetch movies. Please try again later.");
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovieById(params?.movieId);
    }, [params?.movieId, fetchMovieById]);

    const handleNavigation = () => {
        navigation.goBack();
    };

    const hideErrorToast = () => {
        if (error) setError('');
        if (apiError) setApiError('');
        handleNavigation();
    };
    return {
        loading,
        movie,
        error,
        apiError,
        hideErrorToast,
        handleNavigation,

    };
};

export default useMovieDetails;

