import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AppInput from "./common/AppInput";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email ID missing "),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .test("Passwords-match", "Passwords must match ", function (value) {
      return this.parent.password === value;
    }),
});

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState({});
  const [confirmPassword, setConfirmPassword] = useState();

  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const handleSignup = (values, formikActions) => {
    setTimeout(() => {
      console.log(values, formikActions);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    }, 3000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignup}
    >
      {({ handleSubmit }) => {
        // console.log(errors, values);
        return (
          <>
            <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
              <View style={styles.container}>
                <Text style={styles.head}>Enter Email To Signup</Text>
                <View style={styles.inputContainer} elevation={2}>
                  {/* For Email ID */}
                  <AppInput
                    name="email"
                    placeholder="Enter Email Id"
                    style={[styles.emailInputStyle, { padding: 10 }]}
                    autoCapitalize="none"
                    value={email}
                  />
                  {/* For Password */}
                  <AppInput
                    name="password"
                    placeholder="Enter Password"
                    style={[styles.passwordInputStyle, { padding: 10 }]}
                    autoCapitalize="none"
                    value={password}
                    secureTextEntry={true}
                  />
                  {/* For Confirm Password */}

                  <AppInput
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    style={[styles.confirmPasswordInputStyle, { padding: 10 }]}
                    autoCapitalize="none"
                    value={confirmPassword}
                    secureTextEntry={true}
                  />
                  {/* Register Button & Stuff  */}
                </View>
                <View style={styles.bottom}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View
                      style={[
                        styles.registerBtn,
                        // { backgroundColor: isSubmitting ? "gray" : "#001540" },
                      ]}
                    >
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
          </>
        );
      }}
    </Formik>
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
    marginBottom: -80,
    width: 350,
    marginTop: 10,
    height: 370,
    borderRadius: 15,
  },
  emailInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
    minHeight: 50,
    margin: 15,
  },
  passwordInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
    minHeight: 50,
    margin: 15,
  },
  confirmPasswordInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
    minHeight: 50,
    margin: 15,
  },
  input: {
    padding: 10,
  },
  registerBtn: {
    marginTop: 110,
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
    marginBottom: -60,
    marginTop: 15,
    justifyContent: "space-evenly",
  },
  oldUser: {
    color: "#001e38",
    marginBottom: 20,
    fontSize: 13,
    fontFamily: "MontserratSemiBold",
  },
  errorMsgEmail: {
    fontSize: 12,
    color: "red",
    margin: 0,
    right: 90,
  },
  errorMsgPassword: {
    fontSize: 12,
    color: "red",
    margin: 0,
    right: 42,
  },
  errorMsgConfirmPass: {
    fontSize: 12,
    color: "red",
    margin: 0,
    right: 82,
  },
});
