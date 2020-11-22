import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import DefaultStyles from '../contents/default-styles';
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

const renderListItem = (listLength, listItem) => (
    <View style={ styles.listItem }>
        <BodyText>#{ listLength - listItem.index }</BodyText>
        <BodyText>{ listItem.item }</BodyText>
    </View>
);

const GameScreen = props => {
    // State    
    // const [rounds, setRounds] = useState(0);
    const initialNumber = generateRandomBetween(1, 100, props.userChoise);
    const [guessList, setGuessList] = useState([initialNumber.toString()]);
    const [currentGuess, setCurrentGuess] = useState(initialNumber);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { onGameOver, userChoise } = props;

    useEffect(() => {
        if (currentGuess === userChoise) {

            // Call on game over function
            onGameOver(guessList.length);
            // onGameOver(rounds);            
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

        // Set current guess number in guess list state
        setGuessList(list => {
            return [
                nextNumber.toString(),
                ...list
            ];
        });

        // // Call game rounds handler function
        // setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={ styles.screen }>
            <Text style={ DefaultStyles.titleText }>Opponent's Guess</Text>
            <NumberContainer>{ currentGuess }</NumberContainer>
            <Card style={ styles.buttonContainer }>
                <MainButton 
                    onPress={ nextGuessHandler.bind(this, 'lower') }
                >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton 
                    onPress={ nextGuessHandler.bind(this, 'higher') }
                >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={ styles.listContainer }>
                {/* <ScrollView contentContainerStyle={ styles.list }>
                    { guessList.map((guess, index) => renderListItem(guess, guessList.length - index)) }
                </ScrollView>*/}
                <FlatList 
                    data={ guessList }
                    contentContainerStyle={ styles.list }
                    keyExtractor={ (item, index) => index.toString() }
                    renderItem={ renderListItem.bind(this, guessList.length) }
                />
            </View>
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
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        // width: '60%'
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },  
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },  
    listItem: {
        // padding: 15,
        padding: Dimensions.get('window').width > 350 ? 15 : 10,
        width: '100%',
        borderWidth: 1,
        // marginVertical: 10,
        marginVertical:  Dimensions.get('window').width > 350 ? 10 : 7,
        borderColor: '#ccc',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    }
});

export default GameScreen;
