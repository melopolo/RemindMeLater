
import { UserSettings } from "../types";

const SETTINGS_KEY = "weekly_link_stash_settings";

// Default settings
const defaultSettings: UserSettings = {
  email: "",
  weeklyDigestDay: "Sunday",
  weeklyDigestEnabled: true
};

export const getUserSettings = (): UserSettings => {
  const storedSettings = localStorage.getItem(SETTINGS_KEY);
  if (!storedSettings) {
    return defaultSettings;
  }
  
  try {
    return JSON.parse(storedSettings);
  } catch (error) {
    console.error("Error parsing settings from storage:", error);
    return defaultSettings;
  }
};

export const saveUserSettings = (settings: UserSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
