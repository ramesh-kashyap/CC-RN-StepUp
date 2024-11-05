import React from "react";
import { Text, View } from "react-native";
import { Colors, Fonts, Default } from "../constants/styles";
import { BarChart } from "react-native-gifted-charts";

const MonthBarChart = (props) => {
  return (
    <View>
      <Text
        style={{
          ...Fonts.SemiBold10grey,
          marginLeft: 28,
        }}
      >
        {props.title}
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginRight: Default.fixPadding * 3,
        }}
      >
        <BarChart
          barWidth={10}
          noOfSections={7}
          barBorderRadius={0}
          frontColor={Colors.primary}
          data={props.data}
          yAxisThickness={2}
          xAxisThickness={2}
          xAxisColor={Colors.grey}
          yAxisColor={Colors.grey}
          height={190}
          rulesColor={Colors.transparent}
          maxValue={1200}
          disableScroll
          initialSpacing={10}
          spacing={10}
          adjustToWidth={false}
          yAxisTextStyle={{
            ...Fonts.SemiBold12grey,
          }}
          xAxisLabelTextStyle={{ ...Fonts.Bold12grey }}
        />
      </View>
    </View>
  );
};

export default MonthBarChart;
