
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

    const fetchRandomMoviesWhenScreenLoad = useCallback(async (page: number) => {
        try {
            const startIndex = (page - 1) * PAGE_SIZE;
            const endIndex = page * PAGE_SIZE;
            const movieIdsToFetch = predefinedMovies.slice(startIndex, endIndex);

            const allMoviesPromise = movieIdsToFetch.map((id) =>
                fetchMovies({ i: id, t: '' })
            );

            const allMovies = await Promise.all(allMoviesPromise) as MovieDetails[];
            const newMovies: IMovie[] = allMovies.map(
                ({ Title, Poster, Type, Year, imdbID }) => ({
                    Poster,
                    Title,
                    Type,
                    Year,
                    imdbID,
                })
            );

            setResults((currMovies) => [...currMovies, ...newMovies]);
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

