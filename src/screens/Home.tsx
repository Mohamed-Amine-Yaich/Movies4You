import { useNavigation, } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { INavigation } from '../navigation/Inavigation';
import { SCREENS } from '../data/screens';

interface HomeProps { }

const Home = (props: HomeProps) => {
    const navigation = useNavigation<INavigation>()
    return (
        <View style={styles.container}>
            <Text>this is Home screen

            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate(SCREENS.MOVIE_DETAILS) }}>
                <Text >go to Movie details</Text>

            </TouchableOpacity>

        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
