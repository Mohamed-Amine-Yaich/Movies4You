import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { MovieDetails } from '../../interfaces/interfaces';
import { height } from '../../constants';

interface MovieDetailContentProps {
    movie : MovieDetails
}

const MovieDetailContent = ({movie}: MovieDetailContentProps) => {
  return (
    movie && (
        <View style={styles.movieDetailsContainer}>
            <Image
                source={require('../../assets/images/movieDetailsBg.png')}
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
                        {movie.Runtime} - {movie.Released || 'N/A'}
                    </Text>
                </View>
                <Text style={styles.plotText}>{movie.Plot}</Text>
            </View>
        </View>
    )
  );
};

export default MovieDetailContent;




const styles = StyleSheet.create({
   
 
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
