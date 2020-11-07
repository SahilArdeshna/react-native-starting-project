import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from'react-native';

import Card from '../components/Card';
import Color from '../contents/color';
import Input from '../components/Input';

const StartGameScreen = (props) => {
    return (
        <View style={ styles.screen }>
            <Text style={ styles.title }>Start a New Game!</Text>
            <Card style={ styles.inputContainer }>
                <Text>Select a Number</Text>
                <Input                     
                    style={ styles.input } 
                    blurOnSubmit
                    autoCapitalize="none"
                    autCorrect={ false }
                    keyboardType="numeric"
                    maxLength={ 2 }
                />
                <View style={ styles.buttonContainer }>
                    <View style={ styles.button }>
                        <Button title="Reset" color={ Color.accent } />
                    </View>
                    <View style={ styles.button }>
                        <Button title="Submit" color={ Color.primary } />
                    </View>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'        
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 80
    },
    input: {
        width: 50,
        textAlign: 'center'
    }
});

export default StartGameScreen;