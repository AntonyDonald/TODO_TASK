import { StyleSheet, View } from "react-native";
import React from "react";
import UserList from "../TodoComponents/TaskList";

const MainApp = () => {
  return (
    <View style={styles.container}>
      <UserList />
    </View>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
