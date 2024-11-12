import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Stars from "react-native-stars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AwesomeButton from "react-native-really-awesome-button";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Add this import for MaterialCommunityIcons


const { height } = Dimensions.get("window");

const GiveRateScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`giveRateScreen:${key}`);
  }

  const [comment, setComment] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
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
          Assets
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flexGrow: Platform.OS === "ios" ? null : 1,
        }}
      >
       <View
        style={{
          marginTop: Default.fixPadding * 2 ,
          marginHorizontal: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            paddingTop: Default.fixPadding * 0.7,
            paddingBottom: Default.fixPadding,
            borderBottomWidth: 1,
            borderBottomColor: Colors.extraLightPrimary,
          }}
        >
          <Text style={{ ...Fonts.Bold14black, textAlign: "center" }}>
            My Assets
          </Text>
          <Text style={{ ...Fonts.SemiBold20black, textAlign: "center" }}>
            200
          </Text>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            padding: Default.fixPadding,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/income.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
              $100
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
             Total Balance
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderLeftWidth: 1,
              borderLeftColor: Colors.extraLightPrimary,
            }}
          >
            <Image
              source={require("../../assets/images/withdraw.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
             $30
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              Active Balance
            </Text>
          </View>
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
  {/* First Button */}
  <TouchableOpacity
    // onPress={() => {
     
    // }}
    style={{
      flexDirection: isRtl ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: Default.fixPadding * 1,
      paddingVertical: Default.fixPadding * 0.8,
      marginTop: Default.fixPadding * 2,
      marginBottom: Default.fixPadding * 2.5,
      marginHorizontal: Default.fixPadding * 0.5, // Space between buttons
      borderRadius: 10,
      backgroundColor: Colors.white,
      ...Default.shadow,
    }}
  >
    <Ionicons
      name={"cash"}
      size={24}
      color={Colors.primary}
      style={{
        paddingRight: isRtl ? 0 : Default.fixPadding,
        paddingLeft: isRtl ? Default.fixPadding : 0,
      }}
    />
    <Text
      numberOfLines={1}
      style={{
        ...Fonts.SemiBold16primary,
        overflow: "hidden",
        paddingLeft: isRtl ? 0 : Default.fixPadding,
        paddingRight: isRtl ? Default.fixPadding : 0,
        borderLeftWidth: isRtl ? null : 1,
        borderLeftColor: isRtl ? null : Colors.grey,
        borderRightWidth: isRtl ? 1 : null,
        borderRightColor: isRtl ? Colors.grey : null,
      }}
    >
      Deposit
    </Text>
  </TouchableOpacity>

  {/* Second Button */}
  <TouchableOpacity
    onPress={() => {
      setOtherAction(); // Replace with the function you need for the second button
    }}
    style={{
      flexDirection: isRtl ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: Default.fixPadding * 1,
      paddingVertical: Default.fixPadding * 0.8,
      marginTop: Default.fixPadding * 2,
      marginBottom: Default.fixPadding * 2.5,
      marginHorizontal: Default.fixPadding * 0.5, // Space between buttons
      borderRadius: 10,
      backgroundColor: Colors.white,
      ...Default.shadow,
    }}
  >
    <Ionicons
      name={"cash"}
      size={24}
      color={Colors.primary}
      style={{
        paddingRight: isRtl ? 0 : Default.fixPadding,
        paddingLeft: isRtl ? Default.fixPadding : 0,
      }}
    />
    <Text
      numberOfLines={1}
      style={{
        ...Fonts.SemiBold16primary,
        overflow: "hidden",
        paddingLeft: isRtl ? 0 : Default.fixPadding,
        paddingRight: isRtl ? Default.fixPadding : 0,
        borderLeftWidth: isRtl ? null : 1,
        borderLeftColor: isRtl ? null : Colors.grey,
        borderRightWidth: isRtl ? 1 : null,
        borderRightColor: isRtl ? Colors.grey : null,
      }}
    >
     Withdraw
    </Text>
  </TouchableOpacity>
</View>

          <Text
            style={{ textAlign: isRtl ? "right" : "left", ...Fonts.Bold16grey,  marginHorizontal: Default.fixPadding*1.8, }}
          >
           Recent Assets
          </Text>

          <View
      >

<View style={{ backgroundColor: Colors.extraLightGrey, paddingVertical: Default.fixPadding * 1,
          }}>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 55,
            height: 55,
            borderRadius: 28,
            borderWidth: 1,
            borderColor: Colors.primary,
            backgroundColor: Colors.lightRegularPrimary,
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={30}
            color={Colors.primary}
          />
        </View>
    
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            Deposit
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.SemiBold14black,
              overflow: "hidden",
              textAlign: isRtl ? "right" : "left",
              marginVertical: Default.fixPadding * 0.3,
            }}
          >
            Success
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.SemiBold14grey }}>
            24-12-2024
          </Text>
        </View>
    
        <Text
          style={{
            ...Fonts.Bold20black,  // Same font style as Deposit
            textAlign: "right",
            marginLeft: "auto", // Ensures the amount is aligned to the right
            paddingRight: Default.fixPadding,
          }}
        >
          $100 
        </Text>
      </View>
    </View>


</View>



      </ScrollView>
    </View>
  );
};

export default GiveRateScreen;

const styles = StyleSheet.create({
  textInput: {
    ...Fonts.Bold16black,
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 3,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
