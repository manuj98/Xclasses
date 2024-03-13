import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

const windowWidth= Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require('../../assets/logo.png')}/>
      <Text style={styles.boldText}>Account SignUp</Text>
      </View>
      {!pendingVerification && (
        <View style={styles.miniContainer}>
          
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First name"
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last name"
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email Address"
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              value={code}
              placeholder="Enter Code"
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify} style={styles.button}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#387ADF',
    alignItems: "center",
    height: "100%",
    justifyContent: 'center', 

  },
  logoContainer:{
    alignItems: 'center',
    marginBottom: 30
  },
  boldText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  logo:{
    width: 300,
    height: undefined,
    aspectRatio: 2.2
  },
  miniContainer: {
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  inputContainer: {
    backgroundColor: '#fff',
    margin: 2,
    borderWidth: 1,
    borderRadius: 5,
    width: windowWidth-130,
    elevation: 5,
    paddingHorizontal: 10
  },
  button:{
    alignSelf: 'center',
    marginTop: 20,
    elevation: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    
  },
  buttonText:{
    fontSize: 16
  }
});
