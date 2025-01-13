import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";

const Fallback = () => {
  return (
    <View style={styles.fallbackContainer}>
      <Image
        source={require("../../assets/todo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>No tasks yet. Start adding your tasks!</Text>
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({
  fallbackContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c757d",
  },
});
