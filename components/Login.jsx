import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onChangePassword = (password) => {
    setPassword(password);
  };
  const onChangeEmail = (email) => {
    setEmail(email);
  };
  const onPressProceed = () => {
    if (email && password) navigation.navigate("OTP");
  };
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <View style={styles.container}>
        <Text style={styles.head}>Enter Email To Login</Text>
        <View style={styles.inputContainer} elevation={2}>
          {/* For Email ID */}
          <Text style={styles.emailLabelText}>Enter Email</Text>
          <View style={styles.emailInputStyle}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={onChangeEmail}
              secureTextEntry={false}
            />
          </View>
          {/* For Password */}
          <Text style={styles.passwordLabelText}>Enter Password</Text>
          <View style={styles.passwordInputStyle}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={onPressProceed}>
            <View style={styles.proceedBtn}>
              <Text style={styles.proceed}>Proceed</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  head: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    color: "#000e30",
  },
  inputContainer: {
    backgroundColor: "#f7f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: 350,
    height: 350,
    borderRadius: 15,
  },
  emailInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 250,
    minHeight: 40,
    margin: 15,
  },
  emailLabelText: {
    fontFamily: "MontserratRegular",
    fontSize: 15,
    color: "#001540",
    marginTop: -20,
  },
  passwordInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 250,
    minHeight: 40,
    margin: 15,
  },
  passwordLabelText: {
    fontFamily: "MontserratRegular",
    fontSize: 15,
    color: "#001540",
  },
  input: {
    padding: 10,
  },
  proceedBtn: {
    marginTop: 30,
    minWidth: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    backgroundColor: "#001540",
  },
  proceed: {
    color: "#ffffff",
    alignItems: "center",
  },
});
