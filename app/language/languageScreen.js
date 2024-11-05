import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import AwesomeButton from "react-native-really-awesome-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";

const LanguageScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`languageScreen:${key}`);
  }

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage
  );

  async function onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem("@APP:languageCode", lang);
    } catch (error) {
      alert("something went wrong");
    }
  }

  const onDisableHandler = i18n.language === selectedLanguage;

  function languageOpt({ name, lang }) {
    return (
      <TouchableOpacity
        onPress={() => setSelectedLanguage(lang)}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold16black,
          }}
        >
          {name}
        </Text>

        <MaterialCommunityIcons
          name={selectedLanguage === lang ? "record-circle" : "circle-outline"}
          size={28}
          color={selectedLanguage === lang ? Colors.primary : Colors.lightGrey}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 2,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons
            name={isRtl ? "arrow-forward-outline" : "arrow-back-outline"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.Bold20white,
            marginHorizontal: Default.fixPadding * 1.8,
          }}
        >
          {tr("language")}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: Default.fixPadding * 2.7,
          }}
        >
          {languageOpt({ name: "English", lang: "en" })}
          {languageOpt({ name: "हिन्दी", lang: "hi" })}
          {languageOpt({ name: "bahasa Indonesia", lang: "id" })}
          {languageOpt({ name: "عربي", lang: "ar" })}
          {languageOpt({ name: "中国人", lang: "ch" })}
        </View>
      </ScrollView>

      <View
        style={{
          margin: Default.fixPadding * 2,
        }}
      >
        <AwesomeButton
          progress
          height={50}
          progressLoadingTime={1000}
          disabled={onDisableHandler}
          onPress={(next) => {
            return setTimeout(() => {
              next();
              onChangeLang(selectedLanguage);
              navigation.pop();
            }, 1000);
          }}
          raiseLevel={1}
          stretch={true}
          borderRadius={10}
          backgroundShadow={Colors.primary}
          backgroundDarker={Colors.primary}
          backgroundColor={Colors.primary}
        >
          <Text style={{ ...Fonts.ExtraBold18white }}>{tr("update")}</Text>
        </AwesomeButton>
      </View>
    </View>
  );
};

export default LanguageScreen;
