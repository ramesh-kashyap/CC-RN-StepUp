import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react"; 
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AwesomeButton from "react-native-really-awesome-button";
import moment from "moment";
import DateTimePicker from "react-native-ui-datepicker";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const HistoryScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`historyScreen:${key}`);
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [AllDelete, setAllDelete] = useState(false);

  const [openDateModal, setOpenDateModal] = useState(false);

  const today = moment().format("YYYY-MM-DD");

  const historyList = [
    {
      key: "1",
      date: "01 -04-2022",
      steps: "1000",
      kcalBurnt: "2154",
      activeTime: "1h 36m",
      distance: "4.8 km",
    },
    {
      key: "2",
      date: "02 -04-2022",
      steps: "2000",
      kcalBurnt: "2324",
      activeTime: "2h 30m",
      distance: "2.8 km",
    },
    {
      key: "3",
      date: "03 -04-2022",
      steps: "1500",
      kcalBurnt: "1050",
      activeTime: "3h 36m",
      distance: "4.8 km",
    },
    {
      key: "4",
      date: "04 -04-2022",
      steps: "1000",
      kcalBurnt: "2154",
      activeTime: "1h 10m",
      distance: "1.8 km",
    },
    {
      key: "5",
      date: "05 -04-2022",
      steps: "1800",
      kcalBurnt: "2154",
      activeTime: "1h 36m",
      distance: "3.5 km",
    },
    {
      key: "6",
      date: "06 -04-2022",
      steps: "3000",
      kcalBurnt: "2504",
      activeTime: "1h 40m",
      distance: "4.8 km",
    },
    {
      key: "7",
      date: "07 -04-2022",
      steps: "1540",
      kcalBurnt: "2254",
      activeTime: "2h 36m",
      distance: "5.8 km",
    },
  ];

  const renderItem = ({ item, index }) => {
    const firstItem = index === 0;
    return (
      <View
        style={{
          marginTop: firstItem ? Default.fixPadding * 2 : null,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2.5,
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
          <Text style={{ ...Fonts.SemiBold14primary, textAlign: "center" }}>
            {item.date}
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
              source={require("../../../assets/images/img4.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
              {item.steps}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              {tr("steps")}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: Default.fixPadding * 0.5,
              borderLeftWidth: 1,
              borderLeftColor: Colors.extraLightPrimary,
              borderRightWidth: 1,
              borderRightColor: Colors.extraLightPrimary,
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
              {item.kcalBurnt}
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
              paddingHorizontal: Default.fixPadding * 0.5,
              borderRightWidth: isRtl ? null : 1,
              borderRightColor: isRtl ? null : Colors.extraLightPrimary,
              borderLeftWidth: isRtl ? 1 : null,
              borderLeftColor: isRtl ? Colors.extraLightPrimary : null,
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
              {item.activeTime}
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
              {item.distance}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              {tr("distance")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const [confirmDate, setConfirmDate] = useState(null);

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
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
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
            {tr("history")}
          </Text>
        </View>
        {AllDelete ? null : (
          <TouchableOpacity
            onPress={() => setOpenDeleteModal(true)}
            style={{ flex: 1, alignItems: isRtl ? "flex-start" : "flex-end" }}
          >
            <AntDesign name="delete" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>

      {AllDelete ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Image
            source={require("../../../assets/images/empty.png")}
            style={{ width: 145, height: 110, resizeMode: "contain" }}
          />
          <Text
            style={{ ...Fonts.Bold20grey, marginTop: Default.fixPadding * 2 }}
          >
            {tr("empty")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold16grey,
              textAlign: "center",
              marginTop: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {tr("recordAtTime")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={historyList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingHorizontal: Default.fixPadding * 2,
                  paddingVertical: Default.fixPadding,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.lightGrey,
                  backgroundColor: Colors.regularGrey,
                }}
              >
                <View
                  style={{
                    flex: 9,
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-range"
                    size={20}
                    Colors={Colors.black}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold15black,
                      overflow: "hidden",
                      marginHorizontal: Default.fixPadding,
                    }}
                  >
                    {confirmDate
                      ? `${confirmDate.fromConfirmDate} to ${confirmDate.toConfirmDate}`
                      : "11-06-2024 to 11-06-2024"}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setOpenDateModal(true)}
                  style={{
                    flex: 1,
                    alignItems: isRtl ? "flex-start" : "flex-end",
                  }}
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={22}
                    color={Colors.grey}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingVertical: Default.fixPadding * 2,
                  paddingHorizontal: Default.fixPadding,
                  backgroundColor: Colors.regularGrey,
                  ...Default.shadow,
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
                    source={require("../../../assets/images/img4.png")}
                    style={{ width: 25, height: 25, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      ...Fonts.SemiBold14black,
                      marginTop: Default.fixPadding,
                    }}
                  >
                    10,000
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
                  >
                    {tr("steps")}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: Default.fixPadding * 0.5,
                    borderLeftWidth: 1,
                    borderLeftColor: Colors.extraLightPrimary,
                    borderRightWidth: 1,
                    borderRightColor: Colors.extraLightPrimary,
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
                    65248
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
                    paddingHorizontal: Default.fixPadding * 0.5,
                    borderRightWidth: isRtl ? null : 1,
                    borderRightColor: isRtl ? null : Colors.extraLightPrimary,
                    borderLeftWidth: isRtl ? 1 : null,
                    borderLeftColor: isRtl ? Colors.extraLightPrimary : null,
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
                    24h 60m
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
                    15.50 km
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
                  >
                    {tr("distance")}
                  </Text>
                </View>
              </View>
            </>
          )}
        />
      )}

      <Modal
        transparent={true}
        animationType="fade"
        visible={openDeleteModal}
        onRequestClose={() => setOpenDeleteModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setOpenDeleteModal(false)}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.transparentBlack,
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                padding: Default.fixPadding * 2,
                width: width * 0.9,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: Colors.extraLightGrey,
                  }}
                >
                  <AntDesign name="delete" size={24} color={Colors.red} />
                </View>
                <Text
                  style={{
                    ...Fonts.SemiBold16black,
                    textAlign: "center",
                    marginVertical: Default.fixPadding * 2,
                  }}
                >
                  {tr("areYouSure")}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setOpenDeleteModal(false)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: Default.fixPadding,
                    marginRight: isRtl ? 0 : Default.fixPadding * 2,
                    marginLeft: isRtl ? Default.fixPadding * 2 : 0,
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    borderRadius: 5,
                    backgroundColor: Colors.white,
                    ...Default.shadowBtn,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Bold16primary, overflow: "hidden" }}
                  >
                    {tr("cancel")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setAllDelete(true);
                    setOpenDeleteModal(false);
                  }}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: Default.fixPadding,
                    borderRadius: 5,
                    backgroundColor: Colors.primary,
                    ...Default.shadowBtn,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Bold16white, overflow: "hidden" }}
                  >
                    {tr("delete")}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={openDateModal}
        onRequestClose={() => setOpenDateModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setOpenDateModal(false)}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.transparentBlack,
            }}
          >
            <View
              style={{
                maxHeight: height / 1.3,
                width: width * 0.9,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <TouchableWithoutFeedback>
                <View>
                  <Text
                    style={{
                      ...Fonts.Bold18black,
                      textAlign: "center",
                      marginVertical: Default.fixPadding * 1.5,
                      marginHorizontal: Default.fixPadding * 2,
                    }}
                  >
                    {tr("selectDate")}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      paddingHorizontal: Default.fixPadding * 2,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: isRtl ? "row-reverse" : "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: Default.fixPadding * 0.5,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: isRtl ? "row-reverse" : "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            ...Fonts.Bold16black,
                            overflow: "hidden",
                            maxWidth: 50,
                            marginRight: isRtl ? 0 : Default.fixPadding,
                            marginLeft: isRtl ? Default.fixPadding : 0,
                          }}
                        >
                          {tr("from")}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: Default.fixPadding,
                            paddingHorizontal: Default.fixPadding * 0.5,
                            borderRadius: 10,
                            backgroundColor: Colors.white,
                            ...Default.shadow,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{ ...Fonts.Bold14black, overflow: "hidden" }}
                          >
                            {formatDate(fromDate)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: isRtl ? "row-reverse" : "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          marginLeft: isRtl ? 0 : Default.fixPadding,
                          marginRight: isRtl ? Default.fixPadding : 0,
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            ...Fonts.Bold16black,
                            overflow: "hidden",
                            maxWidth: 50,
                            marginRight: isRtl ? 0 : Default.fixPadding,
                            marginLeft: isRtl ? Default.fixPadding : 0,
                          }}
                        >
                          {tr("to")}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: Default.fixPadding,
                            paddingHorizontal: Default.fixPadding * 0.5,
                            borderRadius: 10,
                            backgroundColor: Colors.white,
                            ...Default.shadow,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{ ...Fonts.Bold14black, overflow: "hidden" }}
                          >
                            {toDate ? formatDate(toDate) : formatDate(fromDate)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: Default.fixPadding * 2,
                        marginBottom: Default.fixPadding,
                      }}
                    >
                      <DateTimePicker
                        mode="range"
                        locale="en"
                        minDate={today}
                        height={280}
                        startDate={fromDate}
                        endDate={toDate}
                        onChange={({ startDate, endDate }) => {
                          setFromDate(startDate);
                          setToDate(endDate);
                        }}
                        displayFullDays={true}
                        headerButtonsPosition="around"
                        selectedItemColor={Colors.primary}
                        headerTextStyle={{
                          ...Fonts.Bold16black,
                        }}
                        timePickerDecelerationRate="fast"
                        dayContainerStyle={{
                          borderRadius: 5,
                          margin: 0,
                        }}
                        selectedTextStyle={{
                          ...Fonts.Bold16white,
                        }}
                        todayTextStyle={{
                          ...Fonts.Bold16riverBedColor,
                        }}
                        todayContainerStyle={{
                          borderWidth: null,
                        }}
                        calendarTextStyle={{ ...Fonts.Bold16riverBedColor }}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
              <TouchableWithoutFeedback>
                <View>
                  <View
                    style={{
                      marginVertical: Default.fixPadding * 2,
                      marginHorizontal: Default.fixPadding * 4,
                    }}
                  >
                    <AwesomeButton
                      height={50}
                      onPress={() => {
                        setConfirmDate({
                          fromConfirmDate: formatDate(fromDate),
                          toConfirmDate: toDate
                            ? formatDate(toDate)
                            : formatDate(fromDate),
                        });
                        setOpenDateModal(false);
                      }}
                      raiseLevel={1}
                      stretch={true}
                      borderRadius={10}
                      backgroundShadow={Colors.primary}
                      backgroundDarker={Colors.primary}
                      backgroundColor={Colors.primary}
                    >
                      <Text style={{ ...Fonts.Bold18white }}>{tr("ok")}</Text>
                    </AwesomeButton>
                  </View>

                  <TouchableOpacity
                    onPress={() => setOpenDateModal(false)}
                    style={{
                      alignSelf: "center",
                      marginBottom: Default.fixPadding * 2,
                    }}
                  >
                    <Text style={{ ...Fonts.Bold16grey }}>{tr("close")}</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HistoryScreen;
