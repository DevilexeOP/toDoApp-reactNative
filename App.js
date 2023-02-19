import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./components/Welcome";
import HomeScreen from "./components/Home";
import LoginScreen from "./components/Login";
import OTPscreen from "./components/OTP";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            title: "Welcome !",
            headerTransparent: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login !",
            headerTransparent: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPscreen}
          options={{
            title: "OTP !",
            headerTransparent: true,
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
