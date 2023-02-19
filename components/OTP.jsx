import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useFonts } from "expo-font";
import { TextInput } from "react-native-gesture-handler";

const inputs = Array(6).fill("");
let newInputIndex = 0;

const isObjValid = (obj) => {
  Object.values(obj).every((val) => val.trim());
};

const OTPscreen = ({ navigation }) => {
  const input = useRef();
  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" });
  const [nextInputIndex, setNextInputIndex] = useState(0);

  const handleChangeText = (text, index) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOTP(newOTP);
    const lastInputIndex = inputs.length - 1;
    if (!text) {
      newInputIndex = index === 0 ? 0 : index - 1;
    } else {
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    }
    setNextInputIndex(newInputIndex);
  };
  useEffect(() => {
    input.current?.focus();
  }, [nextInputIndex]);

  const submitOTP = () => {
    Keyboard.dismiss();
    if (isObjValid(OTP)) {
      let val = " ";
      Object.values(OTP).forEach((v) => {
        val += v;
      });
    }
  };

  const submittedOTP = () => {
    if (OTP) navigation.navigate("Home");
  };

  const [fontsLoaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Enter OTP to Login</Text>
      <View style={styles.innerContainer}>
        {inputs.map((inp, index) => {
          return (
            <View style={styles.inputContainer} key={index.toString()}>
              <TextInput
                value={OTP[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                placeholder="___"
                keyboardType="numeric"
                maxLength={1}
                style={styles.input}
                ref={nextInputIndex === index ? input : null}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.outContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={submittedOTP}>
          <Text style={styles.submitText}>Submit </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPscreen;

const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    marginTop: -300,
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "blue",
  },
  innerContainer: {
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-evenly",
  },
  inputContainer: {
    marginTop: 15,
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
  },
  outContainer: {
    margin: 15,
  },
  submitButton: {
    backgroundColor: "#0062c9",
    minWidth: 180,
    minHeight: 40,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
  },
});
