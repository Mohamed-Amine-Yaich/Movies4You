import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Loading from '../Loading';
import { height, width } from '../../constants';
import { MovieDetails } from '../../interfaces/interfaces';

interface MovieDetailPosterProps {
    loading: boolean
    movie?: MovieDetails
}

const MovieDetailPoster = ({ loading, movie }: MovieDetailPosterProps) => {
    return (
        loading ? (
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
        )


    );
};

export default MovieDetailPoster;



const styles = StyleSheet.create({

    movieImageContainer: {
        width: '100%',
        position: 'relative',
    },
    movieImage: {
        width,
        height: height * 0.55,
    },
});
