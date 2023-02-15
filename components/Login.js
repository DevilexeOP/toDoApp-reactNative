import { StyleSheet, Text, View } from "react-native";
import React from "react";
import img from "../../toDoList/assets/welcome.jpg";
import { useFonts } from "expo-font";

const Login = () => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View styles={styles.container}>
      <Image source={img} style={styles.bg} />
      <View styles={styles.container1}>
        <Text style={styles.head}>Welcome Back !</Text>
        <Text style={styles.login}>Login </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    zIndex: -1,
  },
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  head: {
    color: "white",
    fontFamily: "MontserratSemiBold",
  },
  login: {
    color: "white",
    fontFamily: "MontserratSemiBold",
  },
});
