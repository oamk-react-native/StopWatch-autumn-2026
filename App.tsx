import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { clockReducer, initialState } from './reducers/clockReducer';

export default function App() {
  const [clockState,changeClockState] = useReducer(clockReducer,initialState)

  useEffect(() => {
    if (!clockState.isRunning) return
    const timerId = setInterval(() => changeClockState({type: 'tick'}),1000)
    console.log("Ticking...")
    return() => {
      console.log("Return")
      clearInterval(timerId)
    }
  },[clockState.isRunning])

  return (
    <View style={styles.container}>
      <Text>{clockState.time}</Text>
      <View style={styles.buttons}>
        <Button title="Start" onPress={() => changeClockState({type: 'start'})}/>
        <Button title="Stop" onPress={() => changeClockState({type: 'stop'})}/>
        <Button title="Reset" onPress={() => changeClockState({type: 'reset'})}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'column',
    gap: 8,
  },
});
