import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";


import SignInWithOAuth from '../componets/SignInWithOAuth.tsx'
import Signup from '../Screens/Signup';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SignInScreen({navigation}) {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}
        />
        <Text style={styles.boldText}>Account Login</Text>
        <SignInWithOAuth/>
      </View>
      <View style={styles.miniContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email adress"
            onChangeText={(email) => setEmailAddress(email)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            placeholder="Password"
           // placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity onPress={onSignInPress} style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={[ styles.vm_20, styles.as_center]}>Forgotten password?</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>
        <TouchableOpacity style={[styles.button, styles.blackBg]}>
          <Text style={[styles.buttonText, styles.whiteText]} onPress={()=>navigation.navigate('Signup')}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#836FFF",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    width: 300,
    height: undefined,
    aspectRatio: 2.2,
  },
  miniContainer: {
    backgroundColor: "#fff",
    elevation: 5,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  inputContainer: {
    backgroundColor: "#fff",
    margin: 2,
    borderWidth: 1,
    borderRadius: 5,
    width: windowWidth - 130,
    elevation: 5,
    paddingHorizontal: 10,
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
    elevation: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    //width: windowWidth-195,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16
  },
  blackBg:{
    backgroundColor: 'black'
  },
  whiteText:{
    color: '#fff',
  },
  horizontalLine:{
    width: windowWidth-150,
    height: 1,
    borderTopWidth: 1,
    opacity: 0.2,
    alignSelf: 'center'

  },
  vm_20:{
    marginVertical: 20,
  },
  as_center:{
    alignSelf: 'center'
  }
});
