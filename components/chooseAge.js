import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../constants/styles";
import WheelPicker from "react-native-wheely";

const { height } = Dimensions.get("window");

const ChooseAge = () => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`chooseAge:${key}`);
  }
  const [selectedIndex, setSelectedIndex] = useState(2);

  const ageList = ["20", "22", "25", "30", "35", "38", "40", "42", "45"];

  return (
    <View style={{ marginTop: Default.fixPadding * 4 }}>
      <Text
        style={{
          ...Fonts.Bold18black,
          textAlign: "center",
          marginBottom: Default.fixPadding * 0.4,
        }}
      >
        {tr("chooseYourAge")}
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
        {tr("age")}
      </Text>
      <View
        style={{
          justifyContent: "center",
          height: height / 2.7,
        }}
      >
        <WheelPicker
          selectedIndex={selectedIndex}
          options={ageList}
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

export default ChooseAge;
