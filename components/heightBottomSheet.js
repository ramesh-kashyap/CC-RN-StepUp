import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../constants/styles";
import WheelPicker from "react-native-wheely";
import { BottomSheet } from "react-native-btr";
import AwesomeButton from "react-native-really-awesome-button";

const { height } = Dimensions.get("window");

const HeightBottomSheet = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`heightBottomSheet:${key}`);
  }
  const [selectedIndex, setSelectedIndex] = useState(2);

  const heightList = ["01", "02", "03", "04", "05", "06", "07", "08","09", "10","11","12","13","14","15","16","17","18","19","20"];
  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props.closeHeightBottomSheet}
      onBackdropPress={props.closeHeightBottomSheet}
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
            {tr("height")}
          </Text>
        </View>

        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: "center",
            marginTop: Default.fixPadding * 3,
            marginBottom: Default.fixPadding * 2,
          }}
        >
          {tr("height")}(In)
        </Text>
        <View
          style={{
            justifyContent: "center",
            height: height / 3.1,
          }}
        >
          <WheelPicker
            selectedIndex={selectedIndex}
            options={heightList}
            visibleRest={5}
            itemHeight={50}
            decelerationRate="fast"
            itemTextStyle={{ ...Fonts.Bold25black }}
            onChange={(index) => {
              return setSelectedIndex(index);
            }}
            containerStyle={{
              marginHorizontal: Default.fixPadding * 2,
            }}
            selectedIndicatorStyle={{
              borderRadius: 10,
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
            onPress={props.closeHeightBottomSheet}
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
          onPress={props.closeHeightBottomSheet}
          style={{
            alignSelf: "center",
            marginBottom: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default HeightBottomSheet;

const styles = StyleSheet.create({
  bottomSheetMain: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
  },
});
