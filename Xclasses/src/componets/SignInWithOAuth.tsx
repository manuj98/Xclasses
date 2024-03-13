import React from "react";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
 
WebBrowser.maybeCompleteAuthSession();
 
const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <View>
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
    </View>
    
  );
}
export default SignInWithOAuth;

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        color: '#fff'
      },
      button: {
        alignSelf: "center",
        marginTop: 20,
        elevation: 5,
        backgroundColor: "black",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        //width: windowWidth-195,
        alignItems: 'center'
      },
    
    })