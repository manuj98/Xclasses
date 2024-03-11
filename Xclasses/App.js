import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react'

import LoadingScreen from '../Xclasses/src/Screens/LoadingScreen'

export default function App() {
  //loading screen starts (using useState, useEffect hooks and setTimeOut function)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])
  if(loading == true){
    return(<LoadingScreen/>)
  }
  //loading screen ends
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
});
