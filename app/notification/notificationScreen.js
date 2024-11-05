import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";
import SnackbarToast from "../../components/snackbarToast";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

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

  const notificationList = [
    {
      key: "1",
      title: "Awards",
      other: "Congratulation you completed 1000 step you get a 10k award",
      time: "2min ago",
    },
    {
      key: "2",
      title: "Goal achieve",
      other:
        "Congratulation today  you completed 1000 step you achieve your goal",
      time: "4min ago",
    },
    {
      key: "3",
      title: "Calories",
      other: "Today you walked 2500 step and burnt 3500 calories",
      time: "10min ago",
    },
    {
      key: "4",
      title: "Awards",
      other: "Congratulation you completed 1000 step you get a 10k award",
      time: "15min ago",
    },
    {
      key: "5",
      title: "Goal achieve",
      other:
        "Congratulation today  you completed 1000 step you achieve your goal",
      time: "20min ago",
    },
    {
      key: "6",
      title: "Calories",
      other: "Today you walked 2500 step and burnt 3500 calories",
      time: "25min ago",
    },
  ];

  const rowTranslateAnimatedValues = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const [notification, setNotification] = useState(
    notificationList.map((NotificationItem, i) => ({
      key: `${i}`,
      title: NotificationItem.title,
      other: NotificationItem.other,
      time: NotificationItem.time,
    }))
  );

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (
      value < -Dimensions.get("window").width ||
      value > Dimensions.get("window").width
    ) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...notification];
        const prevIndex = notification.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setNotification(newData);
        setRemoveNotificationToast(true);
      });
    }
  };

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
              {item.title}
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
              {item.other}
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.SemiBold14grey }}>
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = () => (
    <View
      style={{
        flex: 1,
        marginBottom: Default.fixPadding * 1.5,
        backgroundColor: Colors.primary,
      }}
    />
  );

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

      {notification.length === 0 ? (
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
          data={notification}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
          rightOpenValue={-Dimensions.get("window").width}
          leftOpenValue={Dimensions.get("window").width}
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
