import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState({});
  const [confirmPassword, setConfirmPassword] = useState();

  const onChangePassword = (password) => {
    setPassword(password);
  };

  const onChangeConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  const onChangeEmail = (email) => {
    setEmail(email);
  };
  const onPressRegister = () => {
    if (email && password == confirmPassword) navigation.navigate("OTP");
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
        <Text style={styles.head}>Enter Email To Signup</Text>
        <View style={styles.inputContainer} elevation={2}>
          {/* For Email ID */}
          {/* <Text style={styles.emailLabelText}>Enter Email</Text> */}
          <View style={styles.emailInputStyle}>
            <TextInput
              placeholder="Enter Email Id"
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={onChangeEmail}
              secureTextEntry={false}
            />
          </View>
          {/* For Password */}
          {/* <Text style={styles.passwordLabelText}>Enter Password</Text> */}
          <View style={styles.passwordInputStyle}>
            <TextInput
              placeholder="Enter Password"
              style={styles.input}
              autoCapitalize="none"
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry={true}
            />
          </View>
          {/* For Confirm Password */}
          {/* <Text style={styles.confirmPasswordLabelText}>Confirm Password</Text> */}
          <View style={styles.confirmPasswordInputStyle}>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={onPressRegister}>
            <View style={styles.registerBtn}>
              <Text style={styles.register}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.oldUserContainer}>
          <Text
            style={styles.oldUser}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Already Have Account LOGIN !
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

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
    minWidth: 300,
    minHeight: 40,
    margin: 20,
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
    minWidth: 300,
    minHeight: 40,
    margin: 20,
  },
  passwordLabelText: {
    fontFamily: "MontserratRegular",
    fontSize: 15,
    color: "#001540",
  },
  confirmPasswordInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
    minHeight: 40,
    margin: 20,
  },
  confirmPasswordLabelText: {
    fontFamily: "MontserratRegular",
    fontSize: 15,
    color: "#001540",
  },
  input: {
    padding: 10,
  },
  registerBtn: {
    marginTop: 30,
    minWidth: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    backgroundColor: "#001540",
  },
  register: {
    color: "#ffffff",
    alignItems: "center",
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
  },
  oldUserContainer: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  oldUser: {
    color: "#001e38",
    margin: 10,
    fontSize: 13,
    fontFamily: "MontserratSemiBold",
  },
});
