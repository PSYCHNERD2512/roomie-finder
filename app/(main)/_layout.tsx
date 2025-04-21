import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import SwipingScreen from "./SwipingScreen";
import SavedScreen from "./SavedScreen";
import EditProfileScreen from "./EditProfileScreen";

const Tab = createBottomTabNavigator();

export default function OnboardingLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Swiping"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF9C01",
        tabBarInactiveTintColor: "#ccc",
        tabBarStyle: {
          backgroundColor: "#1C1C1E",
          borderTopWidth: 0,
          elevation: 10,
          height: 70,

          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Swiping"
        component={SwipingScreen}
        options={{
          tabBarLabel: "Find Roomie",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bookmark" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          tabBarLabel: "Edit Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="edit" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
