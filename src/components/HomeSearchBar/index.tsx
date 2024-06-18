import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SEARCH_PLACEHOLDER, } from '../../constants';
import { XMarkIcon } from "react-native-heroicons/outline";
import { useRef } from 'react';

interface SearchBarProps {
    handleTextDebounce: (str: string) => void
}

const SearchBar = ({ handleTextDebounce,  }: SearchBarProps) => {
    const textInputRef = useRef<TextInput>(null);

    const clearTextInput = () => {
        if (textInputRef.current) {
            textInputRef.current.clear();
        }
    }; return (<View style={styles.textInputContainer}>
        <TextInput
            onChangeText={(text) => handleTextDebounce(text)}
            placeholder={SEARCH_PLACEHOLDER}
            placeholderTextColor="gray"
            style={styles.textInput}
            ref={textInputRef}
        />
        <TouchableOpacity onPress={clearTextInput}>
            <XMarkIcon size="25" color="gray" />
        </TouchableOpacity>
    </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({

    textInputContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        marginTop: 48,
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    textInput: {
        paddingBottom: 4,
        paddingLeft: 24,
        flex: 1,
        fontWeight: '500',
        color: 'black',
        letterSpacing: 0.5,
    },


})