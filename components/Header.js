import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import TitleText from './TitleText';
import Color from '../contents/color';

const Header = (props) => {
    return (
        <View style={ style.header }>
            <TitleText>{ props.title }</TitleText>
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
    }
});

export default Header;