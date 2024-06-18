import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Loading from '../Loading';
import { IMovie } from '../../interfaces/interfaces';
import MovieCard from '../MovieCard';
import HomeFooter from '../HomeFooter';
import NoResultsOrError from '../NoResultsOrError';

interface HomeContentProps {
    loading: boolean
    results: IMovie[]
    searchText: string
    currentPage: number
    apiError: string
    error: string
    loadMoreMovies: () => void
}

const HomeContent = ({ searchText, currentPage, loading, results, apiError, error, loadMoreMovies }: HomeContentProps) => {
    return (
        loading ? (
            <Loading />
        ) : results.length > 0 ? (
            <FlatList
                data={results}
                renderItem={({ item }: { item: IMovie }) => <MovieCard item={item} />}
                keyExtractor={item => item.imdbID}
                numColumns={2}
                onEndReached={loadMoreMovies}
                onEndReachedThreshold={0.5}
                ListFooterComponent={<HomeFooter searchText={searchText} currentPage={currentPage} apiError={apiError} />}
            />
        ) : (
            <NoResultsOrError error={error} />
        )

    )
};

export default HomeContent;

const styles = StyleSheet.create({
    container: {}
});
