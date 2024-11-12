import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { withTranslation } from "react-i18next";
import { LogBox } from "react-native";
import { Stack } from "expo-router";
import i18n from "../languages/index"; //don't remove this line

LogBox.ignoreAllLogs();

const MainNavigation = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="onboarding/onboardingScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="auth/loginScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="auth/registerScreen" />
      <Stack.Screen name="auth/otpScreen" />
      <Stack.Screen name="auth/setGoalScreen" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="notification/notificationScreen" />
      <Stack.Screen name="editProfile/inviteScreen" />
      <Stack.Screen name="editProfile/teamReport" />
      <Stack.Screen name="awardsCategory/awardsCategoryScreen" /> 
      <Stack.Screen name="deposit/deposit" /> 
      <Stack.Screen name="achieveGoal/achieveGoalScreen" />
      <Stack.Screen name="inactive/inactiveScreen" />
      <Stack.Screen name="privacyPolicy/privacyPolicyScreen" />
      <Stack.Screen name="termsAndCondition/termsAndConditionScreen" />
      <Stack.Screen name="editProfile/editProfileScreen" />
      <Stack.Screen name="language/languageScreen" />
      <Stack.Screen name="reminder/reminderScreen" />
      <Stack.Screen name="addReminder/addReminderScreen" />
      <Stack.Screen name="instructions/instructionsScreen" />
      <Stack.Screen name="giveRate/giveRateScreen" />
      <Stack.Screen name="history/historyScreen" />
    </Stack>
  );
};

const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
})(MainNavigation);

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Bold: require("../assets/fonts/Mulish-Bold.ttf"),
    SemiBold: require("../assets/fonts/Mulish-SemiBold.ttf"),
    Regular: require("../assets/fonts/Mulish-Regular.ttf"),
    Medium: require("../assets/fonts/Mulish-Medium.ttf"),
    ExtraBold: require("../assets/fonts/Mulish-ExtraBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <ReloadAppOnLanguageChange />;
}
