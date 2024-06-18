import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Loading from '../Loading';
import { NO_MORE_RESULTS_TEXT } from '../../constants';

interface HomeFooterNameProps {
    searchText: string, currentPage: number, apiError: string,
}

const HomeFooter = ({ searchText, currentPage, apiError }: HomeFooterNameProps) => (searchText.length < 2 ? (
    currentPage <= 10 ? <Loading /> : (<Text style={styles.resultsText}>{NO_MORE_RESULTS_TEXT}</Text>)
) : apiError ? (
    <Text style={styles.resultsText}>{NO_MORE_RESULTS_TEXT}</Text>
) : <Loading />)

export default HomeFooter;

const styles = StyleSheet.create({
    resultsText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 4,
        fontSize: 18,
        marginTop: 8,
        marginBottom: 10,
    },
});
