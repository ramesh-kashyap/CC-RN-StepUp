import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Share,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const AchieveGoalScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`achieveGoalScreen:${key}`);
  }

  const shareMessage = () => {
    Share.share({
      message: "StepUp",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{
          alignSelf: isRtl ? "flex-end" : "flex-start",
          marginHorizontal: Default.fixPadding * 2,
          marginVertical: Default.fixPadding * 1.2,
        }}
      >
        <Ionicons
          name={isRtl ? "arrow-forward-outline" : "arrow-back-outline"}
          size={25}
          color={Colors.black}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 145,
              height: 145,
              borderRadius: 73,
              borderWidth: 12,
              borderColor: Colors.white,
              backgroundColor: Colors.lightGreen,
              ...Default.shadow,
            }}
          >
            <Image
              source={require("../../assets/images/medal.png")}
              style={{ width: 61, height: 61, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.Bold20white,
                marginTop: Default.fixPadding * 0.6,
              }}
            >
              10K
            </Text>
          </View>

          <Text
            style={{
              ...Fonts.Bold22black,
              marginTop: Default.fixPadding * 4,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("great")}
          </Text>
          <Text style={{ ...Fonts.Bold20black }}>{tr("achieved")}</Text>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={shareMessage}>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold18primary, overflow: "hidden" }}
          >
            {tr("share")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AchieveGoalScreen;

const styles = StyleSheet.create({
  shareBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding * 5,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
