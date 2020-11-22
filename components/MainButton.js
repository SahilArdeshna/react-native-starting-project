import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../contents/color';

const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={ 0.6 } onPress={ props.onPress }>
            <View style={ { ...styles.button, ...props.style } }>
                <Text style={ styles.buttonText }>{ props.children }</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'open-sans',
    }
});

export default MainButton;