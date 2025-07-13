import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ExploreScreen from "../screens/ExploreScreen";
import SearchScreen from "../screens/SearchScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import { RootStackParamList } from "../types/navigation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Explore"
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: "push",
        }}
      >
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            gestureEnabled: false,
            gestureDirection: "horizontal",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="BookDetail"
          component={BookDetailScreen}
          options={{
            gestureEnabled: false,
            gestureDirection: "horizontal",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
