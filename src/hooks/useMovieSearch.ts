
import { useEffect, useCallback, useState } from 'react';
import { fetchMovies } from '../services/moviesService';
import { predefinedMovies } from '../data/predefinedMovieIDs';
import { IAPIErrorResponse, IFetchMovieBySearchResponse, IMovie, MovieDetails } from '../interfaces/interfaces';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '../navigation/Inavigation';
import { PAGE_SIZE } from '../constants';



const useMovieSearch = () => {
    const navigation = useNavigation<INavigation>();

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<IMovie[]>([]);
    const [error, setError] = useState<string>('');
    const [apiError, setApiError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchPage, setSearchPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    const handleSearch = async (search: string, page?: number) => {
        try {
            if (search && search.length > 2) {
                if (!page) {
                    setLoading(true);
                    setResults([]);
                    setSearchText(search);
                }

                const res = await fetchMovies({ s: search, page: page ?? 1 }) as IFetchMovieBySearchResponse | IAPIErrorResponse;
                if ('Response' in res) {
                    if (res.Response === 'True') {
                        const moviesBySearchRes = res as IFetchMovieBySearchResponse;
                        setResults(currMovies => [...currMovies, ...moviesBySearchRes.Search]);
                    } else if (res.Response === 'False') {
                        const errorResponse = res as IAPIErrorResponse;
                        setApiError(errorResponse.Error);
                    }
                } else {
                    console.error('Error while fetching movies:', res);
                    setResults([]);
                }

                setLoading(false);
            }
            if (search.length == 0) {
                setSearchText(' ')
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setResults([]);
        }
    };


    // Note:
    // Initially, I couldn't find an endpoint that provides a random or popular set of movies as expected.
    // To work around this, I created a list of movie IDs and fetched each movie individually to populate the home screen.
    // 
    // Update:
    // I changed this approach because it made the process more complicated. Handling each movie individually required additional logic to manage errors and ensure the display of correct movies while removing any that caused errors.
    // 
    // Instead, I now use the search API, which provides a clear response and a list of movies. This allows me to display a random set of movies initially. The displayed movies are then updated based on user searches.


    const fetchRandomMoviesWhenScreenLoad = useCallback(async (page: number) => {
        try {

            const res = await fetchMovies({ s: 'movie', page: page ?? 1 }) as IFetchMovieBySearchResponse | IAPIErrorResponse;
            if ('Response' in res) {
                if (res.Response === 'True') {
                    const moviesBySearchRes = res as IFetchMovieBySearchResponse;
                    setResults(currMovies => [...currMovies, ...moviesBySearchRes.Search]);
                } else if (res.Response === 'False') {
                    const errorResponse = res as IAPIErrorResponse;
                    setApiError(errorResponse.Error);
                }
            } else {
                console.error('Error while fetching movies:', res);
                setResults([]);
            }

        } catch (error) {
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRandomMoviesWhenScreenLoad(currentPage);
    }, [fetchRandomMoviesWhenScreenLoad, currentPage]);

    const loadMoreMovies = () => {
        if (searchText.length > 2) {
            setSearchPage(currValue => currValue + 1);
        } else {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    useEffect(() => {
        handleTextDebounce(searchText, searchPage);
    }, [searchPage]);

    const hideErrorToast = () => {
        if (error) setError('');
        if (apiError) setApiError('');
    };
    return {
        navigation,
        loading,
        results,
        error,
        apiError,
        currentPage,
        searchText,
        handleTextDebounce,
        loadMoreMovies,
        hideErrorToast
    };
};

export default useMovieSearch;

