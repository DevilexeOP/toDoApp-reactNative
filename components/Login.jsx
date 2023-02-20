import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
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
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const onChangePassword = (password) => {
  //   setPassword(password);
  // };
  // const onChangeEmail = (email) => {
  //   setEmail(email);
  // };
  // const onPresslogin = () => {
  //   if (email && password) navigation.navigate("OTP");
  // };
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const handleLogin = (values, formikAction) => {
    setTimeout(() => {
      console.log(values, formikAction);
    }, 3000);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        errors,
        values,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => {
        console.log(errors, values);
        return (
          <>
            <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
              <View style={styles.container}>
                <Text style={styles.head}>Enter Email To Login</Text>
                <View style={styles.inputContainer} elevation={2}>
                  {/* For Email ID */}
                  {/* <Text style={styles.emailLabelText}>Enter Email</Text> */}
                  <Text style={styles.errorMsgEmail}>
                    {touched.email && errors.email ? errors.email : ""}
                  </Text>
                  <View style={styles.emailInputStyle}>
                    <TextInput
                      onBlur={handleBlur("email")}
                      placeholder="Enter Email"
                      style={styles.input}
                      autoCapitalize="none"
                      value={email}
                      onChangeText={handleChange("email")}
                      secureTextEntry={false}
                    />
                  </View>
                  {/* For Password */}
                  {/* <Text style={styles.passwordLabelText}>Enter Password</Text> */}
                  <Text style={styles.errorMsgPassword}>
                    {touched.password && errors.password ? errors.password : ""}
                  </Text>
                  <View style={styles.passwordInputStyle}>
                    <TextInput
                      onBlur={handleBlur("password")}
                      onChangeText={handleChange("password")}
                      placeholder="Enter Password"
                      style={styles.input}
                      autoCapitalize="none"
                      value={password}
                      secureTextEntry={true}
                    />
                  </View>
                  <View style={styles.bottom}>
                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={styles.loginBtn}>
                        <Text style={styles.login}>Login</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.newUserContainer}>
                      <Text
                        style={styles.newUser}
                        onPress={() => {
                          navigation.navigate("Signup");
                        }}
                      >
                        New User Register Now !
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        );
      }}
    </Formik>
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
    height: 360,
    borderRadius: 15,
  },
  emailInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
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
    minWidth: 300,
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
  loginBtn: {
    marginTop: 15,
    minWidth: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    backgroundColor: "#001540",
  },
  login: {
    color: "#ffffff",
    alignItems: "center",
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
  },
  newUserContainer: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  newUser: {
    color: "#001e38",
    margin: 10,
    fontSize: 13,
    fontFamily: "MontserratSemiBold",
  },
  errorMsgEmail: {
    fontSize: 12,
    color: "red",
    margin: 0,
    right: 85,
  },
  errorMsgPassword: {
    fontSize: 12,
    color: "red",
    margin: 0,
    right: 38,
  },
});
