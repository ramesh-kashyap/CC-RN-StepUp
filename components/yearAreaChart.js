import React from "react";
import { Text, View, Dimensions } from "react-native";
import { Colors, Fonts, Default } from "../constants/styles";
import DashedLine from "react-native-dashed-line";
import { LineChart } from "react-native-gifted-charts";

const { width } = Dimensions.get("window");

const YearAreaChart = (props) => {
  const labelData = [
    {
      key: 1,
      value: 100,
    },
    {
      key: 2,
      value: 250,
      label: "Yr2018",
      labelTextStyle: { ...Fonts.Bold12grey, marginTop: 2 },
    },
    {
      key: 3,
      value: 130,
      label: "Yr2019",
      labelTextStyle: { ...Fonts.Bold12grey, marginTop: 2 },
    },
    {
      key: 4,
      value: 250,
      label: "Yr2020",
      labelTextStyle: { ...Fonts.Bold12grey, marginTop: 2 },
    },
    {
      key: 5,
      value: 150,
      label: "Yr2021",
      labelTextStyle: { ...Fonts.Bold12grey, marginTop: 2 },
    },
    {
      key: 6,
      value: 200,
      label: "Yr2022",
      labelTextStyle: { ...Fonts.Bold12grey, marginTop: 2 },
    },
    {
      key: 6,
      value: 300,
    },
  ];

  return (
    <View>
      <View
        style={{
          alignSelf: "center",
          marginTop: Default.fixPadding * 2,
          overflow: "hidden",
          marginRight: Default.fixPadding,
        }}
      >
        <LineChart
          areaChart
          curved
          initialSpacing={0}
          endSpacing={0}
          data={labelData}
          height={130}
          width={width * 0.89}
          hideDataPoints
          spacing={60}
          thickness={5}
          color={Colors.primary}
          hideAxesAndRules
          hideYAxisText
          startFillColor={"rgba(1, 135, 95, 0.05)"}
          endFillColor={"rgba(1, 135, 95, 0)"}
          startOpacity={0.2}
          endOpacity={0.01}
          maxValue={400}
          disableScroll={true}
          adjustToWidth={true}
          pointerConfig={{
            pointerStripColor: Colors.primary,
            pointerStripWidth: 0,
            showPointerStrip: true,
            pointerStripUptoDataPoint: true,
            shiftPointerLabelY: 40,
            pointerComponent: () => {
              return (
                <View
                  style={{
                    width: 37,
                    height: 140,
                    backgroundColor: "rgba(1, 135, 95, 0.3)",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    alignItems: "center",
                    marginTop: -20,
                    marginLeft: -23,
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      borderWidth: 7,
                      borderColor: Colors.white,
                      backgroundColor: Colors.primary,
                      marginTop: Default.fixPadding,
                    }}
                  />
                </View>
              );
            },
          }}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          ...Fonts.Bold12grey,
          marginTop: Default.fixPadding * 0.3,
        }}
      >
        {props.other}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding * 1.2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <DashedLine
          dashGap={2.5}
          dashLength={2.5}
          dashThickness={1.5}
          dashColor={Colors.grey}
          style={{ flex: 1 }}
        />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.Bold14black,
            textAlign: "center",
            overflow: "hidden",
            top: -Default.fixPadding * 0.5,
            paddingTop: Default.fixPadding * 0.7,
            maxValue: 140,
            marginHorizontal: Default.fixPadding * 0.5,
          }}
        >
          {props.title}
          {` : ${props.average}`}
        </Text>
        <DashedLine
          dashGap={2.5}
          dashLength={2.5}
          dashThickness={1.5}
          dashColor={Colors.grey}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default YearAreaChart;
