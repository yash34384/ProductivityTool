import { View, StyleSheet, Text, Alert, AppState } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import BarBtn from '../Components/BarBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pomodoro = () => {
  const totalMinutes = 30;
  const minutesLeft = 5;
  const [secondsLeft, setSecondsLeft] = useState(totalMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const loadTimerState = async () => {
      try {
        const savedSecondsLeft = await AsyncStorage.getItem('secondsLeft');
        const savedIsRunning = await AsyncStorage.getItem('isRunning');
        const savedTimestamp = await AsyncStorage.getItem('timestamp');

        if (savedSecondsLeft !== null && savedTimestamp !== null) {
          const elapsedSeconds = Math.floor(
            (Date.now() - JSON.parse(savedTimestamp)) / 1000
          );
          const updatedSecondsLeft =
            JSON.parse(savedSecondsLeft) - elapsedSeconds;
          setSecondsLeft(updatedSecondsLeft > 0 ? updatedSecondsLeft : 0);
        }

        if (savedIsRunning !== null) {
          setIsRunning(JSON.parse(savedIsRunning));
        }
      } catch (error) {
        console.error('Failed to load timer state', error);
      }
    };

    loadTimerState();

    const handleAppStateChange = async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const savedSecondsLeft = await AsyncStorage.getItem('secondsLeft');
        const savedTimestamp = await AsyncStorage.getItem('timestamp');

        if (savedSecondsLeft !== null && savedTimestamp !== null) {
          const elapsedSeconds = Math.floor(
            (Date.now() - JSON.parse(savedTimestamp)) / 1000
          );
          const updatedSecondsLeft =
            JSON.parse(savedSecondsLeft) - elapsedSeconds;
          setSecondsLeft(updatedSecondsLeft > 0 ? updatedSecondsLeft : 0);
        }
      }
      appState.current = nextAppState;
    };

    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  useEffect(() => {
    const saveTimerState = async () => {
      try {
        await AsyncStorage.setItem('secondsLeft', JSON.stringify(secondsLeft));
        await AsyncStorage.setItem('isRunning', JSON.stringify(isRunning));
        if (isRunning) {
          await AsyncStorage.setItem('timestamp', JSON.stringify(Date.now()));
        }
        if (!isRunning) {
          await AsyncStorage.setItem('timestamp', JSON.stringify(null));
        }
      } catch (error) {
        console.error('Failed to save timer state', error);
      }
    };

    saveTimerState();
  }, [secondsLeft, isRunning]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1);
      }, 1000);
    } else if (!isRunning && secondsLeft !== 0) {
      clearInterval(interval);
    }
    if (secondsLeft === minutesLeft * 60) {
      Alert.alert(
        'Well Done',
        'Your Pomodoro is complete. You can take 5 minutes of break before starting next.',
        [{ text: 'Okay', style: 'default' }]
      );
    }

    if (secondsLeft === 0) {
      clearInterval(interval);
      setIsRunning(false);
      setSecondsLeft(totalMinutes * 60);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSecondsLeft(totalMinutes * 60);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
    <View style={style.pomodoro}>
      <Text style={style.time}>{formatTime(secondsLeft)}</Text>
      {isRunning ? (
        <BarBtn
          icon="stop-circle-outline"
          size={100}
          color="black"
          onPress={stopTimer}
        />
      ) : (
        <BarBtn
          icon="play-circle-outline"
          size={100}
          color="black"
          onPress={startTimer}
        />
      )}
    </View>
  );
};

export default Pomodoro;

const style = StyleSheet.create({
  pomodoro: {
    backgroundColor: '#dee2e6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  time: {
    fontFamily: 'mukta-4',
    fontSize: 100
  },
  pressed: {
    opacity: 0.4
  }
});
