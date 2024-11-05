import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../components/myStatusBar";
import * as Progress from "react-native-progress";
import { useLocalSearchParams, useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const AwardsCategoryScreen = () => {
  const navigation = useNavigation();
  const { title } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`awardsCategoryScreen:${key}`);
  }

  const medalList = [
    { key: "1", other: "05K" },
    { key: "2", other: "10K" },
    { key: "3", other: "15K" },
    { key: "4", other: "20K" },
    { key: "5", other: "25K" },
    { key: "6", other: "30K" },
    { key: "7", other: "35K" },
    { key: "8", other: "40K" },
    { key: "9", other: "45K" },
    { key: "10", other: "50K" },
    { key: "11", other: "55K" },
    { key: "12", other: "60K" },
    { key: "13", other: "45K" },
    { key: "14", other: "50K" },
    { key: "15", other: "55K" },
    { key: "16", other: "60K" },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (index > 1) {
            navigation.push("inactive/inactiveScreen");
          } else {
            navigation.push("achieveGoal/achieveGoalScreen");
          }
        }}
        style={styles.medalBoxView}
      >
        <Image
          source={
            index > 1
              ? require("../../assets/images/medal2.png")
              : require("../../assets/images/medal.png")
          }
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...(index > 1 ? Fonts.Bold16grey : Fonts.Bold16orange),
            marginTop: Default.fixPadding * 0.6,
          }}
        >
          {item.other}
        </Text>
      </TouchableOpacity>
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
          {title}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.Bold18black }}>{tr("yourLevel")}</Text>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: Default.fixPadding * 2,
              marginBottom: Default.fixPadding * 4,
              width: 128,
              height: 128,
              borderRadius: 64,
              borderWidth: 5,
              borderColor: Colors.lightRegular,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <Image
              source={require("../../assets/images/medal.png")}
              style={{ width: 50, height: 50, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.Bold20orange,
                marginTop: Default.fixPadding * 0.6,
              }}
            >
              10K
            </Text>
          </View>

          <View style={{ width: width / 1.3 }}>
            <Progress.Bar
              width={width / 1.3}
              height={10}
              borderWidth={0}
              progress={0.5}
              color={Colors.primary}
              unfilledColor={Colors.lightGrey}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: Default.fixPadding,
              }}
            >
              <Text style={{ ...Fonts.Bold14grey }}>200</Text>
              <Text style={{ ...Fonts.Bold14primary }}>50%</Text>
              <Text style={{ ...Fonts.Bold14grey }}>500</Text>
            </View>

            <Text
              style={{
                ...Fonts.Bold14black,
                textAlign: "center",
                marginTop: Default.fixPadding * 2.5,
                marginHorizontal: Default.fixPadding * 5,
              }}
            >
              {tr("achievement")}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: Default.fixPadding * 3,
            paddingTop: Default.fixPadding,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <FlatList
            numColumns={4}
            data={medalList}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: Default.fixPadding * 1.3,
              paddingHorizontal: Default.fixPadding * 1.1,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default AwardsCategoryScreen;

const styles = StyleSheet.create({
  medalBoxView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.2,
    marginBottom: Default.fixPadding * 1.5,
    marginHorizontal: Default.fixPadding * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
