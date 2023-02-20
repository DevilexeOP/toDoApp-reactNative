import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { button1 } from "./common/button";
import { useFonts } from "expo-font";

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
        <Text style={styles.head}>Login/Signup To Sync</Text>
        <View style={styles.inputContainer} elevation={1}>
          <Text style={button1} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Login</Text>
          </Text>
          <Text style={button1} onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.buttonText}>Signup</Text>
          </Text>
        </View>
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
  inputContainer: {
    backgroundColor: "#fff0f2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: 350,
    height: 250,
    borderRadius: 5,
  },
  head: {
    marginTop: -50,
    marginBottom: 10,
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    color: "#000e30",
  },
});
