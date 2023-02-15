import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import bg from "../assets/bg.png";
import { button1 } from "./common/button";
import { useFonts } from "expo-font";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Welcome = (navigation) => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View styles={styles.container}>
      <View style={styles.icon}>
        <FontAwesome5
          onPress={() => navigation.navigate("Home")}
          name={"arrow-left"}
          solid
          color={"#000000"}
          size={30}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  icon: {
    alignSelf: "flex-start",
    marginTop: 25,
    marginRight: 35,
    padding: 20,
    position: "absolute",
  },
});
