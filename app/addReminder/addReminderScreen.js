import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AwesomeButton from "react-native-really-awesome-button";
import WheelPicker from "react-native-wheely";
import { BottomSheet } from "react-native-btr";
import { useNavigation } from "expo-router";

const { height } = Dimensions.get("window");

const AddReminderScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`addReminderScreen:${key}`);
  }

  const [confirmTime, setConfirmTime] = useState("");
  const [openTimeBottomSheet, setOpenTimeBottomSheet] = useState(false);

  const [title, setTitle] = useState();

  const [selectedIndexHr, setSelectedIndexHr] = useState(2);
  const [selectedIndexMin, setSelectedIndexMin] = useState(2);
  const [selectedIndexAmPm, setSelectedIndexAmPm] = useState(0);

  const hours = Array.from({ length: 13 }, (_, index) =>
    index.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, index) =>
    index.toString().padStart(2, "0")
  );

  const amPmList = ["AM", "PM"];

  const confirmHour = hours[selectedIndexHr];
  const confirmMinute = minutes[selectedIndexMin];
  const confirmAmPM = amPmList[selectedIndexAmPm];

  const [openRepeatBottomSheet, setOpenRepeatBottomSheet] = useState(false);

  const [selectedDays, setSelectedDays] = useState([
    tr("monday"),
    tr("wednesday"),
    tr("saturday"),
  ]);

  const dayList = [
    { key: "1", title: tr("sunday") },
    { key: "2", title: tr("thursday") },
    { key: "3", title: tr("monday") },
    { key: "4", title: tr("friday") },
    { key: "5", title: tr("tuesday") },
    { key: "6", title: tr("saturday") },
    { key: "7", title: tr("wednesday") },
  ];

  const subStringDays = selectedDays.map((item) => item.substring(0, 3));

  const [confirmDays, setConfirmDays] = useState();

  const renderItemDay = ({ item }) => {
    const isSelected = selectedDays.filter((i) => i === item.title).length > 0;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (isSelected) {
            setSelectedDays((prev) => prev.filter((i) => i !== item.title));
          } else {
            setSelectedDays((prev) => [...prev, item.title]);
          }
        }}
        style={{
          flex: 1,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 25,
              height: 25,
              borderRadius: 5,
              backgroundColor: isSelected ? Colors.primary : Colors.white,
              ...Default.shadow,
            }}
          >
            {isSelected ? (
              <Feather name="check" color={Colors.white} size={20} />
            ) : null}
          </View>
          <Text
            style={{
              ...Fonts.Bold16black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {item.title}
          </Text>
        </View>
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
          {tr("addReminder")}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View
          style={{
            marginTop: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold16black,
            }}
          >
            {tr("title")}
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={tr("enterTitle")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              ...Fonts.Bold15black,
              textAlign: isRtl ? "right" : "left",
              paddingHorizontal: Default.fixPadding * 1.5,
              paddingVertical:
                Platform.OS === "ios"
                  ? Default.fixPadding * 1.5
                  : Default.fixPadding * 1.2,
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          />

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold16black,
            }}
          >
            {tr("time")}
          </Text>
          <TouchableOpacity
            onPress={() => setOpenTimeBottomSheet(true)}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              ...styles.touchableOpacityStyle,
            }}
          >
            <Text
              style={{
                ...(confirmTime === "" ? Fonts.Bold15grey : Fonts.Bold15black),
              }}
            >
              {confirmTime === ""
                ? "02:02 AM"
                : `${confirmTime[0]}:${confirmTime[1]} ${confirmTime[2]}`}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={20}
              color={Colors.grey}
            />
          </TouchableOpacity>

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold16black,
            }}
          >
            {tr("repeat")}
          </Text>
          <TouchableOpacity
            onPress={() => setOpenRepeatBottomSheet(true)}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              ...styles.touchableOpacityStyle,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...(!confirmDays ? Fonts.Bold15grey : Fonts.Bold15black),
                flex: 9,
                textAlign: isRtl ? "right" : "left",
                overflow: "hidden",
              }}
            >
              {!confirmDays ? "Sun,Mon,Fri" : confirmDays}
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-start" : "flex-end",
              }}
            >
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color={Colors.grey}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: Default.fixPadding * 4,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <AwesomeButton
            progress
            height={50}
            progressLoadingTime={1000}
            onPress={(next) => {
              setTimeout(() => {
                next();
                navigation.pop();
              }, 1000);
            }}
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
      </ScrollView>

      <BottomSheet
        visible={openTimeBottomSheet}
        onBackButtonPress={() => setOpenTimeBottomSheet(false)}
        onBackdropPress={() => setOpenTimeBottomSheet(false)}
      >
        <View style={styles.bottomSheetMain}>
          <View
            style={{
              paddingTop: Default.fixPadding * 1.5,
              paddingBottom: Default.fixPadding * 2,
              borderBottomWidth: 1,
              borderBottomColor: Colors.lightGrey,
            }}
          >
            <Text style={{ ...Fonts.Bold20black, textAlign: "center" }}>
              {tr("time")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: Default.fixPadding * 3,
            }}
          >
            <Text
              style={{
                ...Fonts.SemiBold16black,
              }}
            >
              Hr
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold16black,
                left: -Default.fixPadding,
                marginHorizontal: Default.fixPadding * 5,
              }}
            >
              Min
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: height / 3.2,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <WheelPicker
              selectedIndex={selectedIndexHr}
              options={hours}
              visibleRest={5}
              itemHeight={50}
              decelerationRate="fast"
              itemTextStyle={{ ...Fonts.Bold25black }}
              onChange={(index) => setSelectedIndexHr(index)}
              containerStyle={{
                flex: 1,
                alignItems: "flex-end",
              }}
              selectedIndicatorStyle={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: Colors.regularGrey,
              }}
            />

            <WheelPicker
              options={minutes}
              selectedIndex={selectedIndexMin}
              visibleRest={5}
              itemHeight={50}
              decelerationRate="fast"
              itemTextStyle={{ ...Fonts.Bold25black }}
              onChange={(index) => setSelectedIndexMin(index)}
              selectedIndicatorStyle={{
                borderRadius: 0,
                backgroundColor: Colors.regularGrey,
              }}
            />

            <WheelPicker
              selectedIndex={selectedIndexAmPm}
              options={amPmList}
              visibleRest={5}
              itemHeight={50}
              decelerationRate="fast"
              itemTextStyle={{ ...Fonts.Bold25black }}
              onChange={(index) => {
                return setSelectedIndexAmPm(index);
              }}
              containerStyle={{
                flex: 1,
                alignItems: "flex-start",
              }}
              selectedIndicatorStyle={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: Colors.regularGrey,
              }}
            />
          </View>

          <View
            style={{
              margin: Default.fixPadding * 2,
            }}
          >
            <AwesomeButton
              height={50}
              onPress={() => {
                setOpenTimeBottomSheet(false);
                setConfirmTime([confirmHour, confirmMinute, confirmAmPM]);
              }}
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
            onPress={() => setOpenTimeBottomSheet(false)}
            style={{
              alignSelf: "center",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <BottomSheet
        visible={openRepeatBottomSheet}
        onBackButtonPress={() => setOpenRepeatBottomSheet(false)}
        onBackdropPress={() => setOpenRepeatBottomSheet(false)}
      >
        <View style={styles.bottomSheetMain}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: Default.fixPadding * 1.5,
              borderBottomWidth: 1,
              borderBottomColor: Colors.lightGrey,
            }}
          >
            <Text style={{ ...Fonts.Bold20black }}>{tr("repeat")}</Text>
          </View>
          <FlatList
            numColumns={2}
            data={dayList}
            renderItem={renderItemDay}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Default.fixPadding * 3 }}
          />

          <View
            style={{
              margin: Default.fixPadding * 2,
            }}
          >
            <AwesomeButton
              height={50}
              onPress={() => {
                setOpenRepeatBottomSheet(false);
                setConfirmDays(subStringDays.join(","));
              }}
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
            onPress={() => setOpenRepeatBottomSheet(false)}
            style={{
              alignSelf: "center",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default AddReminderScreen;

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    padding: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheetMain: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
  },
});
