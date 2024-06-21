/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,

  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';



import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import MainNavigator from './src/navigation/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeImageBg from './src/components/HomeImageBg';
import Loading from './src/components/Loading';
import { useCustomNetInfo } from './src/hooks/useCustomNetInfo';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';



  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const { netState, handleRefreshPress } = useCustomNetInfo()

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {netState === undefined ?
        <>
          <View style={styles.NoInternetContainer}>

            <HomeImageBg />

            <Loading />
          </View>

        </>

        :

        netState != undefined && (!netState.isConnected || !netState.isInternetReachable)
          ? <>

            <View style={styles.NoInternetContainer}>
              <HomeImageBg />
              <Text style={styles.warningText}>
                No internet connection, please activate your wifi or mobile network.
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleRefreshPress}>
                <Text style={styles.buttonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </>
          :
          <MainNavigator />



      }


    </SafeAreaProvider>
  );

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  NoInternetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  warningText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

});

export default App;

