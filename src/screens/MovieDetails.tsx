import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { INavigation } from '../navigation/Inavigation';
import Loading from '../components/Loading';
import { useCallback, useEffect, useState } from 'react';
import { MovieSceenRouteProps } from '../navigation/RouteProps';
import { IAPIErrorResponse, MovieDetails as IMovieDetails } from '../interfaces/interfaces';
import { fetchMovies } from '../services/moviesService';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import ErrorToast from '../components/ErrorToast';

const { width, height } = Dimensions.get("window");

const MovieDetails = () => {
    const navigation = useNavigation<INavigation>();
    const { params } = useRoute<MovieSceenRouteProps>();
    const [movie, setMovie] = useState<IMovieDetails>();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchMovieById = useCallback(async (movieId: string) => {
        setLoading(true);
        try {
            const fetchMovieByIdRes = await fetchMovies({ i: movieId }) as unknown as IAPIErrorResponse | IMovieDetails;
            console.log(movieId, fetchMovieByIdRes)
            if ('Response' in fetchMovieByIdRes) {
                if (fetchMovieByIdRes.Response === 'True') {
                    setMovie(fetchMovieByIdRes as IMovieDetails);
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

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={handleNavigation}>
                    <ChevronLeftIcon size={30} strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <Loading />
            ) : (
                <View style={styles.movieImageContainer}>
                    <Image
                        source={{
                            uri: movie?.Poster || 'https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0',
                        }}
                        style={[styles.movieImage, {
                            height: movie ? height * 0.55 : height,
                        }]}
                    />
                </View>
            )}

            {movie && (
                <View style={styles.movieDetailsContainer}>
                    <Image
                        source={require('../assets/images/movieDetailsBg.png')}
                        style={styles.backgroundImage}
                        resizeMode="cover"
                    />
                    <View style={styles.detailsContent}>
                        <Text style={styles.title}>{movie.Title}</Text>
                        <View style={styles.genreContainer}>
                            {movie.Genre.split(',').map((genre, index) => (
                                <Text key={index} style={styles.genreText}>
                                    {genre.trim()}
                                    {index + 1 !== movie.Genre.split(',').length && ' • '}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.releaseContainer}>
                            <Text style={styles.releaseText}>
                                {movie.Runtime} {movie.Released || 'N/A'}
                            </Text>
                        </View>
                        <Text style={styles.plotText}>{movie.Plot}</Text>
                    </View>
                </View>
            )}

            {(error || apiError) && (
                <ErrorToast
                    isVisible={!!(error || apiError)}
                    message={error ? "An error has occurred. Please try later." : apiError}
                    onClose={hideErrorToast}
                />
            )}
        </ScrollView>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    backButtonContainer: {
        backgroundColor: '#2496ff',
        padding: 10,
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 1,
    },
    movieImageContainer: {
        width: '100%',
        position: 'relative',
    },
    movieImage: {
        width,
        height: height * 0.55,
    },
    movieDetailsContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 4,
        marginTop: -98,
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    backgroundImage: {
        width: '100%',
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    detailsContent: {
        padding: 16,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    genreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    genreText: {
        color: '#a0aec0',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
        marginRight: 8,
    },
    releaseContainer: {
        backgroundColor: '#2496ff',
        padding: 8,
        width: '75%',
        borderRadius: 8,
        marginTop: 12,
    },
    releaseText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    plotText: {
        color: '#cbd5e0',
        fontSize: 12,
        letterSpacing: 0.5,
        lineHeight: 18,
        marginTop: 12,
    },
});
