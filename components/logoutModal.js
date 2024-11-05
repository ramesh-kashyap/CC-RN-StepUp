import React from "react";
import { Text, View, Modal, TouchableOpacity, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback } from "react-native";

const { width } = Dimensions.get("window");

const LogoutModal = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`logoutModal:${key}`);
  }
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props.visible}
      onRequestClose={props.closeLogoutModal}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.closeLogoutModal}
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
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color={Colors.red}
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
                  onPress={props.closeLogoutModal}
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
                  onPress={props.onLogoutHandler}
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
                    {tr("logout")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogoutModal;
