import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCard from "@/components/CustomCard";
import { UserProfileExtended } from "@/models/user-profile-extended";
import { compareWithAllUsers } from "@/utils/CompareUsers";
import { profileEvents, ProfileEvents } from "@/utils/Event";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SWIPE_THRESHOLD = 30;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SwipingScreen = () => {
  const [swipingList, setSwipingList] = useState<UserProfileExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const logBothLists = async () => {
    const savedRaw = await AsyncStorage.getItem("savedList");
    const swipingRaw = await AsyncStorage.getItem("swipingList");

    const savedList = savedRaw ? JSON.parse(savedRaw) : [];
    const swipingList = swipingRaw ? JSON.parse(swipingRaw) : [];

    console.log(
      "🔥 Saved List:",
      savedList.map((user: UserProfileExtended) => ({
        name: user.fullName,
        percentage: user.similarityPercentage,
      }))
    );

    console.log(
      "🌀 Swiping List:",
      swipingList.map((user: UserProfileExtended) => ({
        name: user.fullName,
        percentage: user.similarityPercentage,
      }))
    );
  };

  const fetchSwipingList = async () => {
    const storedUser = await AsyncStorage.getItem("device-user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) return;

    const storedSwipingList = await AsyncStorage.getItem("swipingList");

    if (storedSwipingList) {
      setSwipingList(JSON.parse(storedSwipingList));
    } else {
      const results = await compareWithAllUsers(user);
      await AsyncStorage.setItem("swipingList", JSON.stringify(results));
      setSwipingList(results);
    }

    setLoading(false);
    await logBothLists();
  };

  useEffect(() => {
    fetchSwipingList();
    const listener = () => fetchSwipingList();
    profileEvents.on(ProfileEvents.PROFILE_REMOVED, listener);
    return () => {
      profileEvents.off(ProfileEvents.PROFILE_REMOVED, listener);
    };
  }, []);

  const handleLike = async () => {
    console.log("Liked");

    const likedProfile = swipingList[0];
    const storedSaved = await AsyncStorage.getItem("savedList");
    const savedList = storedSaved ? JSON.parse(storedSaved) : [];
    const newSwipingList = swipingList.slice(1);
    setSwipingList(newSwipingList);
    await AsyncStorage.setItem("swipingList", JSON.stringify(newSwipingList));
    const updatedSaved = [...savedList, { ...likedProfile, saved: true }];
    await AsyncStorage.setItem("savedList", JSON.stringify(updatedSaved));

    profileEvents.emit(ProfileEvents.SAVED_PROFILES_UPDATED);
    await wait(1000);
  };

  const handlePass = async () => {
    console.log("Passed");
    const passedProfile = swipingList[0];
    const newList = swipingList.slice(1);

    newList.push(passedProfile);
    setSwipingList(newList);
    await AsyncStorage.setItem("swipingList", JSON.stringify(newList));
    await wait(1000);
  };

  const resetCardPosition = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      },
      onEnd: (event) => {
        if (event.translationX > SWIPE_THRESHOLD) {
          runOnJS(handleLike)();

          runOnJS(resetCardPosition)();
        } else if (event.translationX < -SWIPE_THRESHOLD) {
          runOnJS(handlePass)();
          runOnJS(resetCardPosition)();
        } else {
          runOnJS(resetCardPosition)();
        }
      },
    });
  const cardStyle = useAnimatedStyle(() => {
    const rotate = translateX.value / 20;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-secondary font-pbold text-xl">Loading...</Text>
      </View>
    );
  }

  if (swipingList.length == 0) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-secondary font-pbold text-xl">
          No more profiles to show
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-primary px-4">
        {/* Card Container */}
        <View className="flex-1 justify-center items-center">
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={[cardStyle]}
              className={"w-full items-center"}
            >
              <CustomCard
                {...{
                  ...swipingList[0],
                  similaritySummary:
                    swipingList[0].similaritySummary.toString(),
                }}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default SwipingScreen;
