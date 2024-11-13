import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,Alert
} from "react-native";
import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";
import SnackbarToast from "../../components/snackbarToast";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import Api from '../../services/Api.js'; // Adjust path if necessary


const NotificationScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`notificationScreen:${key}`);
  }

  const [removeNotificationToast, setRemoveNotificationToast] = useState(false);
  const onDismissRemoveNotificationToast = () =>
    setRemoveNotificationToast(false);

  const [notificationList, setNotificationList] = useState([]);


  const fetchData = async () => {
    try {
      const response = await Api.get('/incomeReport'); // Replace with your actual GET endpoint

    
      if (response.data.success) {
        // Handle the successful response here
        console.log(response.data.incomeReport);
        setNotificationList(response.data.incomeReport);

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

  

  const [notification, setNotification] = useState([]);
 

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: Colors.extraLightGrey }}>
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
        {/* <View
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
        </View> */}
    
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            {item.remarks}
          </Text>
          
          <Text numberOfLines={1} style={{ ...Fonts.SemiBold14grey }}>
            {item.ttime}
          </Text>
        </View>
    
        <Text
          style={{
            ...Fonts.SemiBold20primary,  // Same font style as Deposit
            textAlign: "right",
            marginLeft: "auto", // Ensures the amount is aligned to the right
            paddingRight: Default.fixPadding,
          }}
        >
          ${item.comm}  
        </Text>
      </View>
    </View>
    
    );
  };

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
          {tr("notification")}
        </Text>
      </View>

      {notificationList.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Ionicons
            name="notifications-off-outline"
            size={27}
            color={Colors.grey}
          />
          <Text
            style={{
              ...Fonts.Bold18grey,
              marginTop: Default.fixPadding,
            }}
          >
            {tr("noNotification")}
          </Text>
        </View>
      ) : (
        <SwipeListView
  data={notificationList}
  renderItem={renderItem}
  rightOpenValue={0} // Set to 0 to disable right swipe
  leftOpenValue={0} // Set to 0 to disable left swipe
  contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
/>

      )}

      <SnackbarToast
        title={tr("remove")}
        visible={removeNotificationToast}
        onDismiss={onDismissRemoveNotificationToast}
      />
    </View>
  );
};

export default NotificationScreen;
