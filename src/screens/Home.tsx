// Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TextInput, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { debounce } from "lodash";
import Loading from '../components/Loading';
import ErrorToast from '../components/ErrorToast';
import { SCREENS } from '../data/screens';
import { SEARCH_PLACEHOLDER, NO_RESULTS_TEXT, NO_MORE_RESULTS_TEXT, ERROR_TOAST_MESSAGE } from '../constants';
import { IMovie } from '../interfaces/interfaces';
import useMovieSearch from '../hooks/useMovieSearch';
import { INavigation } from '../navigation/Inavigation';

const { width, height } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation<INavigation>();
    const {
        loading,
        results,
        error,
        apiError,
        currentPage,
        searchText,
        loadMoreMovies,
        clearErrors,
        setSearchText
    } = useMovieSearch();


    const handleSearchTextChange = useCallback(debounce((text: string) => {
        setSearchText(text);
    }, 400), []);

    const handleSearch = useCallback(() => {
        clearErrors();
    }, [clearErrors]);



    const renderItem = ({ item, index }: { item: IMovie, index: number }) => (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREENS.MOVIE_DETAILS, { movieId: item.imdbID })}
        >
            <View style={styles.movieItem}>
                <Image
                    source={item.Poster ? { uri: item.Poster } : require('../assets/images/randomMoviePoster.png')}
                    style={styles.posterImage}
                />
                <Text style={[styles.posterText, item?.Title?.length > 17 ? { maxWidth: width * 0.37 } : {}]}>
                    {item.Title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/homeScreenBg.png")}
                style={styles.backgroundImage}
            />

            <View style={styles.textInputContainer}>
                <TextInput
                    onChangeText={handleSearchTextChange}
                    placeholder={SEARCH_PLACEHOLDER}
                    placeholderTextColor="gray"
                    style={styles.textInput}
                />
            </View>

            {loading ? (
                <Loading />
            ) : results.length > 0 ? (
                <FlatList
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={item => item.imdbID}
                    numColumns={2}
                    onEndReached={loadMoreMovies}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => (
                        searchText.length < 2 ? (
                            currentPage <= 10 ? <Loading /> : (<Text style={styles.resultsText}>{NO_MORE_RESULTS_TEXT}</Text>)) : apiError ? (
                                <Text style={styles.resultsText}>{NO_MORE_RESULTS_TEXT}</Text>
                            ) : <Loading />
                    )}
                />
            ) : (
                <Text style={styles.resultsText}>{error || NO_RESULTS_TEXT}</Text>
            )}

            <ErrorToast
                isVisible={!!error || !!apiError}
                message={error ? ERROR_TOAST_MESSAGE : apiError}
                onClose={clearErrors}
            />
        </View>
    );
};
export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        width: width,
        height: height,
        position: 'absolute',
    },
    textInputContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        marginTop: 48,
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    textInput: {
        paddingBottom: 4,
        paddingLeft: 24,
        flex: 1,
        fontWeight: '500',
        color: 'black',
        letterSpacing: 0.5,
    },
    resultsText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 4,
        fontSize: 18,
        marginTop: 8,
        marginBottom: 10,
    },
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
