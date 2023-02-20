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

  // const onChangePassword = (password) => {
  //   setPassword(password);
  // };
  // const onChangeConfirmPassword = (confirmPassword) => {
  //   setConfirmPassword(confirmPassword);
  // };
  // const onChangeEmail = (email) => {
  //   setEmail(email);
  // };
  // const onPressRegister = () => {
  //   if (email && password == confirmPassword) navigation.navigate("OTP");
  // };

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
                <Text style={styles.head}>Enter Email To Signup</Text>
                <View style={styles.inputContainer} elevation={2}>
                  {/* For Email ID */}
                  {/* <Text style={styles.emailLabelText}>Enter Email</Text> */}
                  <Text style={styles.errorMsgEmail}>
                    {touched.email && errors.email ? errors.email : ""}
                  </Text>
                  <View style={styles.emailInputStyle}>
                    <TextInput
                      onBlur={handleBlur("email")}
                      placeholder="Enter Email Id"
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
                      placeholder="Enter Password"
                      style={styles.input}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={handleChange("password")}
                      secureTextEntry={true}
                    />
                  </View>
                  {/* For Confirm Password */}
                  {/* <Text style={styles.confirmPasswordLabelText}>Confirm Password</Text> */}
                  <Text style={styles.errorMsgConfirmPass}>
                    {touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ""}
                  </Text>
                  <View style={styles.confirmPasswordInputStyle}>
                    <TextInput
                      onBlur={handleBlur("confirmPassword")}
                      placeholder="Confirm Password"
                      style={styles.input}
                      autoCapitalize="none"
                      value={confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      secureTextEntry={true}
                    />
                  </View>
                  {/* Register Button & Stuff  */}
                </View>
                <View style={styles.bottom}>
                  <TouchableOpacity
                    onPress={isSubmitting ? null : handleSubmit}
                  >
                    <View
                      style={[
                        styles.registerBtn,
                        { backgroundColor: isSubmitting ? "gray" : "#001540" },
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
    minHeight: 40,
    margin: 15,
  },
  // emailLabelText: {
  //   fontFamily: "MontserratRegular",
  //   fontSize: 15,
  //   color: "#001540",
  //   marginTop: -20,
  // },
  passwordInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
    minHeight: 40,
    margin: 15,
  },
  // passwordLabelText: {
  //   fontFamily: "MontserratRegular",
  //   fontSize: 15,
  //   color: "#001540",
  // },
  confirmPasswordInputStyle: {
    borderWidth: 1,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
    minHeight: 40,
    margin: 15,
  },
  // confirmPasswordLabelText: {
  //   fontFamily: "MontserratRegular",
  //   fontSize: 15,
  //   color: "#001540",
  // },
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
