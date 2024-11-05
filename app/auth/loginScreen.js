import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  BackHandler,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import SnackbarToast from "../../components/snackbarToast";
import IntlPhoneInput from "react-native-intl-phone-input";
import AwesomeButton from "react-native-really-awesome-button";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`loginScreen:${key}`);
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
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <ImageBackground
          resizeMode="stretch"
          source={require("../../assets/images/login.png")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: width,
            height: 230,
          }}
        >
          <Image
            source={require("../../assets/images/appIcon.png")}
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
        </ImageBackground>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 3,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 5,
          }}
        >
          <Text
            style={{
              ...Fonts.Bold18black,
              marginBottom: Default.fixPadding * 0.5,
            }}
          >
            {tr("welcome")}
          </Text>
          <Text style={{ ...Fonts.Bold18black }}>{tr("loginAccount")}</Text>
        </View>

        <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold16black,
            }}
          >
            {tr("mobileNumber")}
          </Text>

          <IntlPhoneInput
            defaultCountry="IN"
            closeText={tr("close")}
            filterText={tr("search")}
            placeholder={tr("enterMobileNumber")}
            placeholderTextColor={Colors.grey}
            flagStyle={{ width: 0, height: 0 }}
            modalCountryItemCountryNameStyle={{ ...Fonts.SemiBold15black }}
            closeButtonStyle={{
              ...Fonts.SemiBold15black,
            }}
            inputProps={{ selectionColor: Colors.primary }}
            dialCodeTextStyle={{
              ...Fonts.SemiBold15black,
              paddingRight: Default.fixPadding * 1.2,
            }}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 1.2,
              marginBottom: Default.fixPadding * 5,
              marginTop: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
            phoneInputStyle={{
              ...Fonts.SemiBold16black,
              textAlign: isRtl ? "right" : "left",
              paddingHorizontal: isRtl ? 0 : Default.fixPadding * 1.2,
              borderLeftWidth: 2,
              borderLeftColor: Colors.lightGrey,
            }}
          />
        </View>

        <View
          style={{
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <AwesomeButton
            progress
            height={50}
            progressLoadingTime={1000}
            onPress={(next) => {
              setTimeout(() => {
                next();
                navigation.push("auth/registerScreen");
              }, 1000);
            }}
            raiseLevel={1}
            stretch={true}
            borderRadius={10}
            backgroundShadow={Colors.primary}
            backgroundDarker={Colors.primary}
            backgroundColor={Colors.primary}
          >
            <Text style={{ ...Fonts.ExtraBold18white }}>{tr("login")}</Text>
          </AwesomeButton>
        </View>
      </ScrollView>
      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </View>
  );
};

export default LoginScreen;
