import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; 
import { compareWithAllUsers } from "@/utils/CompareUsers";
import CustomFormField from "@/components/CustomFormField";
import CustomDropdown from "@/components/CustomDropdown";
import CustomMultiselectDropdown from "@/components/CustomMultiselectDropdown";

import { departments } from "@/constants/departments";
import { yearOfStudy } from "@/constants/year-of-study";
import { sleepSchedules } from "@/constants/sleep-schedules";
import { cleanlinessOptions } from "@/constants/cleanliness-options";
import { guestPolicies } from "@/constants/guest-policies";
import { sharingOptions } from "@/constants/sharing-options";
import { socialStyleOptions } from "@/constants/socialstyle-options";
import { musicPreferences } from "@/constants/music-prefs";

import type { UserProfile } from "@/models/user-profile";
import { ProfileEvents, profileEvents } from "@/utils/Event";
import { UserProfileExtended } from "@/models/user-profile-extended";

export default function EditProfileScreen() {
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [sleepSchedule, setSleepSchedule] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [guestPolicy, setGuestPolicy] = useState("");
  const [sharing, setSharing] = useState("");
  const [socialStyle, setSocialStyle] = useState("");
  const [musicTaste, setMusicTaste] = useState<string[]>([]);

  const loadProfile = async () => {
    const storedUser = await AsyncStorage.getItem("device-user");
    if (!storedUser) return;

    const user: UserProfile = JSON.parse(storedUser);
    setFullName(user.fullName || "");
    setDepartment(user.department || "");
    setYear(user.year || "");
    setSleepSchedule(user.sleepSchedule || "");
    setCleanliness(user.cleanliness || "");
    setGuestPolicy(user.guestPolicy || "");
    setSharing(user.sharing || "");
    setSocialStyle(user.socialStyle || "");
    setMusicTaste(user.musicTaste || []);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadProfile();
    }, [])
  );
  useEffect(() => {
    loadProfile();
  }, [error]);


  const updateProfile = async () => {
    if (
      !fullName ||
      !department ||
      !year ||
      !sleepSchedule ||
      !cleanliness ||
      !guestPolicy ||
      !sharing ||
      !socialStyle ||
      musicTaste.length === 0
    ) {
      setError("Error: Please fill out all required fields.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    const updatedProfile: UserProfile = {
      fullName,
      department,
      year,
      sleepSchedule,
      cleanliness,
      guestPolicy,
      sharing,
      socialStyle,
      musicTaste,
    };

    try {
      await AsyncStorage.setItem("device-user", JSON.stringify(updatedProfile));
      console.log("Profile updated successfully.");

      const swipingRaw = await AsyncStorage.getItem("swipingList");
      const savedRaw = await AsyncStorage.getItem("savedList");

      const swipingList: UserProfileExtended[] = swipingRaw
        ? JSON.parse(swipingRaw)
        : [];
      const savedList: UserProfileExtended[] = savedRaw
        ? JSON.parse(savedRaw)
        : [];

      const updatedSwipingList = await compareWithAllUsers(
        updatedProfile,
        swipingList
      );
      const updatedSavedList = await compareWithAllUsers(
        updatedProfile,
        savedList
      );

      await AsyncStorage.setItem(
        "swipingList",
        JSON.stringify(updatedSwipingList)
      );
      await AsyncStorage.setItem("savedList", JSON.stringify(updatedSavedList));

      profileEvents.emit(ProfileEvents.SAVED_PROFILES_UPDATED);
      profileEvents.emit(ProfileEvents.PROFILE_REMOVED);

      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error: Something went wrong while saving. Try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingVertical: 20,
          paddingBottom: 140, 
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-white font-pbold text-xl mb-6 text-center">
          Edit Profile
        </Text>

        <View className="w-full mb-6">
          <CustomFormField
            title="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />
          <CustomDropdown
            title="Major"
            options={departments}
            selectedValue={department}
            onSelect={setDepartment}
            placeholder="Select your major"
          />
          <CustomDropdown
            title="Year of Study"
            options={yearOfStudy}
            selectedValue={year}
            onSelect={setYear}
            placeholder="Select your year of study"
          />
        </View>

        <View className="w-full mb-6">
          <CustomDropdown
            title="Sleep Schedule"
            options={sleepSchedules}
            selectedValue={sleepSchedule}
            onSelect={setSleepSchedule}
            placeholder="Select your sleep schedule"
          />
          <CustomDropdown
            title="Cleanliness Habit"
            options={cleanlinessOptions}
            selectedValue={cleanliness}
            onSelect={setCleanliness}
            placeholder="Select your cleanliness habit"
          />
          <CustomDropdown
            title="Guest Policy"
            options={guestPolicies}
            selectedValue={guestPolicy}
            onSelect={setGuestPolicy}
            placeholder="Select your guest policy"
          />
          <CustomDropdown
            title="Sharing Habit"
            options={sharingOptions}
            selectedValue={sharing}
            onSelect={setSharing}
            placeholder="Select your sharing habit"
          />
        </View>

        <View className="w-full mb-6">
          <CustomDropdown
            title="Social Style"
            options={socialStyleOptions}
            selectedValue={socialStyle}
            onSelect={setSocialStyle}
            placeholder="Select your social style"
          />
          <CustomMultiselectDropdown
            title="Music Taste"
            options={musicPreferences}
            selectedValues={musicTaste}
            onSelect={setMusicTaste}
          />
        </View>

        {error !== "" && (
          <View className="absolute bottom-24 left-0 right-0 items-center">
            <Text className="text-red-500 font-psemibold">{error}</Text>
          </View>
        )}

        <View className="absolute bottom-10 left-0 right-0 px-4 pb-10">
          <TouchableOpacity
            className="bg-green-500 rounded-xl p-4 flex-row items-center justify-center"
            onPress={updateProfile}
          >
            <Text className="text-white font-psemibold">Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
