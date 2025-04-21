import type { UserProfile } from "@/models/user-profile";

export const MatchingUsers = (user1: UserProfile, user2: UserProfile) => {
  let score = 0;
  let maxScore = 0;

  type TraitScore = {
    name: string;
    value: number;
    weight: number;
  };

  const traitScores: TraitScore[] = [];

  const sleepMap = {
    super_early: 0,
    early: 1,
    moderate: 2,
    late: 3,
    night: 4,
    variable: 5,
  };

  const sleepDiff = Math.abs(
    sleepMap[user1.sleepSchedule as keyof typeof sleepMap] -
      sleepMap[user2.sleepSchedule as keyof typeof sleepMap]
  );
  const sleepScore = 1 - sleepDiff / 3;
  traitScores.push({ name: "sleep schedule", value: sleepScore, weight: 25 });

  const cleanOptions = ["flexible", "chill", "moderate", "neat"];
  const cleanDiff = Math.abs(
    cleanOptions.indexOf(user1.cleanliness) -
      cleanOptions.indexOf(user2.cleanliness)
  );
  const cleanScore = 1 - cleanDiff / 3;
  traitScores.push({ name: "cleanliness", value: cleanScore, weight: 15 });

  const guestOptions = ["none", "occasional", "frequent"];
  const guestDiff = Math.abs(
    guestOptions.indexOf(user1.guestPolicy) -
      guestOptions.indexOf(user2.guestPolicy)
  );
  const guestScore = 1 - guestDiff / 2;
  traitScores.push({ name: "guest policy", value: guestScore, weight: 15 });

  const socialOptions = ["quiet", "balanced", "variable", "very_social"];
  const socialDiff = Math.abs(
    socialOptions.indexOf(user1.socialStyle) -
      socialOptions.indexOf(user2.socialStyle)
  );
  const socialScore = 1 - socialDiff / 3;
  traitScores.push({ name: "social style", value: socialScore, weight: 15 });

  const shareOptions = ["none", "basic", "most", "everything"];
  const shareDiff = Math.abs(
    shareOptions.indexOf(user1.sharing) - shareOptions.indexOf(user2.sharing)
  );
  const shareScore = 1 - shareDiff / 3;
  traitScores.push({ name: "sharing habits", value: shareScore, weight: 15 });

  const deptMatch = user1.department === user2.department ? 1 : 0;
  traitScores.push({ name: "department", value: deptMatch, weight: 5 });

  const yearMap = { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, pg: 6, phd: 7 };
  const yearDiff = Math.abs(
    yearMap[user1.year as keyof typeof yearMap] -
      yearMap[user2.year as keyof typeof yearMap]
  );

  const yearScore = 1 - yearDiff / 6;
  traitScores.push({ name: "year", value: yearScore, weight: 5 });

  const set1 = new Set(user1.musicTaste);
  const set2 = new Set(user2.musicTaste);
  const intersection = [...set1].filter((g) => set2.has(g)).length;
  const union = new Set([...user1.musicTaste, ...user2.musicTaste]).size;
  const musicScore = union === 0 ? 0 : intersection / union;
  traitScores.push({ name: "music taste", value: musicScore, weight: 5 });

  for (const trait of traitScores) {
    score += trait.value * trait.weight;
    maxScore += trait.weight;
  }

  const topTraits = [...traitScores]
    .sort((a, b) => b.value * b.weight - a.value * a.weight)
    .slice(0, 2)
    .map((t) => t.name);

  const similarityPercentage = ((score / maxScore) * 100).toFixed(2);

  return {
    similarityPercentage,
    similaritySummary: `You guys are most similar in ${topTraits.join(
      " and "
    )}.`,
  };
};
