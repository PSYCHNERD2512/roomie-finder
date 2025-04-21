import { EventEmitter } from "events";

export const profileEvents = new EventEmitter();

export const ProfileEvents = {
  SAVED_PROFILES_UPDATED: "SAVED_PROFILES_UPDATED",
  PROFILE_REMOVED: "PROFILE_REMOVED",
};
