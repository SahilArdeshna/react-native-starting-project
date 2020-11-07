import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Color from '../contents/color';

const Header = (props) => {
    return (
        <View style={ style.header }>
            <Text style={ style.headerTitle }>{ props.title }</Text>
        </View>
    );    
};

const style = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;