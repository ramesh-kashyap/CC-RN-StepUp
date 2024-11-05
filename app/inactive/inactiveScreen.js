import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const InactiveScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`inactiveScreen:${key}`);
  }

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
          alignItems: "center",
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 145,
            height: 145,
            borderRadius: 73,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <Image
              source={require("../../assets/images/medal2.png")}
              style={{ width: 61, height: 61, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.Bold20grey,
                marginTop: Default.fixPadding * 0.6,
              }}
            >
              10K
            </Text>
          </View>
        </View>

        <Text
          style={{
            ...Fonts.Bold16grey,
            textAlign: "center",
            marginVertical: Default.fixPadding * 2,
          }}
        >
          {tr("inActiveNow")}
        </Text>
      </View>
    </View>
  );
};

export default InactiveScreen;
