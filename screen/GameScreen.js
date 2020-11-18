import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

// Generate randome number function
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {        
        // Call generateRandomeBetween again (Called recursive method)
        return generateRandomBetween(min, max, exclude);

    } else {
        return randomNumber;
    }
};

const GameScreen = props => {
    // State    
    const [rounds, setRounds] = useState(0);
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoise));

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { onGameOver, userChoise } = props;

    useEffect(() => {
        if (currentGuess === userChoise) {

            // Call on game over function
            onGameOver(rounds);
        }
    }, [currentGuess, onGameOver, userChoise]);

    // Next number guess handler function
    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < userChoise) ||
            (direction === 'higher' && currentGuess > userChoise)
        ) {
            Alert.alert(
                'Don\'t lie!', 
                'You know that this is wrong...', 
                [{ text: 'Sorry!', style: 'cancel' }]
            );

            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        // Generate random number
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

        // Set current guess number
        setCurrentGuess(nextNumber);

        // Call game rounds handler function
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={ styles.screen }>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{ currentGuess }</NumberContainer>
            <Card style={ styles.buttonContainer }>
                <Button title="LOWER" onPress={ nextGuessHandler.bind(this, 'lower') } />
                <Button title="GREATER" onPress={ nextGuessHandler.bind(this, 'higher') } />
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
