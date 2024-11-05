import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import MyStatusBar from "../components/myStatusBar";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Default, Fonts } from "../constants/styles";
import { useNavigation } from "expo-router";

const Index = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.push("onboarding/onboardingScreen");
  }, 2000);
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />

      <ImageBackground
        source={require("../assets/images/splashImage.png")}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={[Colors.blackOpacity50, Colors.black]}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../assets/images/appIcon.png")}
            style={{ width: 66, height: 66, resizeMode: "contain" }}
          />
          <Text
            style={{
              ...Fonts.SemiBold32white,
              marginTop: Default.fixPadding * 0.7,
            }}
          >
            StepUp
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Index;
