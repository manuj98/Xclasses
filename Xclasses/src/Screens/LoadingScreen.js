import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

const windowHeight = Dimensions.get('window').height;

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.jpg')}/>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    //backgroundColor: 'red',
    height: windowHeight,

  },
  logo:{
    width: 200,
    height: undefined,
    aspectRatio: 2.2,
    alignSelf: 'center'
  }
})