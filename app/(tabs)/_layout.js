import React, { useState, useCallback } from "react";
import { BackHandler, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SnackbarToast from "../../components/snackbarToast";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

const BottomTab = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`bottomTab:${key}`);
  }

  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissVisibleToast = () => setVisibleToast(false);

  const [exitApp, setExitApp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === "android") {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setVisibleToast(true);
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [exitApp])
  );

  const title1 = isRtl ? tr("profile") : tr("home");
  const title2 = isRtl ? tr("home") : tr("profile");
  const title3 = isRtl ? tr("awards") : tr("report");
  const title4 = isRtl ? tr("report") : tr("awards");

  return (
    <>
      <Tabs
        initialRouteName="home/homeScreen"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            justifyContent: "center",
            alignItems: "center",
            padding: Default.fixPadding * 0.5,
            height: Platform.OS === "ios" ? 65 : 60,
            backgroundColor: Colors.white,
            borderTopWidth: null,
            ...Default.shadow,
          },
          tabBarItemStyle: {
            height: 55,
            paddingHorizontal: Default.fixPadding * 0.5,
          },
          tabBarLabelStyle: {
            fontFamily: "Bold",
            fontSize: 15,
            paddingBottom: Default.fixPadding * 0.5,
          },
          tabBarInactiveTintColor: Colors.grey,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ focused }) => {
            if (route.name === "home/homeScreen") {
              return (
                <Ionicons
                  name={"home-outline"}
                  size={20}
                  color={focused ? Colors.primary : Colors.grey}
                />
              );
            } else if (route.name === "report/reportScreen") {
              return (
                <MaterialCommunityIcons
                  name={"chart-line"}
                  size={20}
                  color={focused ? Colors.primary : Colors.grey}
                />
              );
            } else if (route.name === "awards/awardsScreen") {
              return (
                <Ionicons
                  name={"trophy-outline"}
                  size={20}
                  color={focused ? Colors.primary : Colors.grey}
                />
              );
            } else if (route.name === "profile/profileScreen") {
              return (
                <Ionicons
                  name={"person-outline"}
                  size={20}
                  color={focused ? Colors.primary : Colors.grey}
                />
              );
            }
          },
        })}
      >
        <Tabs.Screen
          name={isRtl ? "profile/profileScreen" : "home/homeScreen"}
          options={{
            title: title1,
          }}
        />
        <Tabs.Screen
          name={isRtl ? "awards/awardsScreen" : "report/reportScreen"}
          options={{
            title: title3,
          }}
        />

        <Tabs.Screen
          name={isRtl ? "report/reportScreen" : "awards/awardsScreen"}
          options={{
            title: title4,
          }}
        />
        <Tabs.Screen
          name={isRtl ? "home/homeScreen" : "profile/profileScreen"}
          options={{
            title: title2,
          }}
        />
      </Tabs>

      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </>
  );
};

export default BottomTab;
