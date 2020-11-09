import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import GameScreen from './screen/GameScreen';
import StartGameScreen from './screen/StartGameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  // User number handler function
  const startGameHandler = (number) => {

    // Set user number state
    setUserNumber(number);
  };

  let content = <StartGameScreen onStartGame={ startGameHandler } />  

  if (userNumber) {
    content = <GameScreen userChoise={ userNumber } />
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
