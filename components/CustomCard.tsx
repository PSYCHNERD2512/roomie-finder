import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getLabelForValue } from "@/utils/getLabelForValue";
import { ProgressBar } from "react-native-paper";
import { departments } from "@/constants/departments";
import { yearOfStudy } from "@/constants/year-of-study";
import { sleepSchedules } from "@/constants/sleep-schedules";
import { cleanlinessOptions } from "@/constants/cleanliness-options";
import { guestPolicies } from "@/constants/guest-policies";
import { sharingOptions } from "@/constants/sharing-options";
import { socialStyleOptions } from "@/constants/socialstyle-options";
import { musicPreferences } from "@/constants/music-prefs";

interface CustomCardProps {
  fullName: string;
  similarityPercentage: number;
  department: string;
  year: string;
  guestPolicy: string;
  sharing: string;
  sleepSchedule: string;
  cleanliness: string;
  socialStyle: string;
  musicTaste: string[];
  similaritySummary: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  fullName,
  similarityPercentage,
  department,
  year,
  guestPolicy,
  sharing,
  sleepSchedule,
  cleanliness,
  socialStyle,
  musicTaste,
  similaritySummary,
}) => {
  const DetailItem = ({
    label,
    icon,
  }: {
    label: string;
    icon: React.ComponentProps<typeof FontAwesome>["name"];
  }) => (
    <View className="flex-row items-center">
      <FontAwesome name={icon} size={16} color="#FF9C01" className="mr-3" />
      <Text className="text-white font-pregular text-lg">{label}</Text>
    </View>
  );

  return (
    <View className="p-6 bg-black-100 rounded-2xl">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white font-pbold text-2xl">{fullName}</Text>
        <Text className="text-secondary font-psemibold text-lg">
          {similarityPercentage}% match
        </Text>
      </View>
      <View>
        <ProgressBar
          progress={similarityPercentage / 100} // Set progress based on similarityPercentage
          color="#FF9C01"
          style={{ height: 8, borderRadius: 4, marginBottom: 16 }}
        />
      </View>
      <View className="h-px bg-gray-800 w-full mb-4" />
      <View className="space-y-4">
        <DetailItem
          label={getLabelForValue(department, departments)}
          icon="graduation-cap"
        />
        <DetailItem
          label={getLabelForValue(year, yearOfStudy)}
          icon="calendar"
        />
        <DetailItem
          label={getLabelForValue(guestPolicy, guestPolicies)}
          icon="user-plus"
        />
        <DetailItem
          label={getLabelForValue(sharing, sharingOptions)}
          icon="share-alt"
        />
        <DetailItem
          label={getLabelForValue(sleepSchedule, sleepSchedules)}
          icon="bed"
        />
        <DetailItem
          label={getLabelForValue(cleanliness, cleanlinessOptions)}
          icon="bath"
        />
        <DetailItem
          label={getLabelForValue(socialStyle, socialStyleOptions)}
          icon="users"
        />
      </View>
      

  
      <View className="mt-6">
        <Text className="text-white font-psemibold text-lg mb-2">
          Music Preferences:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {musicTaste.length > 0 ? (
            musicTaste.map((pref, index) => (
              <View
                key={index}
                className="bg-[#FF9C01] py-1 px-3 rounded-full border border-[#FF9C01] mb-2"
              >
                <Text className="text-black font-pregular">{pref}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-100 font-pregular">
              No preferences listed
            </Text>
          )}
        </View>
      </View>
      <View className="mt-6">
        <Text className="text-white font-psemibold text-lg mb-2">
          Why you might match:
        </Text>
        <Text className="text-gray-100 font-pregular">{similaritySummary}</Text>
      </View>
    </View>
  );
};

export default CustomCard;
