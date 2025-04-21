import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import CustomButton from "@/components/CustomButton";
import CustomFormField from "@/components/CustomFormField";
import "../../global.css";
import CustomDropdown from "@/components/CustomDropdown";
import { useState } from "react";
import { departments } from "@/constants/departments";
import { yearOfStudy } from "@/constants/year-of-study";
import { sleepSchedules } from "@/constants/sleep-schedules";
import { cleanlinessOptions } from "@/constants/cleanliness-options";
import { guestPolicies } from "@/constants/guest-policies";
import { sharingOptions } from "@/constants/sharing-options";
import { socialStyleOptions } from "@/constants/socialstyle-options";
import { musicPreferences } from "@/constants/music-prefs";
import CustomMultiselectDropdown from "@/components/CustomMultiselectDropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { UserProfile } from "@/models/user-profile";
import { Redirect, router } from "expo-router";

export default function Onboarding() {
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(1);
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [sleepSchedule, setSleepSchedule] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [guestPolicy, setGuestPolicy] = useState("");
  const [sharing, setSharing] = useState("");
  const [socialStyle, setSocialStyle] = useState("");
  const [musicTaste, setMusicTaste] = useState<string[]>([]);
  const nextScreen = async (currentProgress: number) => {
    if (currentProgress === 1) {
      if (fullName !== "" && department !== "" && year !== "") {
        setProgress(progress + 1);
        setError("");
      } else {
        setError("Please fill out all required fields.");
      }
    }
    if (currentProgress === 2) {
      if (
        sleepSchedule !== "" &&
        cleanliness !== "" &&
        guestPolicy !== "" &&
        sharing !== ""
      ) {
        setProgress(progress + 1);
        setError("");
      } else {
        setError("Please fill out all required fields.");
      }
    }
    if (currentProgress === 3) {
      if (socialStyle !== "" && musicTaste.length > 0) {
        setError("");

        const userProfile: UserProfile = {
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
          await AsyncStorage.setItem(
            "device-user",
            JSON.stringify(userProfile)
          );
          router.replace("/(main)/SwipingScreen");
        } catch (e) {
          console.error("Failed to save user:", e);
          setError("Something went wrong while saving. Try again.");
        }
      } else {
        setError("Please fill out all required fields.");
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ProgressBar progress={progress / 3} color="#FF9C01" className="w-full" />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",

          paddingVertical: 20,
          height: "100%",
        }}
      >
        {progress === 1 && (
          <View>
            <Text className="text-white font-pbold text-xl mb-6 text-center">
              Basic Information
            </Text>
            {error !== "" && (
              <Text className="text-red-500 text-sm mb-4 text-center">
                {error}
              </Text>
            )}

            <CustomFormField
              title="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder=""
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
        )}
        {progress === 2 && (
          <View>
            <Text className="text-white font-pbold text-xl mb-6 text-center">
              Lifestyle & Habits
            </Text>
            {error !== "" && (
              <Text className="text-red-500 text-sm mb-4 text-center">
                {error}
              </Text>
            )}
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
        )}
        {progress === 3 && (
          <View>
            <Text className="text-white font-pbold text-xl mb-6 text-center">
              Personality & Preferences
            </Text>
            {error !== "" && (
              <Text className="text-red-500 text-sm mb-4 text-center">
                {error}
              </Text>
            )}
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
        )}
        <CustomButton onPress={() => nextScreen(progress)} />
      </ScrollView>
    </SafeAreaView>
  );
}
