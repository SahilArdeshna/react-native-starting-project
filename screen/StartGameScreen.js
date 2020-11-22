import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    Button, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert, 
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from'react-native';

import Card from '../components/Card';
import Color from '../contents/color';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import DefaultStyle from '../contents/default-styles';
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
                <MainButton 
                    onPress={ () => props.onStartGame(selectedNumber) } 
                >
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={ 30 }>
                <TouchableWithoutFeedback 
                    onPress={ (e) => {
                        // Close active keyboard
                        Keyboard.dismiss();
                    } }
                >
                    <View style={ styles.screen }>
                        {/* <Text style={ DefaultStyle.titleText }>Start a New Game!</Text> */}
                        <TitleText style={ styles.titleText }>Start a New Game!</TitleText>
                        <Card style={ styles.inputContainer }>
                            <BodyText>Select a Number</BodyText>
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
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    titleText: {
        marginVertical: 15
    },  
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold"
    }, 
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        // maxWidth: '80%',
        alignItems: 'center'        
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        // width: 80
        width: Dimensions.get('window').width / 4
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