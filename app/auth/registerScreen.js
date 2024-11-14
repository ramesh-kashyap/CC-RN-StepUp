import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,Alert
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import AwesomeButton from "react-native-really-awesome-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import Api from '../../services/Api.js'; // Adjust path if necessary


const { width } = Dimensions.get("window");

const RegisterScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
  }

  
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [referral, setReferral] = useState();

  const handleRegister = async () => {
    try {
      // Check if all fields are filled
      if (!number || !password || !confirmpassword || !referral) {
        Alert.alert("Error", "Please fill out all fields.");
        return;
      }
  
      // Check if the mobile number is exactly 10 digits
      if (number.length !== 10) {
        Alert.alert("Error", "Mobile number must be 10 digits.");
        return;
      }
  
      // Check if password and confirm password match
      if (password !== confirmpassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }
  
      // Make API request to send OTP
      const response = await Api.post('/sendCodephone', { number });
  
      // Log the response for debugging
      console.log(response);
  
      // Handle success response
      if (response.data.success) {
        navigation.push("auth/otpScreen", {
          number,
          password,
          referral,
        });
      } else {
        // If the API call was not successful, show error message
        Alert.alert("Error", response.data.message || "Failed to send OTP.");
        console.log(response.data);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.log("Error:", error);
      Alert.alert("Error", "An error occurred while sending OTP. Please try again.");
    }
  };
  
  

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

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold16black,
              }}
            >
              {tr("Password")}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.textInputCard,
              }}
            >
              <Ionicons name="lock-closed-outline" color={Colors.grey} size={18} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Your Password"
                keyboardType="number-pad"
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                secureTextEntry={true}
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
              Confirm Password
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.textInputCard,
              }}
            >
              <Ionicons name="lock-closed-outline" color={Colors.grey} size={18} />
              <TextInput
                value={confirmpassword}
                onChangeText={setConfirmPassword}
               
                placeholder="Enter Your Confirm Password"
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                keyboardType="number-pad"
                secureTextEntry={true}
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
              Sponsor
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.textInputCard,
              }}
            >
              <Ionicons name="share-social-outline" color={Colors.grey} size={18} />
              <TextInput
                value={referral}
                onChangeText={setReferral}
                keyboardType="email-address"
                placeholder="Enter Your Referral Code"
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
                height={50}
                onPress={handleRegister}
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
              <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ ...Fonts.Regular14 }}>
            Already have an account?
            </Text>
            <TouchableOpacity  onPress={() =>
                  navigation.push("auth/loginScreen")}>
              <Text style={{ color: Colors.linkColor, fontWeight: 'bold',marginLeft: 4,  ...Fonts.Regular16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
