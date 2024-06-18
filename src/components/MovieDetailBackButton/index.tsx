import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

interface MovieDetailBackButtonProps {
    handleNavigation: () => void
}

const MovieDetailBackButton = ({ handleNavigation }: MovieDetailBackButtonProps) => {
    return (<View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleNavigation}>
            <ChevronLeftIcon size={30} strokeWidth={2} color="white" />
        </TouchableOpacity>
    </View>
    );
};

export default MovieDetailBackButton;

const styles = StyleSheet.create({
    backButtonContainer: {
        backgroundColor: '#2496ff',
        padding: 10,
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 1,
    },
});
