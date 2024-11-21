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
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import SnackbarToast from "../../components/snackbarToast";
import IntlPhoneInput from "react-native-intl-phone-input";
import AwesomeButton from "react-native-really-awesome-button";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Api from "../../services/Api.js"; // Adjust path if necessary
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await Api.post("/login", { phone, password });

      if (response.data.success) {

        if (response.data.token) {
          await AsyncStorage.setItem("auth_token", response.data.token);
          navigation.push("(tabs)");
        }
      } else {
        Alert.alert("Error", response.data.errors);
      }
    } catch (error) {
      console.log("Error details:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.errors);
      } else {
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    }
  };

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
            onChangeText={({ dialCode, unmaskedPhoneNumber }) =>
              setPhone(unmaskedPhoneNumber)
            } // capture unmasked phone number
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
              marginBottom: Default.fixPadding * 2,
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

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold16black,
            }}
          >
            {tr("Password")}
          </Text>

          <TextInput
            placeholder={"Enter Your Password"}
            placeholderTextColor={Colors.grey}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={{
              ...Fonts.SemiBold16black,
              paddingVertical: Default.fixPadding * 1.2,
              paddingHorizontal: isRtl ? 0 : Default.fixPadding * 1.2,
              marginBottom: Default.fixPadding * 5,
              marginTop: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.white,
              textAlign: isRtl ? "right" : "left",
              ...Default.shadow,
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
            height={50}
            onPress={handleLogin}
            raiseLevel={1}
            stretch={true}
            borderRadius={10}
            backgroundShadow={Colors.primary}
            backgroundDarker={Colors.primary}
            backgroundColor={Colors.primary}
          >
            <Text style={{ ...Fonts.ExtraBold18white }}>{tr("login")}</Text>
          </AwesomeButton>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ ...Fonts.Regular14 }}>
             Don't have an account? 
            </Text>
            <TouchableOpacity  onPress={() =>
                  navigation.push("auth/registerScreen")}>
              <Text style={{ color: Colors.linkColor, fontWeight: 'bold',marginLeft: 4,  ...Fonts.Regular16 }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
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
