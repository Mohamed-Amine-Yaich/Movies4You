import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
interface IErrorTostProps {
    isVisible: boolean;
    message: string;
    onClose: () => void

}


const ErrorToast = ({ isVisible, message, onClose }: IErrorTostProps) => {
    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            backdropOpacity={0.3}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.toastContainer}>
                <Text style={styles.toastText}>{message}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-start',
        margin: 0,
    },
    toastContainer: {
        backgroundColor: '#FF6347',
        padding: 16,
        borderRadius: 8,
        margin: 16,
        elevation: 2,
    },
    toastText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF4500',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ErrorToast;