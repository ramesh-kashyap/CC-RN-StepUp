import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const ReminderScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`reminderScreen:${key}`);
  }

  const reminderList = [
    {
      key: "1",
      title: "Robert walking ",
      time: "5:30 am",
      other: "Monday, Tuesday",
    },
    {
      key: "2",
      title: "Jeklin walking ",
      time: "9:30 pm",
      other: "Monday, Tuesday",
    },
  ];
  const [successfullyRemoveToast, setSuccessFullyRemoveToast] = useState(false);

  const [deleteItemModal, setDeleteItemModal] = useState(false);

  const [reminderData, setReminderData] = useState(reminderList);
  const [selectedKey, setSelectedKey] = useState("");

  const deleteItemHandler = () => {
    const filteredData = reminderData.filter(
      (item) => item.key !== selectedKey
    );
    setReminderData(filteredData);
  };

  const renderItem = ({ item, index }) => {
    const firstItem = index === 0;
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingVertical: Default.fixPadding * 1.3,
          marginHorizontal: Default.fixPadding * 2,
          borderTopWidth: firstItem ? null : 1,
          borderTopColor: firstItem ? null : Colors.grey,
        }}
      >
        <View
          style={{ flex: 9, alignItems: isRtl ? "flex-end" : "flex-start" }}
        >
          <Text style={{ ...Fonts.Bold16black }}>{item.title}</Text>
          <Text
            style={{
              ...Fonts.SemiBold18black,
              marginTop: Default.fixPadding * 0.6,
              marginBottom: Default.fixPadding * 0.3,
            }}
          >
            {item.time}
          </Text>
          <Text style={{ ...Fonts.SemiBold14grey }}>{item.other}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setDeleteItemModal(true);
            setSelectedKey(item.key);
          }}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: isRtl ? "flex-start" : "flex-end",
            paddingBottom: Default.fixPadding,
          }}
        >
          <AntDesign name="delete" size={20} color={Colors.red} />
        </TouchableOpacity>
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
          {tr("reminder")}
        </Text>
      </View>

      {reminderData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Image
            source={require("../../assets/images/clockGrey.png")}
            style={{ width: 48, height: 48, resizeMode: "contain" }}
          />
          <Text style={{ ...Fonts.Bold18grey, marginTop: Default.fixPadding }}>
            {tr("noReminderAdded")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={reminderData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                marginTop: Default.fixPadding * 2,
                marginBottom: Default.fixPadding * 0.7,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text
                style={{
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.Bold18primary,
                }}
              >
                {tr("walkingReminder")}
              </Text>
              <Text
                style={{
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold14grey,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {tr("setYourWalking")}
              </Text>
            </View>
          )}
        />
      )}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.push("addReminder/addReminderScreen")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 66,
            height: 66,
            borderRadius: 33,
            backgroundColor: Colors.primary,
          }}
        >
          <Feather name="plus" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={deleteItemModal}
        onRequestClose={() => setDeleteItemModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setDeleteItemModal(false)}
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
            <TouchableWithoutFeedback>
              <View
                style={{
                  padding: Default.fixPadding * 2,
                  width: width * 0.9,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
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
                    <Image
                      source={require("../../assets/images/clock.png")}
                      style={{ width: 24, height: 24, resizeMode: "contain" }}
                    />
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
                    onPress={() => setDeleteItemModal(false)}
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
                      deleteItemHandler();
                      setDeleteItemModal(false);
                      setSuccessFullyRemoveToast(true);
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
                      {tr("remove")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>

      <SnackbarToast
        title={tr("success")}
        visible={successfullyRemoveToast}
        onDismiss={() => setSuccessFullyRemoveToast(false)}
      />
    </View>
  );
};

export default ReminderScreen;
