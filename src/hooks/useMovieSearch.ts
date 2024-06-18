// hooks/useMovieSearch.js
import { useEffect, useCallback, useReducer } from 'react';
import { fetchMovies } from '../services/moviesService';
import { predefinedMovies } from '../data/predefinedMovieIDs';
import { IAPIErrorResponse, IFetchMovieBySearchResponse, IMovie, MovieDetails } from '../interfaces/interfaces';

const PAGE_SIZE = 10;

// Define action types for the reducer
const ActionType = {
    FETCH_MOVIES_START: 'FETCH_MOVIES_START',
    FETCH_MOVIES_SUCCESS: 'FETCH_MOVIES_SUCCESS',
    FETCH_MOVIES_ERROR: 'FETCH_MOVIES_ERROR',
    SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    LOAD_MORE_MOVIES: 'LOAD_MORE_MOVIES',
    CLEAR_RESULTS: 'CLEAR_ERRORS_RESULTS'
};

// Initial state for the reducer
const initialState = {
    loading: true,
    results: [],
    error: '',
    apiError: '',
    currentPage: 1,
    searchPage: 1,
    searchText: '',
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.FETCH_MOVIES_START:
            return {
                ...state,
                loading: false,
                searchText: action.payload.searchText,
                currentPage: action.payload.page,
            };
        case ActionType.FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                results: [...state.results, ...action.payload.movies],
            };
        case ActionType.CLEAR_RESULTS:
            return {
                ...state,
                loading: false,
                results: [],
            };
        case ActionType.FETCH_MOVIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.errorMessage,
                results: [],
            };
        case ActionType.SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload,
            };
        case ActionType.CLEAR_ERRORS:
            return {
                ...state,
                error: '',
                apiError: '',
            };
        case ActionType.LOAD_MORE_MOVIES:
            if (state.searchText.length > 2) {
                return {
                    ...state,
                    searchPage: state.searchPage + 1,
                };
            } else {
                return {
                    ...state,
                    currentPage: state.currentPage + 1,
                };
            }
        default:
            return state;
    }
};

const useMovieSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchMoviesBySearch = useCallback(async (searchPage?: number) => {
        try {
            if (!searchPage) dispatch({ type: ActionType.CLEAR_RESULTS });

            dispatch({ type: ActionType.FETCH_MOVIES_START, payload: { searchText: state.searchText, page: state.searchPage } });

            const res = await fetchMovies({ s: state.searchText, page: state.searchPage }) as unknown as IFetchMovieBySearchResponse | IAPIErrorResponse | Error
            if ('Response' in res) {
                if (res.Response === 'True') {
                    const moviesBySearchRes = res as IFetchMovieBySearchResponse;
                    dispatch({ type: ActionType.FETCH_MOVIES_SUCCESS, payload: { movies: moviesBySearchRes.Search } });
                } else if (res.Response === 'False') {
                    const errorResponse = res as IAPIErrorResponse;
                    dispatch({ type: ActionType.FETCH_MOVIES_ERROR, payload: { errorMessage: errorResponse.Error } });
                }
            } else {
                console.log('Error while fetching movies: ', res);
                dispatch({ type: ActionType.FETCH_MOVIES_ERROR, payload: { errorMessage: 'Unknown error occurred' } });
            }
        } catch (error) {
            console.log('Error: ', error);
            dispatch({ type: ActionType.FETCH_MOVIES_ERROR, payload: { errorMessage: 'Failed to fetch movies. Please try again later.' } });
        }
    }, [state.searchText, state.searchPage]);

    const fetchRandomMoviesWhenScreenLoad = useCallback(async () => {
        try {
            const startIndex = (state.currentPage - 1) * PAGE_SIZE;
            const endIndex = state.currentPage * PAGE_SIZE;
            const movieIdsToFetch = predefinedMovies.slice(startIndex, endIndex);
            const allMoviesPromise = movieIdsToFetch.map((id) => fetchMovies({ i: id }));
            const allMovies = await Promise.all(allMoviesPromise) as MovieDetails[];

            const newMovies: IMovie[] = allMovies.map(({ Title, Poster, Type, Year, imdbID }) => ({
                Poster,
                Title,
                Type,
                Year,
                imdbID,
            }));

            dispatch({ type: ActionType.FETCH_MOVIES_SUCCESS, payload: { movies: newMovies } });
        } catch (error) {
            dispatch({ type: ActionType.FETCH_MOVIES_ERROR, payload: { errorMessage: 'Failed to fetch movies. Please try again later.' } });
        }
    }, [state.currentPage]);

    useEffect(() => {
        fetchRandomMoviesWhenScreenLoad();
    }, [fetchRandomMoviesWhenScreenLoad]);

    useEffect(() => {
        if (state.searchText.length > 2) {
            fetchMoviesBySearch();
        }
    }, [state.searchText,]);
    useEffect(() => {
        if (state.searchText.length > 2) {
            fetchMoviesBySearch(state.searchPage);
        }
    }, [state.searchPage]);


    const loadMoreMovies = useCallback(() => {
        dispatch({ type: ActionType.LOAD_MORE_MOVIES });
    }, []);

    const clearErrors = useCallback(() => {
        dispatch({ type: ActionType.CLEAR_ERRORS });
    }, []);

    const setSearchText = useCallback((text: string) => {
        dispatch({ type: ActionType.SET_SEARCH_TEXT, payload: text });
    }, []);
    return {
        loading: state.loading,
        results: state.results,
        error: state.error,
        apiError: state.apiError,
        currentPage: state.currentPage,
        searchText: state.searchText,
        loadMoreMovies,
        clearErrors,
        setSearchText
    };
};

export default useMovieSearch;