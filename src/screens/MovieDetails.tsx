import * as React from 'react';
import { StyleSheet, ScrollView, } from 'react-native';
import ErrorToast from '../components/ErrorToast';
import MovieDetailContent from '../components/MovieDetailContent';
import MovieDetailPoster from '../components/MovieDetailsPoster';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetailBackButton from '../components/MovieDetailBackButton';


const MovieDetails = () => {
    const { handleNavigation, movie, apiError, error, hideErrorToast, loading } = useMovieDetails()

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

            {movie && <MovieDetailBackButton handleNavigation={handleNavigation} />}
            <MovieDetailPoster loading={loading} movie={movie} />

            {movie && <MovieDetailContent movie={movie} />}

            {(error || apiError) && (
                <ErrorToast
                    isVisible={!!(error || apiError)}
                    message={error ? "An error has occurred. Please try later." : apiError&&'Movie could not be loaded. Please try again later.'}
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

});
