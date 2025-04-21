import React, { useEffect } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import "../global.css";

const Index = () => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        // AsyncStorage.removeItem("device-user");
        // AsyncStorage.removeItem("swipingList");
        // AsyncStorage.removeItem("savedList");
        const user = await AsyncStorage.getItem("device-user");
        if (user) {
          console.log(user);
          router.replace("/(main)/SwipingScreen");
        } else {
          router.replace("/(onboarding)/Onboarding");
        }
      } catch (error) {
        console.error("Error checking user in AsyncStorage:", error);
      }
    };

    checkUser();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF9C01" />
        <Text className="text-white text-lg mt-4">Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
