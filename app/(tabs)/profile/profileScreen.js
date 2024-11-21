import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, Default, Fonts } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BottomSheet } from "react-native-btr";
import AwesomeButton from "react-native-really-awesome-button";
import WeightBottomSheet from "../../../components/weightBottomSheet";
import HeightBottomSheet from "../../../components/heightBottomSheet";
import StepGoalBottomSheet from "../../../components/stepGoalBottomSheet";
import LogoutModal from "../../../components/logoutModal";
import { useNavigation } from "expo-router";
import Api from '../../../services/Api.js'; 
import { useFocusEffect } from "@react-navigation/native"; 


const ProfileScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const [pickedImage, setPickedImage] = useState(null);


  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`profileScreen:${key}`);
  }

  const [genderBottomSheet, setGenderBottomSheet] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await Api.get('/userInfo'); // Replace with your actual GET endpoint

    
      if (response.data.success) {
        // Handle the successful response here
        console.log(response.data.data);
        setData(response.data.data);

        if (response.data.data.uri && response.data.data.uri.includes("http://192.168.29.193:8000/storage/images/")) {
          setPickedImage(response.data.data.uri ?? null);
        } else {
          setPickedImage(null); // Optional: Clear the image if the condition isn't met
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

  useFocusEffect(
    useCallback(() => {
      // This will run every time the screen comes into focus
      fetchData();
    }, [])
  );
  
  const genderList = [
    {
      key: "1",
      image: require("../../../assets/images/male.png"),
    },
    {
      key: "2",
      image: require("../../../assets/images/female.png"),
    },
  ];
  const [selectedGender, setSelectedGender] = useState("1");

  const [openWeightBottomSheet, setOpenWeightBottomSheet] = useState(false);
  const [openHeightBottomSheet, setOpenHeightBottomSheet] = useState(false);
  const [openStepsGoalBottomSheet, setOpenStepsGoalBottomSheet] =
    useState(false);

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  console.log("Picked Image URI:", pickedImage);


  return (
    <View style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <MyStatusBar />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding * 1.2,
          backgroundColor: Colors.primary,
        }}
      >
        <Text style={{ ...Fonts.Bold20white }}>{tr("profile")}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingHorizontal: Default.fixPadding * 2,
            paddingVertical: Default.fixPadding * 1.2,
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
             { pickedImage ?
          <Image
          source={{ uri: pickedImage }}
            style={{ width: 58, height: 58, borderRadius: 29 }}
          />
    :
            <Image         
            source={require("../../../assets/images/profile.png")}
            style={{ width: 58, height: 58, borderRadius: 29 }}
          />
   }
            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginHorizontal: Default.fixPadding,
              }}
            >
              <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
             
                {data.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold12grey,
                  marginTop: Default.fixPadding * 0.4,
                }}
              >
                {data.jdate}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.push("editProfile/editProfileScreen")}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color={Colors.grey}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{ textAlign: isRtl ? "right" : "left", ...Fonts.Bold16grey }}
          >
            {tr("personalInformation")}
          </Text>

          <View style={styles.boxView}>
           
            

            <View style={styles.borderLine}>
              <TouchableOpacity
                 onPress={() => navigation.push("language/languageScreen")}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingBottom: Default.fixPadding,
                  paddingTop: Default.fixPadding * 1.4,
                }}
              >
                <Image
                  source={require("../../../assets/images/icon6.png")}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    ...Fonts.SemiBold15black,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                 {tr("language")}
                </Text>
              </TouchableOpacity>
            </View>


            <View style={styles.borderLine}>
              <TouchableOpacity
               onPress={() => navigation.push("editProfile/teamReport")}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingBottom: Default.fixPadding,
                  paddingTop: Default.fixPadding * 1.4,
                }}
              >
                 <Image
                source={require("../../../assets/images/img3.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    textAlign: isRtl ? "right" : "left",
                    ...Fonts.SemiBold15black,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  Team Report
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.borderLine}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("instructions/instructionsScreen")
                }
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingVertical: Default.fixPadding,
                }}
              >
                <SimpleLineIcons
                  name="question"
                  size={18}
                  color={Colors.primary}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    textAlign: isRtl ? "right" : "left",
                    ...Fonts.SemiBold15black,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("instruction")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.borderLine}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("editProfile/inviteScreen")
                }
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingVertical: Default.fixPadding,
                }}
              >
                <SimpleLineIcons
                  name="cursor"
                  size={18}
                  color={Colors.primary}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    textAlign: isRtl ? "right" : "left",
                    ...Fonts.SemiBold15black,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("Invite")}
                </Text>
              </TouchableOpacity>
            </View>

           

            <View style={styles.borderLine}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("privacyPolicy/privacyPolicyScreen")
                }
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingTop: Default.fixPadding * 1.4,
                  paddingBottom: Default.fixPadding,
                }}
              >
                <MaterialCommunityIcons
                  name="shield-alert-outline"
                  size={20}
                  color={Colors.primary}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    textAlign: isRtl ? "right" : "left",
                    ...Fonts.SemiBold15black,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("privacyPolicy")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.borderLine}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("termsAndCondition/termsAndConditionScreen")
                }
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingTop: Default.fixPadding * 1.4,
                  paddingBottom: Default.fixPadding,
                }}
              >
                <MaterialIcons
                  name="list-alt"
                  size={20}
                  color={Colors.primary}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    textAlign: isRtl ? "right" : "left",
                    ...Fonts.SemiBold15black,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("termsCondition")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setOpenLogoutModal(true)}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                paddingBottom: Default.fixPadding,
                paddingTop: Default.fixPadding * 1.4,
              }}
            >
              <Ionicons name="log-out-outline" size={20} color={Colors.red} />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold15red,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("logout")}
              </Text>
            </TouchableOpacity>

          
          </View>

       



      

          
        </View>
      </ScrollView>

      <BottomSheet
        visible={genderBottomSheet}
        onBackButtonPress={() => setGenderBottomSheet(false)}
        onBackdropPress={() => setGenderBottomSheet(false)}
      >
        <View style={styles.bottomSheetMain}>
          <Text style={{ ...Fonts.Bold20black, textAlign: "center" }}>
            {tr("gender")}
          </Text>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginVertical: Default.fixPadding * 4,
              marginHorizontal: Default.fixPadding * 3,
            }}
          >
            {genderList.map((item) => {
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setSelectedGender(item.key)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: Default.fixPadding * 1.2,
                    paddingBottom: Default.fixPadding,
                    borderWidth: 1,
                    borderColor:
                      selectedGender === item.key
                        ? Colors.primary
                        : Colors.transparent,
                    borderRadius: 10,
                    backgroundColor: Colors.white,
                    ...Default.shadow,
                  }}
                >
                  <Ionicons
                    name={
                      selectedGender === item.key
                        ? "checkmark-circle-sharp"
                        : "ellipse"
                    }
                    size={16}
                    color={
                      selectedGender === item.key
                        ? Colors.primary
                        : Colors.lightGrey
                    }
                    style={{
                      alignSelf: isRtl ? "flex-start" : "flex-end",
                      padding: Default.fixPadding * 0.3,
                    }}
                  />
                  <Image
                    source={item.image}
                    style={{
                      width: 88,
                      height: 88,
                      resizeMode: "contain",
                      paddingHorizontal: Default.fixPadding,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <AwesomeButton
              height={50}
              onPress={() => setGenderBottomSheet(false)}
              raiseLevel={1}
              stretch={true}
              borderRadius={10}
              backgroundShadow={Colors.primary}
              backgroundDarker={Colors.primary}
              backgroundColor={Colors.primary}
            >
              <Text style={{ ...Fonts.ExtraBold18white }}>{tr("save")}</Text>
            </AwesomeButton>
          </View>
          <TouchableOpacity
            onPress={() => setGenderBottomSheet(false)}
            style={{ alignSelf: "center" }}
          >
            <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <WeightBottomSheet
        visible={openWeightBottomSheet}
        closeWightBottomSheet={() => setOpenWeightBottomSheet(false)}
      />

      <HeightBottomSheet
        visible={openHeightBottomSheet}
        closeHeightBottomSheet={() => setOpenHeightBottomSheet(false)}
      />
      <StepGoalBottomSheet
        visible={openStepsGoalBottomSheet}
        closeStepGoalBottomSheet={() => setOpenStepsGoalBottomSheet(false)}
      />

      <LogoutModal
        visible={openLogoutModal}
        closeLogoutModal={() => setOpenLogoutModal(false)}
        onLogoutHandler={() => {
          setOpenLogoutModal(false);
          navigation.push("auth/loginScreen");
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.extraLightGreen,
  },
  boxView: {
    marginTop: Default.fixPadding * 0.8,
    marginBottom: Default.fixPadding,
    paddingHorizontal: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheetMain: {
    padding: Default.fixPadding * 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
  },
});
