import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../constants/styles";
import WheelPicker from "react-native-wheely";

const { height } = Dimensions.get("window");

const CurrentHeight = () => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`currentHeight:${key}`);
  }
  const [selectedIndex, setSelectedIndex] = useState(2);

  const heightList = ["02", "03", "04", "05", "06", "07", "08", "09", "10"];

  return (
    <View style={{ marginTop: Default.fixPadding * 4 }}>
      <Text
        style={{
          ...Fonts.Bold18black,
          textAlign: "center",
          marginBottom: Default.fixPadding * 0.4,
        }}
      >
        {tr("chooseCurrentHeight")}
      </Text>
      <Text
        style={{
          ...Fonts.SemiBold14grey,
          textAlign: "center",
          marginBottom: Default.fixPadding * 5,
        }}
      >
        {tr("distanceIt")}
      </Text>
      <Text
        style={{
          ...Fonts.Bold18black,
          textAlign: "center",
        }}
      >
        {tr("height")}
      </Text>
      <View
        style={{
          justifyContent: "center",
          height: height / 2.7,
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
    </View>
  );
};

export default CurrentHeight;
