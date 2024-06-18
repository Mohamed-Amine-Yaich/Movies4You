import * as React from 'react';
import {  StyleSheet, Image } from 'react-native';
import { height, width } from '../../constants';


const HomeImageBg = () => {
    return (<Image
        source={require("../../assets/images/homeScreenBg.png")}
        style={styles.backgroundImage}
    />
    );
};

export default HomeImageBg;

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: height,
        position: 'absolute',
    },
});
