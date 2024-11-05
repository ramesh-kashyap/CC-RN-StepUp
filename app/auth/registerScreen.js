import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import AwesomeButton from "react-native-really-awesome-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const RegisterScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
  }

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            zIndex: 1,
            position: "absolute",
            right: isRtl ? 0 : null,
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 1.2,
          }}
        >
          <Ionicons
            name={isRtl ? "arrow-forward-outline" : "arrow-back-outline"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <View>
            <Image
              resizeMode="stretch"
              source={require("../../assets/images/login.png")}
              style={{
                width: width,
                height: 230,
              }}
            />

            <View
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
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
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: Default.fixPadding * 3,
              marginBottom: Default.fixPadding * 4,
              marginHorizontal: Default.fixPadding * 2,
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
            <Text style={{ ...Fonts.Bold18black }}>
              {tr("registerAccount")}
            </Text>
          </View>

          <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold16black,
              }}
            >
              {tr("userName")}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.textInputCard,
              }}
            >
              <Ionicons name="person-outline" color={Colors.grey} size={18} />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={tr("enterName")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.SemiBold16black,
                  flex: 1,
                  textAlign: isRtl ? "right" : "left",
                  marginHorizontal: Default.fixPadding * 1.2,
                }}
              />
            </View>

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold16black,
              }}
            >
              {tr("emailAddress")}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.textInputCard,
              }}
            >
              <Ionicons name="mail-outline" color={Colors.grey} size={18} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder={tr("enterEmailAddress")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.SemiBold16black,
                  flex: 1,
                  textAlign: isRtl ? "right" : "left",
                  marginHorizontal: Default.fixPadding * 1.2,
                }}
              />
            </View>

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold16black,
              }}
            >
              {tr("mobileNumber")}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.textInputCard,
              }}
            >
              <Ionicons
                name="phone-portrait-outline"
                color={Colors.grey}
                size={18}
              />
              <TextInput
                maxLength={10}
                value={number}
                onChangeText={setNumber}
                keyboardType="number-pad"
                placeholder={tr("enterMobileNumber")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.SemiBold16black,
                  flex: 1,
                  textAlign: isRtl ? "right" : "left",
                  marginHorizontal: Default.fixPadding * 1.2,
                }}
              />
            </View>

            <View
              style={{
                marginTop: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 2,
              }}
            >
              <AwesomeButton
                progress
                height={50}
                progressLoadingTime={1000}
                onPress={(next) => {
                  setTimeout(() => {
                    next();
                    navigation.push("auth/otpScreen");
                  }, 1000);
                }}
                raiseLevel={1}
                stretch={true}
                borderRadius={10}
                backgroundShadow={Colors.primary}
                backgroundDarker={Colors.primary}
                backgroundColor={Colors.primary}
              >
                <Text style={{ ...Fonts.ExtraBold18white }}>
                  {tr("register")}
                </Text>
              </AwesomeButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textInputCard: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
