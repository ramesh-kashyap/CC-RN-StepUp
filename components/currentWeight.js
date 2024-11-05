import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../constants/styles";
import WheelPicker from "react-native-wheely";

const { height } = Dimensions.get("window");

const CurrentWeight = () => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`currentWeight:${key}`);
  }
  const [selectedIndex, setSelectedIndex] = useState(2);

  const weightList = ["40", "45", "50", "55", "60", "65", "70", "75", "80"];

  return (
    <View style={{ marginTop: Default.fixPadding * 4 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.Bold20black }}>{tr("currentWeight")}</Text>
      </View>

      <View
        style={{ justifyContent: "center", marginTop: Default.fixPadding * 5 }}
      >
        <Text
          style={{
            ...Fonts.Bold18black,
            textAlign: "center",
          }}
        >
          {tr("weight")}
        </Text>
        <View
          style={{
            justifyContent: "center",
            height: height / 2.7,
          }}
        >
          <WheelPicker
            selectedIndex={selectedIndex}
            options={weightList}
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
    </View>
  );
};

export default CurrentWeight;
