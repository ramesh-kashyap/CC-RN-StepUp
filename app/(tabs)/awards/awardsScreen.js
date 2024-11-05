import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Colors, Default, Fonts } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";

const AwardsScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`awardsScreen:${key}`);
  }

  const dailyStepsList = [
    {
      key: "1",
      title: "10K",
    },
    {
      key: "2",
      title: "20K",
    },
    {
      key: "3",
      title: "30K",
    },
    {
      key: "4",
      title: "35K",
    },
    {
      key: "5",
      title: "40K",
    },
  ];

  const renderItemDailySteps = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (index > 1) {
            navigation.push("inactive/inactiveScreen");
          } else {
            navigation.push("achieveGoal/achieveGoalScreen");
          }
        }}
        style={{
          paddingHorizontal: Default.fixPadding * 2.3,
          ...styles.stepsBox,
        }}
      >
        <Image
          source={
            index > 1
              ? require("../../../assets/images/medal2.png")
              : require("../../../assets/images/medal.png")
          }
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...(index > 1 ? Fonts.Bold16grey : Fonts.Bold16primary),
            marginTop: Default.fixPadding * 0.6,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const distanceList = [
    {
      key: "1",
      title: "5km",
    },
    {
      key: "2",
      title: "10km",
    },
    {
      key: "3",
      title: "15km",
    },
    {
      key: "4",
      title: "20km",
    },
    {
      key: "5",
      title: "25km",
    },
    {
      key: "6",
      title: "30km",
    },
  ];

  const renderItemDistance = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (index > 2) {
            navigation.push("inactive/inactiveScreen");
          } else {
            navigation.push("achieveGoal/achieveGoalScreen");
          }
        }}
        style={{
          paddingHorizontal: Default.fixPadding * 2.3,
          ...styles.stepsBox,
        }}
      >
        <Image
          source={
            index > 2
              ? require("../../../assets/images/medal4.png")
              : require("../../../assets/images/starMedal.png")
          }
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...(index > 2 ? Fonts.Bold16grey : Fonts.Bold16primary),
            marginTop: Default.fixPadding * 0.6,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const caloriesWeekList = [
    {
      key: "1",
      title: "500kcal",
    },
    {
      key: "2",
      title: "1000kcal",
    },
    {
      key: "3",
      title: "1500kcal",
    },
    {
      key: "4",
      title: "2000kcal",
    },
    {
      key: "5",
      title: "2500kcal",
    },
  ];

  const renderItemCaloriesWeek = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (index > 1) {
            navigation.push("inactive/inactiveScreen");
          } else {
            navigation.push("achieveGoal/achieveGoalScreen");
          }
        }}
        style={{
          paddingHorizontal: Default.fixPadding,
          ...styles.stepsBox,
        }}
      >
        <Image
          source={
            index > 1
              ? require("../../../assets/images/starMedal2.png")
              : require("../../../assets/images/medal3.png")
          }
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...(index > 1 ? Fonts.Bold16grey : Fonts.Bold16primary),
            marginTop: Default.fixPadding * 0.6,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const totalDaysList = [
    {
      key: "1",
      title: "5d",
    },
    {
      key: "2",
      title: "10d",
    },
    {
      key: "3",
      title: "10d",
    },
    {
      key: "4",
      title: "15d",
    },
    {
      key: "5",
      title: "20d",
    },
    {
      key: "6",
      title: "25d",
    },
  ];

  const renderItemTotalDays = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (index > 2) {
            navigation.push("inactive/inactiveScreen");
          } else {
            navigation.push("achieveGoal/achieveGoalScreen");
          }
        }}
        style={{
          paddingHorizontal: Default.fixPadding * 2.3,
          ...styles.stepsBox,
        }}
      >
        <Image
          source={
            index > 2
              ? require("../../../assets/images/starRating2.png")
              : require("../../../assets/images/starRatingMedal.png")
          }
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...(index > 2 ? Fonts.Bold16grey : Fonts.Bold16primary),
            marginTop: Default.fixPadding * 0.6,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

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
        <Text style={{ ...Fonts.Bold20white }}>{tr("awards")}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: Default.fixPadding * 2 }}>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                marginRight: isRtl ? 0 : Default.fixPadding,
                marginLeft: isRtl ? Default.fixPadding : 0,
                ...Fonts.Bold16primary,
              }}
            >
              {tr("dailySteps")}(1/5)
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push("awardsCategory/awardsCategoryScreen", {
                  title: tr("dailySteps"),
                })
              }
            >
              <Ionicons
                name={isRtl ? "chevron-back" : "chevron-forward"}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            inverted={isRtl}
            data={dailyStepsList}
            renderItem={renderItemDailySteps}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
          />

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                marginRight: isRtl ? 0 : Default.fixPadding,
                marginLeft: isRtl ? Default.fixPadding : 0,
                ...Fonts.Bold16primary,
              }}
            >
              {tr("distance")}(1/5)
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push("awardsCategory/awardsCategoryScreen", {
                  title: tr("distance"),
                })
              }
            >
              <Ionicons
                name={isRtl ? "chevron-back" : "chevron-forward"}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            inverted={isRtl}
            data={distanceList}
            renderItem={renderItemDistance}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
          />

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                marginRight: isRtl ? 0 : Default.fixPadding,
                marginLeft: isRtl ? Default.fixPadding : 0,
                ...Fonts.Bold16primary,
              }}
            >
              {tr("caloriesWeek")}(1/5)
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push("awardsCategory/awardsCategoryScreen", {
                  title: tr("caloriesWeek"),
                })
              }
            >
              <Ionicons
                name={isRtl ? "chevron-back" : "chevron-forward"}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            inverted={isRtl}
            data={caloriesWeekList}
            renderItem={renderItemCaloriesWeek}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
          />

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                marginRight: isRtl ? 0 : Default.fixPadding,
                marginLeft: isRtl ? Default.fixPadding : 0,
                ...Fonts.Bold16primary,
              }}
            >
              {tr("totalDays")}(1/5)
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push("awardsCategory/awardsCategoryScreen", {
                  title: tr("totalDays"),
                })
              }
            >
              <Ionicons
                name={isRtl ? "chevron-back" : "chevron-forward"}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            inverted={isRtl}
            data={totalDaysList}
            renderItem={renderItemTotalDays}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AwardsScreen;

const styles = StyleSheet.create({
  stepsBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.2,
    marginTop: Default.fixPadding * 1.2,
    marginBottom: Default.fixPadding * 2.5,
    marginHorizontal: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
