import "@testing-library/jest-native/extend-expect";

// Mock react-native-config
jest.mock("react-native-config", () => ({
  Config: {},
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock expo modules
jest.mock("expo-status-bar", () => ({
  StatusBar: "StatusBar",
}));

// Mock react-native-svg
jest.mock("react-native-svg", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    Svg: ({ children, ...props }) => React.createElement(View, props, children),
    Path: (props) => React.createElement(View, props),
    G: ({ children, ...props }) => React.createElement(View, props, children),
    Circle: (props) => React.createElement(View, props),
    Rect: (props) => React.createElement(View, props),
  };
});

// Mock Expo vector icons
jest.mock("@expo/vector-icons", () => ({
  FontAwesome6: "FontAwesome6",
  Ionicons: "Ionicons",
  MaterialIcons: "MaterialIcons",
}));
