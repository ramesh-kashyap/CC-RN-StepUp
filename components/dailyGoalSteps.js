import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../constants/styles";
import WheelPicker from "react-native-wheely";

const { height } = Dimensions.get("window");

const DailyGoalSteps = () => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`dailyGoalSteps:${key}`);
  }
  const [selectedIndex, setSelectedIndex] = useState(3);

  const StepsList = [
    "100",
    "500",
    "1000",
    "1500",
    "2000",
    "2500",
    "3000",
    "3500",
    "4000",
    "4500",
    "5000",
    "5500",
    "6000",
  ];

  return (
    <View style={{ marginTop: Default.fixPadding * 4 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.Bold20black }}>{tr("goalSteps")}</Text>
        <Text
          style={{
            ...Fonts.Bold14grey,
            textAlign: "center",
            marginTop: Default.fixPadding * 0.5,
            marginHorizontal: Default.fixPadding,
          }}
        >
          {tr("description")}
        </Text>
      </View>

      <View
        style={{ justifyContent: "center", marginTop: Default.fixPadding * 7 }}
      >
        <Text
          style={{
            ...Fonts.Bold18black,
            textAlign: "center",
            marginBottom: Default.fixPadding * 2,
          }}
        >
          {tr("steps")}
        </Text>
        <View
          style={{
            justifyContent: "center",
            height: height / 2.7,
          }}
        >
          <WheelPicker
            options={StepsList}
            selectedIndex={selectedIndex}
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

export default DailyGoalSteps;
