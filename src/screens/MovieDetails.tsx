import * as React from 'react';
import {  View, StyleSheet, TouchableOpacity, ScrollView,  } from 'react-native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import ErrorToast from '../components/ErrorToast';
import MovieDetailContent from '../components/MovieDetailContent';
import MovieDetailPoster from '../components/MovieDetailsPoster';
import useMovieDetails from '../hooks/useMovieDetails';


const MovieDetails = () => {
    const {handleNavigation,movie,apiError,error,hideErrorToast,loading}=useMovieDetails()

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={handleNavigation}>
                    <ChevronLeftIcon size={30} strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>

            {movie && <MovieDetailPoster loading={loading} movie={movie} />}

            {movie && <MovieDetailContent movie={movie} />}

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
 
});
