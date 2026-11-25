import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { clockReducer, initialState } from './reducers/clockReducer';
import { useClock } from './hooks/useClock';
import FormattedTime from './components/FormattedTime';

export default function App() {
  const { time, isRunning, start, stop, reset} = useClock()
/*   const [clockState,changeClockState] = useReducer(clockReducer,initialState)

  useEffect(() => {
    if (!clockState.isRunning) return
    const timerId = setInterval(() => changeClockState({type: 'tick'}),1000)
    console.log("Ticking...")
    return() => {
      console.log("Return")
      clearInterval(timerId)
    }
  },[clockState.isRunning])
 */

  return (
    <View style={styles.container}>
      <FormattedTime time={time}/>
      <View style={styles.buttons}>
        <Button title="Start" onPress={start} disabled={isRunning}/>
        <Button title="Stop" onPress={stop} disabled={!isRunning}/>
        <Button title="Reset" onPress={reset} disabled={time===0 && !isRunning}/>
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
