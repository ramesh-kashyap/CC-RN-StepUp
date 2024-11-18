import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,PermissionsAndroid,Alert
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
import { Pedometer } from 'expo-sensors';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Api from '../../../services/Api.js'; // Adjust path if necessary




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
  const [isPedometerAvailable, setPedometerAvailable] = useState('checking');
  const [stepCount, setStepCount] = useState(0);
  const [storedCount, setStoredCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [previousStepCount, setPreviousStepCount] = useState(0); // Store previous step count

  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [lastLocation, setLastLocation] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [pickedImage, setPickedImage] = useState();



  const storeSteps = async () => {
    try {
      setStoredCount(stepCount);
      // Make the API call
      const response = await Api.post('/Step', { step: stepCount });

      console.log(response.data);

   
      if (response.data.success) {
       
      //  navigation.push("(tabs)");

      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error details:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    } 
  };


  const fetchData = async () => {
    try {
      const response = await Api.get('/userInfo'); // Replace with your actual GET endpoint

      console.log(response.data);

      if (response.data.success) {
        // Handle the successful response here
        console.log(response.data.data);

        setUserInfo(response.data.data);

        setPickedImage(response.data.data.uri??null); 


        if(response.data.data){
          const todaySteps = Number(response.data.data.todaySteps);

           setStepCount(todaySteps);
           setStoredCount(todaySteps);
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


  useEffect(() => {

    fetchData(); // Call fetchData when component mounts


  }, []); 


  // Check if the Pedometer is available on the device
 // Function to request permission for activity recognition on Android
 const requestActivityPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Permission granted", "Start walking!");
    } else {
      Alert.alert("Permission denied", "You cannot track steps without this permission.");
    }
  } catch (err) {
    console.warn(err);
  }
};

// Check if the pedometer is available on the device
useEffect(() => {
  const checkAvailability = async () => {
    const available = await Pedometer.isAvailableAsync();
    setPedometerAvailable(available ? 'Available' : 'Not Available');
    console.log('Pedometer available:', available);
  };
  checkAvailability();
}, []);

// Start or stop tracking steps based on `running`
useEffect(() => {
  if (running) {
    requestActivityPermission();  // Request permission here

    console.log('Starting step count...');
    const sub = Pedometer.watchStepCount(result => {
      console.log('Step result callback triggered');
      if (result && result.steps !== undefined) {
        console.log('Steps detected:', result.steps); // Log each step update
        if(result.steps>1){
          setStepCount(result.steps+storedCount); // Accumulate the new steps

        setDistance(result.steps*0.8);
        }


      } else {
        console.log('No steps detected or error with step count data');
      }
    });

    if (sub) {
      console.log('Subscription successfully created.');
    } else {
      console.log('Failed to create subscription.');
    }
    setSubscription(sub);
  } else {
    console.log('Stopping step count...');
    subscription && subscription.remove();
    setSubscription(null);
  }

  // Cleanup subscription on component unmount or when `running` changes
  return () => {
    subscription && subscription.remove();
  };
}, [running]); // Re-run this useEffect when `running` changes


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
  useEffect(() => {
    const getLocationPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }
      startTracking();
    };

    const startTracking = () => {
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          const coords = newLocation.coords;
          setLocation(coords);

          setLastLocation(coords);
        }
      );
    };

    getLocationPermissions();
  }, []);

  

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
              marginHorizontal: Default.fixPadding * 0.8,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
              {userInfo.userName}
            </Text>
            {/* <View
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
               
              </Text>
            </View> */}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push("notification/notificationScreen")}
        >
          <Ionicons
            name="document-text-outline"
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
            <Text style={{ ...Fonts.SemiBold40primary }}>{stepCount}</Text>
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
              {(stepCount*0.04).toFixed(2)}
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
                           {(stepCount*0.01).toFixed(2)} s
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
                           {(stepCount*0.7).toFixed(2)} m

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

       
       
      </ScrollView>

      <BottomSheet visible={startStepsBottomSheet}>
      <MapView
        style={{ flex: 1,height:"50%",width:"100%",zIndex:1 }}
        region={{
          latitude: location?.latitude || 37.78825,
          longitude: location?.longitude || -122.4324,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        }}
      >
        {location && (
         <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
         <Image
           source={require('../../../assets/images/walk.png')} // Path to your image
           style={{ width: 40, height: 40 }} // Adjust width and height here
           resizeMode="contain"
         />
         
       </Marker>
        )}
      </MapView>
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
                  <Text style={{ ...Fonts.SemiBold20primary }}>{stepCount}</Text>
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
               Total Distance: {distance.toFixed(2)} m

              </Text>


              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setRunning(false);
                    setStartStepsBottomSheet(false);
                    storeSteps(); // Call the storeSteps function
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
   
    maxHeight: height / 1.5,
    backgroundColor: Colors.white,
  },
});
