import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from'react-native';

import Card from '../components/Card';
import Color from '../contents/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {
    let confirmOutput;

    // State
    const [confirmed, setConfirmed] = useState(false);
    const [enteredValue, setEnteredValue] = useState('');
    const [selectedNumber, setSelectedNumber] = useState();

    // Input change handler function
    const inputChangeHandler = (inputText) => {

        // Set entered values state value
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    // Input reset handler function
    const inputResetHandler = () => {

        // Set entered value state
        setEnteredValue('');

        // Set confirmed state to false
        setConfirmed(false);

        // Close active keyboard
        Keyboard.dismiss();
    };

    // Input submit handler function
    const inputSubmitHandler = () => {
        const choosenNumber = parseInt(enteredValue);

        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            // Set alert message
            Alert.alert(
                'Invalid number!', 
                'Number must be between 1 to 99.', 
                [{ text: 'Okay', style: "destructive", onPress: inputResetHandler }]
            );

            return;
        }

        // Set confirmed state to true
        setConfirmed(true);

        // Set selected number state
        setSelectedNumber(choosenNumber);

        // Set entered value state
        setEnteredValue('');

        // Close active keyboard
        Keyboard.dismiss();
    };

    if (confirmed) {
        confirmOutput = (
            <Card style={ styles.summaryContainer }>
                <Text>You selected</Text>
                <NumberContainer>{ selectedNumber }</NumberContainer>
                <Button 
                    title="START GAME" 
                    onPress={ () => props.onStartGame(selectedNumber) } 
                />
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback 
            onPress={ (e) => {
                // Close active keyboard
                Keyboard.dismiss();
            } }
        >
            <View style={ styles.screen }>
                <Text style={ styles.title }>Start a New Game!</Text>
                <Card style={ styles.inputContainer }>
                    <Text>Select a Number</Text>
                    <Input                     
                        style={ styles.input } 
                        blurOnSubmit
                        autoCapitalize="none"
                        autCorrect={ false }
                        keyboardType="number-pad"
                        maxLength={ 2 }
                        onChangeText={ inputChangeHandler }
                        value={ enteredValue }
                    />
                    <View style={ styles.buttonContainer }>
                        <View style={ styles.button }>
                            <Button 
                                title="Reset" 
                                color={ Color.accent } 
                                onPress={ inputResetHandler }
                            />
                        </View>
                        <View style={ styles.button }>
                            <Button 
                                title="Submit" 
                                color={ Color.primary } 
                                onPress={ inputSubmitHandler }
                            />
                        </View>
                    </View>
                </Card>
                { confirmOutput }
            </View>
        </TouchableWithoutFeedback>
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
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;