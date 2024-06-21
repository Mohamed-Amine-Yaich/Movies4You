import * as React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { IMovie } from '../../interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '../../navigation/Inavigation';
import { SCREENS } from '../../data/screens';
import { height, width } from '../../constants';

interface IMovieCard {
    item: IMovie
}

const MovieCard = ({ item }: IMovieCard) => {
    const navigation = useNavigation<INavigation>()
    return (

        <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREENS.MOVIE_DETAILS, { movieId: item.imdbID })}
        >
            <View style={styles.movieItem}>
                <Image
                    source={item?.Poster && item.Poster != 'N/A' ? { uri: item?.Poster } : require('../../assets/images/randomMoviePoster.png')}
                    style={styles.posterImage}
                />
                <Text style={[styles.posterText, item?.Title?.length > 17 ? { maxWidth: width * 0.37 } : {}]}>
                    {item.Title}
                </Text>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default MovieCard;

const styles = StyleSheet.create({

    movieItem: {
        padding: 10,
    },
    posterImage: {
        width: width * 0.43,
        height: height * 0.3,
        borderRadius: 24,
    },
    posterText: {
        color: '#D1D5DB',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 4,
        textAlign: 'center',
    },
});
