import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';

import Colors from '../contents/color';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={ styles.screen }>
                <TitleText>
                    The Game is Over!
                </TitleText>
                <View style={ styles.imageContainer }>
                    <Image 
                        resizeMode="cover"
                        style={ styles.image }
                        source={ require('../assets/success.png') }
                        // source={ { 
                        //     uri: 'https://image.shutterstock.com/image-illustration/flag-being-waved-top-mountain-600w-1615022899.jpg' 
                        // } } 
                    />
                </View>
                <View style={ styles.resultContainer }>
                    <BodyText style={ styles.resultText }>
                        Your phone needed 
                        <Text style={ styles.highlight }> { props.numOfRounds }</Text> rounds to guess the number 
                        <Text style={ styles.highlight }> { props.userNumber }</Text>.
                    </BodyText>
                    {/* <Text numberOfLines={1} ellipsizeMode="tail">
                        This text will never wrap into a new line, instead it will be cut off like this if it is too lon...
                    </Text> */}
                </View>
                <MainButton 
                    onPress={ props.onRestart }
                >
                    New Game
                </MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        // width: 300,
        // height: 300,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        // borderRadius: 150,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden',
        // marginVertical: 30
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },  
    resultText: {
        // fontSize: 20,
        fontSize: Dimensions.get('window').width < 300 ? 16 : 20,
        textAlign: 'center'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;