import { MatchingUsers } from "./MatchingUsers";
import { dummyUsers } from "../data/Dummy";
import type { UserProfile } from "@/models/user-profile";

export const compareWithAllUsers = async (
  user: UserProfile,
  users: UserProfile[] = dummyUsers
): Promise<any[]> => {
  return new Promise((resolve) => {
    const matches = [];

    for (let i = 0; i < users.length; i++) {
      const otherUser = users[i];

      const otherUserProfile: UserProfile = {
        fullName: otherUser.fullName,
        department: otherUser.department,
        year: otherUser.year,
        sleepSchedule: otherUser.sleepSchedule,
        cleanliness: otherUser.cleanliness,
        guestPolicy: otherUser.guestPolicy,
        sharing: otherUser.sharing,
        socialStyle: otherUser.socialStyle,
        musicTaste: otherUser.musicTaste,
      };

      const { similarityPercentage, similaritySummary } = MatchingUsers(
        user,
        otherUserProfile
      );

      matches.push({
        fullName: otherUser.fullName,
        similarityPercentage: parseFloat(similarityPercentage),
        similaritySummary: similaritySummary,
        department: otherUser.department,
        year: otherUser.year,
        sleepSchedule: otherUser.sleepSchedule,
        cleanliness: otherUser.cleanliness,
        guestPolicy: otherUser.guestPolicy,
        sharing: otherUser.sharing,
        socialStyle: otherUser.socialStyle,
        musicTaste: otherUser.musicTaste,
      });
    }

    matches.sort((a, b) => b.similarityPercentage - a.similarityPercentage);

    resolve(matches);
  });
};
