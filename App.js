import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import GameScreen from './screen/GameScreen';
import GameOverScreen from './screen/GameOverScreen';
import StartGameScreen from './screen/StartGameScreen';

const fetchFonts = () => {
  return Fonts.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading 
      startAsync={ fetchFonts } 
      onFinish={ () => setDataLoaded(true) } 
      onError={ (err) => console.log(err) } 
    />;
  }

  // New game handler function
  const newGameHandler = () => {

    // Set guess rounds state
    setGuessRounds(0);

    // Set user number state
    setUserNumber(null);
  };

  // User number handler function
  const startGameHandler = (number) => {

    // Set user number state
    setUserNumber(number);
  };

  // Game round handler
  const gameRoundsHandler = (numOfRound) => {

    // Set rounds state
    setGuessRounds(numOfRound);
  };

  let content = <StartGameScreen onStartGame={ startGameHandler } />  

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoise={ userNumber } onGameOver={ gameRoundsHandler } />
    );

  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen 
        userNumber={ userNumber }
        numOfRounds={ guessRounds }
        onRestart={ newGameHandler }
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      { content }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
