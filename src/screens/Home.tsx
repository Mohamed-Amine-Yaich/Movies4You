import React from 'react';
import { View, StyleSheet, } from 'react-native';

import ErrorToast from '../components/ErrorToast';
import { ERROR_TOAST_MESSAGE, } from '../constants';

import useMovieSearch from '../hooks/useMovieSearch';

import SearchBar from '../components/HomeSearchBar';
import HomeImageBg from '../components/HomeImageBg';
import HomeContent from '../components/HomeContent';


const Home = () => {

    const { loading, results, searchText, handleTextDebounce, currentPage, apiError, error, loadMoreMovies, hideErrorToast } = useMovieSearch()



    return (
        <View style={styles.container}>

            <HomeImageBg />

            <SearchBar handleTextDebounce={handleTextDebounce} />

            <HomeContent loading={loading} results={results} searchText={searchText} currentPage={currentPage} apiError={apiError} error={error} loadMoreMovies={loadMoreMovies} />
            
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

})