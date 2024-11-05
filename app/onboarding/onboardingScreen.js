import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  BackHandler,
  Platform,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import SnackbarToast from "../../components/snackbarToast";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const { t } = useTranslation();

  function tr(key) {
    return t(`onboardingScreen:${key}`);
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
  const slides = [
    {
      key: "1",
      title: tr("title1"),
      description:
        "Lorem ipsum dolor sit amet consectetur. Duis ifermentum erat egestas at mattis. Tincidunt egestas lectus semetus egestas. Tincidunt felis ",
      image: require("../../assets/images/onboarding1.png"),
    },
    {
      key: "2",
      title: tr("title2"),
      description:
        "Lorem ipsum dolor sit amet consectetur. Duis ifermentum erat egestas at mattis. Tincidunt egestas lectus semetus egestas. Tincidunt felis ",
      image: require("../../assets/images/onboarding2.png"),
    },
    {
      key: "3",
      title: tr("title3"),
      description:
        "Lorem ipsum dolor sit amet consectetur. Duis ifermentum erat egestas at mattis. Tincidunt egestas lectus semetus egestas. Tincidunt felis ",
      image: require("../../assets/images/onboarding3.png"),
    },
  ];

  const onDone = () => {
    navigation.push("auth/loginScreen");
  };
  const onSkip = () => {
    navigation.push("auth/loginScreen");
  };

  const renderSkipButton = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding * 1.5,
        }}
      >
        <Text style={{ ...Fonts.Bold16white }}>{tr("skip")}</Text>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding * 1.5,
        }}
      >
        <Text style={{ ...Fonts.Bold16white }}>{tr("login")}</Text>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding * 1.5,
        }}
      >
        <Text style={{ ...Fonts.Bold16white }}>{tr("next")}</Text>
      </View>
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode="stretch"
          source={item.image}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={[
              Colors.transparent,
              Colors.transparent,
              Colors.greyOpacity90,
              Colors.extraRegularGrey,
            ]}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: Default.fixPadding * 9,
              paddingHorizontal: Default.fixPadding,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold28white }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={3}
              style={{
                ...Fonts.SemiBold14regularGrey,
                textAlign: "center",
                marginTop: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              {item.description}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <AppIntroSlider
        data={slides}
        onDone={onDone}
        onSkip={onSkip}
        showSkipButton={true}
        renderItem={RenderItem}
        renderDoneButton={renderDoneButton}
        renderSkipButton={renderSkipButton}
        renderNextButton={renderNextButton}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: Colors.grey,
        }}
        activeDotStyle={{
          height: 12,
          width: 12,
          borderRadius: 6,
          backgroundColor: Colors.white,
        }}
      />

      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </View>
  );
};

export default OnboardingScreen;
