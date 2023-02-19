import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Task from "./Task";
import { useFonts } from "expo-font";
import bg from "../assets/bg.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  const [currentDate, setCurrentDate] = useState();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  useEffect(() => {
    const date = new Date().toLocaleString({
      weekday: "short",
    });
    return setCurrentDate(date);
  });

  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        {/* Today's Tasks */}
        <View style={styles.overlay} />
        <View style={styles.tasksWrapper}>
          <View style={styles.icon}>
            <FontAwesome5
              onPress={() => navigation.navigate("Welcome")}
              name={"user-circle"}
              solid
              color={"#fff"}
              size={30}
            />
          </View>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.day}>{currentDate} </Text>

          <View style={styles.items}>
            {/* Task's Items Go Here */}

            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* Write a Task Section */}

        <View style={styles.wrappItems}>
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="light-content" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    zIndex: -99,
    flex: 1,
    alignSelf: "stretch",
    width: null,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
  tasksWrapper: {
    paddingTop: 120,
    paddingHorizontal: 40,
    fontSize: 30,
  },
  sectionTitle: {
    fontFamily: "MontserratSemiBold",
    color: "white",
    fontSize: 24,
  },
  items: {
    marginTop: 20,
  },
  wrappItems: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 25,
  },
  day: {
    color: "white",
    fontFamily: "MontserratRegular",
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: 25,
    marginRight: 35,
    padding: 20,
    position: "absolute",
  },
});
