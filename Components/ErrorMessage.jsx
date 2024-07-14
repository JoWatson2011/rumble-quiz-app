import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ErrorMessage({ text }) {
  return (
    <View>
      <Text style={styles.error}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
