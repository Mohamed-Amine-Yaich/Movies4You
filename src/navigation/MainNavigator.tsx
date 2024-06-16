import * as React from 'react';
import { StyleSheet } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../data/screens';
import Home from '../screens/Home';
import MovieDetails from '../screens/MovieDetails';

const MainNavigator = () => {


    const Stack = createNativeStackNavigator();

    return (

        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name={SCREENS.HOME} component={Home} />
                <Stack.Screen name={SCREENS.MOVIE_DETAILS} component={MovieDetails} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default MainNavigator;

const styles = StyleSheet.create({
    container: {}
});
