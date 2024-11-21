import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,Alert
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import AwesomeButton from "react-native-really-awesome-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OtpInput } from "react-native-otp-entry";
import { useLocalSearchParams } from 'expo-router';
import Api from '../../services/Api';
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const OtpScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`otpScreen:${key}`);
  }

  const [timer, setTimer] = useState(59);
  const [intervalStop, setIntervalStop] = useState(true);

  const { bep, email, name , trc} = useLocalSearchParams();


  const intervalRef = useRef();

  useEffect(() => {
    if (intervalStop) {
      intervalRef.current = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(intervalRef.current);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timer, intervalStop]);

  const formatSecondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleTextChange = async (otp) => {
    if (otp.length === 4) {
      setIntervalStop(false);
      try {
        const response = await Api.post("/updateProfile", { bep, trc, name, email,code:otp });
  
        console.log(response.data);
        if (response.data.success) {
  
          navigation.push("home/homeScreen");

        } else {
          Alert.alert("Error", "Invalid OTP");
        }
      } catch (error) {
        console.log("Error details:", error);
        if (error.response) {
          Alert.alert("Error", error.response.data.error);
        } else {
          Alert.alert("Error", "An error occurred. Please try again.");
        }
      }


    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            setIntervalStop(false);
            navigation.pop();
          }}
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
              marginTop: Default.fixPadding * 2,
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
              {tr("verification")}
            </Text>
            <Text style={{ ...Fonts.SemiBold14grey, textAlign: "center" }}>
              {tr("enterOtp")}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 6,
              marginBottom: Default.fixPadding * 4,
            }}
          >
            <OtpInput
              numberOfDigits={4}
              onTextChange={handleTextChange}
              theme={{
                containerStyle: {
                  marginHorizontal: Default.fixPadding * 6,
                  marginVertical: Default.fixPadding * 5,
                },
                pinCodeContainerStyle: {
                  borderWidth: 0,
                  width: 49,
                  height: 49,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                },
                pinCodeTextStyle: { ...Fonts.SemiBold20black },
                focusedPinCodeContainerStyle: {
                  borderWidth: 0,
                  borderRadius: 10,
                },
                focusStickStyle: { backgroundColor: Colors.primary },
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: Default.fixPadding * 1.7,
              paddingVertical: Default.fixPadding * 0.5,
              marginBottom: Default.fixPadding * 4,
              borderRadius: 40,
              backgroundColor: Colors.regularGreen,
            }}
          >
            <Text style={{ ...Fonts.Bold16primary }}>
              {formatSecondsToTime(timer)}
            </Text>
          </View>

          <View
            style={{
              marginBottom: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <AwesomeButton
             
              height={50}
             
              
              raiseLevel={1}
              stretch={true}
              borderRadius={10}
              backgroundShadow={Colors.primary}
              backgroundDarker={Colors.primary}
              backgroundColor={Colors.primary}
            >
              <Text style={{ ...Fonts.ExtraBold18white }}>{tr("verify")}</Text>
            </AwesomeButton>
          </View>

          <Text
            style={{
              ...Fonts.SemiBold16black,
              textAlign: "center",
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {tr("receiveCode")}
            <Text
              onPress={() => {
                if (timer === 0) {
                  setTimer(59);
                }
              }}
              style={{ ...Fonts.Bold16primary }}
            >{` ${tr("resend")}`}</Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default OtpScreen;
