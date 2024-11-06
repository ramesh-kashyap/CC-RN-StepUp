import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,Platform 
  Dimensions,Platform 
} from "react-native";
import { Colors, Default, Fonts } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as Progress from "react-native-progress";
import { Svg } from "react-native-svg";
import { BottomSheet } from "react-native-btr";
import DashedLine from "react-native-dashed-line";
import { useNavigation } from "expo-router";
import { authorize } from 'react-native-app-auth';
import axios from 'axios';


const config = {
  clientId: '23PRJC',
  clientSecret: 'a8a413c92518d43c50f880c9b9a99e08',
  redirectUrl: 'https://www.rockwellsoftech.com://fitbit-auth', 
  scopes: ['activity', 'heartrate', 'profile'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
};

const authenticateFitbit = async () => {
  try {
    const authResponse = await authorize(config);
    console.log('OAuth Response:', authResponse);
    if (authResponse.accessToken) {
      // Use the access token for subsequent API requests
      setAccessToken(authResponse.accessToken);
    }
  } catch (error) {
    console.error('Error with Fitbit authentication', error);
  }
};


const fetchStepData = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const steps = response.data['activities-steps'][0].value;
    console.log('Steps for today:', steps);
    return steps;
  } catch (error) {
    console.error('Error fetching step data:', error);
  }
};


const { width, height } = Dimensions.get("window");





const HomeScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const [startStepsBottomSheet, setStartStepsBottomSheet] = useState(false);

  const [progress, setProgress] = useState(100);
  const [running, setRunning] = useState(false);

  // useEffect(() => {
  //   let interval;
  // useEffect(() => {
  //   let interval;

  //   if (running) {
  //     interval = setInterval(() => {
  //       setProgress((prevProgress) => {
  //         if (prevProgress < 500) {
  //           return prevProgress + 1;
  //         }
  //         return prevProgress;
  //       });
  //     }, 800);
  //   }
  //   return () => clearInterval(interval);
  // }, [running]);


  const [steps, setSteps] = useState(0);
  const [accessToken, setAccessToken] = useState(null);

  const handleGetSteps = async () => {
    if (!accessToken) {
      const authResponse = await authenticateFitbit();
      setAccessToken(authResponse.accessToken);
    }
    const todaySteps = await fetchStepData(accessToken);
    setSteps(todaySteps);
  };

  

  useEffect(() => {
    if (running) {
      handleGetSteps();
    }
  }, [running]);

  

  const dailyAverageChartData = [
    {
      key: "1",
      title: "Mon",
      progress: 0.4,
    },
    {
      key: "2",
      title: "Tue",
      progress: 0.5,
    },
    {
      key: "3",
      title: "Wed",
      progress: 0.6,
    },
    {
      key: "4",
      title: "Thu",
      progress: 0.4,
    },
    {
      key: "5",
      title: "Fri",
      progress: 0.7,
    },
    {
      key: "6",
      title: "Sat",
      progress: 0.6,
    },
    {
      key: "7",
      title: "Sun",
      progress: 0.4,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingHorizontal: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/profile.png")}
            style={{ width: 58, height: 58, borderRadius: 29 }}
          />
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding * 0.8,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
              Guy Hawkins
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 0.5,
              }}
            >
              <SimpleLineIcons
                name="location-pin"
                size={16}
                color={Colors.extraLightGrey}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold14extraLightGrey,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                Mumbai
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push("notification/notificationScreen")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 3,
            marginBottom: Default.fixPadding * 4,
          }}
        >
          <Svg width={250} height={250}>
            <AnimatedCircularProgress
              size={250}
              width={15}
              fill={(progress / 500) * 100}
              rotation={0}
              lineCap="round"
              arcSweepAngle={360}
              backgroundWidth={15}
              backgroundColor={Colors.extraGrey}
              tintColor={Colors.primary}
              tintColorSecondary={Colors.lightPrimary}
              style={{ alignSelf: "center" }}
            />
          </Svg>

          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              top: Default.fixPadding * 2.6,
              width: 198,
              height: 198,
              borderRadius: 99,
              paddingHorizontal: Default.fixPadding * 1.5,
              backgroundColor: Colors.extraGrey,
            }}
          >
            <Text style={{ ...Fonts.SemiBold40primary }}>{steps}</Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16grey, overflow: "hidden" }}
            >
              {tr("step")}
            </Text>
            <View
              style={{
                width: 130,
                marginVertical: Default.fixPadding * 2,
                borderTopWidth: 2,
                borderTopColor: Colors.extraLightPrimary,
              }}
            />

            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold16primary,
                overflow: "hidden",
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("goal")} : 500 {tr("step")}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginHorizontal: Default.fixPadding,
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
              source={require("../../../assets/images/icon2.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
              2154
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              {tr("kcalBurnt")}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: Default.fixPadding,
              marginHorizontal: Default.fixPadding,
              borderRightWidth: 1,
              borderRightColor: Colors.grey,
              borderLeftWidth: 1,
              borderLeftColor: Colors.grey,
            }}
          >
            <Image
              source={require("../../../assets/images/icon3.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
              1h 36m
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              {tr("activeTime")}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/images/icon4.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
              4.2 km
              4.2 km
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              {tr("distance")}
            </Text>
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setStartStepsBottomSheet(true);
              setRunning(true);
            }}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding * 0.8,
              marginTop: Default.fixPadding * 4,
              marginBottom: Default.fixPadding * 2.5,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <Ionicons
              name={"caret-forward-outline"}
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
                ...Fonts.SemiBold18primary,
                overflow: "hidden",
                paddingLeft: isRtl ? 0 : Default.fixPadding,
                paddingRight: isRtl ? Default.fixPadding : 0,
                borderLeftWidth: isRtl ? null : 1,
                borderLeftColor: isRtl ? null : Colors.grey,
                borderRightWidth: isRtl ? 1 : null,
                borderRightColor: isRtl ? Colors.grey : null,
              }}
            >
              {tr("start")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2.5,
            paddingVertical: Default.fixPadding,
            paddingHorizontal: Default.fixPadding * 0.7,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DashedLine
              dashGap={2.5}
              dashLength={2.5}
              dashThickness={1.5}
              dashColor={Colors.grey}
              style={{ flex: 1 }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold14black,
                textAlign: "center",
                overflow: "hidden",
                top: -Default.fixPadding * 0.5,
                paddingTop: Default.fixPadding * 0.7,
                maxWidth: 200,
              }}
            >
              {tr("dailyAverage")}
              {` : 2141`}
            </Text>
            <DashedLine
              dashGap={2.5}
              dashLength={2.5}
              dashThickness={1.5}
              dashColor={Colors.grey}
              style={{ flex: 1 }}
            />
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginTop: Default.fixPadding * 2.5,
            }}
          >
            {dailyAverageChartData.map((item) => {
              return (
                <View
                  key={item.key}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 250,
                  }}
                >
                  <View
                    style={{
                      flex: 9,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Progress.Bar
                      width={220}
                      height={10}
                      borderWidth={0}
                      progress={item.progress}
                      color={Colors.primary}
                      unfilledColor={Colors.regularPrimary}
                      style={{
                        transform: [{ rotate: "-90deg" }],
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ ...Fonts.Bold14grey }}>{item.title}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{ flex: 1, alignItems: isRtl ? "flex-end" : "flex-start" }}
          >
            <Text style={{ ...Fonts.Bold14black }}>
              {`${tr("achievement")} : `}
              <Text style={{ ...Fonts.Bold14grey }}>{tr("startingWalk")}</Text>
            </Text>
            <Text
              style={{
                ...Fonts.Bold15black,
                marginTop: Default.fixPadding * 0.3,
                marginBottom: Default.fixPadding,
              }}
            >{`1226 ${tr("stepsLeft")}`}</Text>

            <Progress.Bar
              width={width / 1.6}
              height={10}
              borderWidth={0}
              progress={0.5}
              color={Colors.primary}
              unfilledColor={Colors.lightGrey}
            />
          </View>

          <Image
            source={require("../../../assets/images/medal.png")}
            style={{ width: 63, height: 63, resizeMode: "contain" }}
          />
        </View>
      </ScrollView>

      <BottomSheet visible={startStepsBottomSheet}>
        <View style={styles.bottomSheetMain}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: Default.fixPadding * 4 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Svg width={180} height={180}>
                  <AnimatedCircularProgress
                    size={180}
                    width={15}
                    fill={(progress / 500) * 100}
                    rotation={0}
                    lineCap="round"
                    arcSweepAngle={360}
                    style={{ alignSelf: "center" }}
                    backgroundWidth={15}
                    backgroundColor={Colors.extraGrey}
                    tintColor={Colors.primary}
                    tintColorSecondary={Colors.lightPrimary}
                  />
                </Svg>

                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    top: Default.fixPadding * 2.5,
                    width: 132,
                    height: 132,
                    borderRadius: 66,
                    backgroundColor: Colors.extraGrey,
                    paddingHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  <Text style={{ ...Fonts.SemiBold20primary }}>{steps}</Text>
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Bold16grey, overflow: "hidden" }}
                  >
                    {tr("step")}
                  </Text>
                  <View
                    style={{
                      width: 110,
                      marginVertical: Default.fixPadding * 1.5,
                      borderTopWidth: 2,
                      borderTopColor: Colors.extraLightPrimary,
                    }}
                  />

                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold10primary,
                      overflow: "hidden",
                      marginHorizontal: Default.fixPadding * 0.5,
                    }}
                  >
                    {tr("goal")} : 500 {tr("step")}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  ...Fonts.SemiBold18black,
                  textAlign: "center",
                  marginVertical: Default.fixPadding * 3.3,
                }}
              >
                {tr("other")}
              </Text>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setRunning(false);
                    setStartStepsBottomSheet(false);
                  }}
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: 150,
                    paddingHorizontal: Default.fixPadding * 2,
                    paddingVertical: Default.fixPadding * 0.8,
                    borderRadius: 10,
                    backgroundColor: Colors.white,
                    ...Default.shadow,
                  }}
                >
                  <MaterialCommunityIcons
                    name={"pause"}
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
                      ...Fonts.SemiBold18primary,
                      overflow: "hidden",
                      borderLeftColor: isRtl ? null : Colors.grey,
                      paddingLeft: isRtl ? 0 : Default.fixPadding,
                      paddingRight: isRtl ? Default.fixPadding : 0,
                      borderRightColor: isRtl ? Colors.grey : null,
                      borderRightWidth: isRtl ? 1 : null,
                      maxWidth: 100,
                    }}
                  >
                    {tr("pause")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottomSheetMain: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height / 1.5,
    backgroundColor: Colors.white,
  },
});
