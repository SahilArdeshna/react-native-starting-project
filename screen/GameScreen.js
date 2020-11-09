import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

// Generate randome number function
const generateRandomBetween = (min, max, exlude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exlude) {        
        // Call generateRandomeBetween again (Called recursive method)
        return generateRandomBetween(min, max, exlude);

    } else {
        return randomNumber;
    }
};

const GameScreen = props => {
    // State
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoise));

    return (
        <View style={ styles.screen }>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{ currentGuess }</NumberContainer>
            <Card style={ styles.buttonContainer }>
                <Button title="LOWER" />
                <Button title="GREATER" />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
