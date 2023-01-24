import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationParams } from "./config";
import { AuthScreen, MapScreen } from "_/presentation/screens";

const Stack = createNativeStackNavigator<NavigationParams>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Inital"} component={AuthScreen} />
        <Stack.Screen name={"Map"} component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
