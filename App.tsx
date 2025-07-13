import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? "10%" : 0,
      }}
    >
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
