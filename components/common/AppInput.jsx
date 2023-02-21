import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

const AppInput = ({ name, placeholder, ...rest }) => {
  const {
    errors,
    values,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <>
      {error && isInputTouched ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <TextInput
        value={value}
        placeholder={placeholder}
        style={styles.input}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        {...rest}
      />
    </>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 13,
    borderColor: "#dbd9d9",
    borderRadius: 5,
    minWidth: 300,
    minHeight: 40,
    margin: 15,
  },
  error: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    left: 30,
  },
});
