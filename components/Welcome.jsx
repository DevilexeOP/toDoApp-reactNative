import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import bg from "../assets/bg.png";
import { button1 } from "./common/button";
import { useFonts } from "expo-font";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LoginScreen from "./Login";

const Welcome = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#e6e1e1" }}>
      <View style={styles.container}>
        <Text style={styles.head}>Login To Sync</Text>
        <Text style={button1} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Login</Text>
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  head: {
    marginTop: -150,
    marginBottom: 10,
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    color: "#000e30",
  },
});
