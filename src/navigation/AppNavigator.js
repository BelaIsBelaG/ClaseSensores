import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import SensorScreen from "../screens/SensorScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTitleStyle: { fontWeight: "700" },
                    headerBackTitleVisible: false,
                }}
            >

                <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Clase sensores" }} />
                <Stack.Screen name="Camera" component={CameraScreen} options={{ title: "Cámara" }} />
                <Stack.Screen name="Sensor" component={SensorScreen} options={{ title: "Sensores" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}