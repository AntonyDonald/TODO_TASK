import { StyleSheet } from "react-native";
import MainApp from "./src/MainApp/MainApp";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <MainApp />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
