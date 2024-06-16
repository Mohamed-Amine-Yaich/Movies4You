import { useNavigation, } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { INavigation } from '../navigation/Inavigation';
import { SCREENS } from '../data/screens';

interface MovieDetailsProps { }

const MovieDetails = (props: MovieDetailsProps) => {
    const navigation = useNavigation<INavigation>()
    return (
        <View style={styles.container}>
            <Text>this is MovieDetails

            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate(SCREENS.HOME) }}>
                <Text >go to home </Text>

            </TouchableOpacity>

        </View>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
