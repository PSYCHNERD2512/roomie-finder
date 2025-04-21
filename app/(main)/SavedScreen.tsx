import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCard from "@/components/CustomCard";
import { UserProfileExtended } from "@/models/user-profile-extended";
import { profileEvents, ProfileEvents } from "@/utils/Event";

const SavedScreen = () => {
  const [savedList, setSavedList] = useState<UserProfileExtended[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    try {
      const data = await AsyncStorage.getItem("savedList");
      if (data) setSavedList(JSON.parse(data));
    } catch (err) {
      console.error("Error fetching saved profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
    const listener = () => fetchSaved();
    profileEvents.on(ProfileEvents.SAVED_PROFILES_UPDATED, listener);

    return () => {
      profileEvents.off(ProfileEvents.SAVED_PROFILES_UPDATED, listener);
    };
  }, []);

  const removeProfile = async (fullName: string) => {
    const updatedSavedList = savedList.filter((p) => p.fullName !== fullName);
    setSavedList(updatedSavedList);
    await AsyncStorage.setItem("savedList", JSON.stringify(updatedSavedList));

    const removedProfile = savedList.find((p) => p.fullName === fullName);
    if (removedProfile) {
      const swipingData = await AsyncStorage.getItem("swipingList");
      const swipingList = swipingData ? JSON.parse(swipingData) : [];
      await AsyncStorage.setItem(
        "swipingList",
        JSON.stringify([...swipingList, removedProfile])
      );
    }

    profileEvents.emit(ProfileEvents.PROFILE_REMOVED);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-secondary font-pbold text-xl">
          Loading saved matches...
        </Text>
      </View>
    );
  }

  if (savedList.length === 0) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-secondary font-pbold text-xl">
          No saved profiles yet
        </Text>
        <Text className="text-gray-100 font-pregular text-center mt-2 px-8">
          Tap the bookmark icon to save profiles. They’ll appear here!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={savedList}
        keyExtractor={(item) => item.fullName}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 80,
        }}
        renderItem={({ item }) => (
          <View className="mb-6">
            <CustomCard {...item} />
            <TouchableOpacity
              className="bg-red-500 rounded-xl p-3 mt-3 flex-row items-center justify-center"
              onPress={() => removeProfile(item.fullName)}
            >
              <FontAwesome name="times" size={16} color="white" />
              <Text className="text-white font-psemibold ml-2">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SavedScreen;
