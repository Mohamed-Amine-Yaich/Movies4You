import {  Text, StyleSheet } from "react-native";
import React from "react";
import { NO_RESULTS_TEXT } from "../../constants";

export default function NoResultsOrError({error}:{error:string}) {
  return (
    
<Text style={styles.resultsText}>{error || NO_RESULTS_TEXT}</Text>  
  );
}

const styles = StyleSheet.create({
  

  resultsText: {
      color: 'white',
      fontWeight: '600',
      marginLeft: 4,
      fontSize: 18,
      marginTop: 8,
      marginBottom: 10,
  },

})