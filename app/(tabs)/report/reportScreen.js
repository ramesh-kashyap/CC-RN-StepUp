import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, Default, Fonts } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import MonthBarChart from "../../../components/monthBarChart";
import YearAreaChart from "../../../components/yearAreaChart";
import DashedLine from "react-native-dashed-line";

const ReportScreen = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`reportScreen:${key}`);
  }

  const reportList = [
    { title: tr("week") },
    { title: tr("month") },
    { title: tr("year") },
  ];

  const [selectedReport, setSelectedReport] = useState(tr("week"));

  const stepsWeekList = [
    {
      key: "1",
      title: "Mon",
      other: "1250",
      progress: 0.4,
    },
    {
      key: "2",
      title: "Tue",
      other: "450",
      progress: 0.5,
    },
    {
      key: "3",
      title: "Wed",
      other: "4560",
      progress: 0.6,
    },
    {
      key: "4",
      title: "Thu",
      other: "1234",
      progress: 0.4,
    },
    {
      key: "5",
      title: "Fri",
      other: "1000",
      progress: 0.7,
    },
    {
      key: "6",
      title: "Sat",
      other: "2000",
      progress: 0.6,
    },
    {
      key: "7",
      title: "Sun",
      other: "500",
      progress: 0.4,
    },
  ];

  const caloriesWeekList = [
    {
      key: "1",
      title: "Mon",
      other: "345",
      progress: 0.4,
    },
    {
      key: "2",
      title: "Tue",
      other: "450",
      progress: 0.5,
    },
    {
      key: "3",
      title: "Wed",
      other: "560",
      progress: 0.6,
    },
    {
      key: "4",
      title: "Thu",
      other: "1234",
      progress: 0.4,
    },
    {
      key: "5",
      title: "Fri",
      other: "1000",
      progress: 0.7,
    },
    {
      key: "6",
      title: "Sat",
      other: "2000",
      progress: 0.6,
    },
    {
      key: "7",
      title: "Sun",
      other: "500",
      progress: 0.4,
    },
  ];

  const distanceWeekList = [
    {
      key: "1",
      title: "Mon",
      km: "0.9km",
      progress: 0.4,
    },
    {
      key: "2",
      title: "Tue",
      km: "5.0km",
      progress: 0.5,
    },
    {
      key: "3",
      title: "Wed",
      km: "2.0km",
      progress: 0.6,
    },
    {
      key: "4",
      title: "Thu",
      km: "1.0km",
      progress: 0.4,
    },
    {
      key: "5",
      title: "Fri",
      km: "2.0km",
      progress: 0.7,
    },
    {
      key: "6",
      title: "Sat",
      km: "5.0km",
      progress: 0.6,
    },
    {
      key: "7",
      title: "Sun",
      km: "3.0km",
      progress: 0.4,
    },
  ];

  const stepsMonthData = [
    { label: "J", value: 500 },
    { label: "F", value: 600 },
    { label: "M", value: 800 },
    { label: "A", value: 1200 },
    { label: "M", value: 1000 },
    { label: "J", value: 700 },
    { label: "J", value: 800 },
    { label: "A", value: 900 },
    { label: "S", value: 500 },
    { label: "O", value: 1000 },
    { label: "N", value: 1200 },
    { label: "D", value: 1000 },
  ];

  const caloriesMonthData = [
    { label: "J", value: 500 },
    { label: "F", value: 600 },
    { label: "M", value: 800 },
    { label: "A", value: 1100 },
    { label: "M", value: 1000 },
    { label: "J", value: 700 },
    { label: "J", value: 800 },
    { label: "A", value: 900 },
    { label: "S", value: 500 },
    { label: "O", value: 1000 },
    { label: "N", value: 1200 },
    { label: "D", value: 1100 },
  ];

  const distanceMonthData = [
    { label: "J", value: 500 },
    { label: "F", value: 600 },
    { label: "M", value: 800 },
    { label: "A", value: 1100 },
    { label: "M", value: 1000 },
    { label: "J", value: 700 },
    { label: "J", value: 800 },
    { label: "A", value: 900 },
    { label: "S", value: 500 },
    { label: "O", value: 1000 },
    { label: "N", value: 1100 },
    { label: "D", value: 1000 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <MyStatusBar />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding * 1.2,
          backgroundColor: Colors.primary,
        }}
      >
        <Text style={{ ...Fonts.Bold20white }}>{tr("report")}</Text>
      </View>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.extraGrey,
        }}
      >
        {reportList.map((item) => {
          return (
            <TouchableOpacity
              key={item.title}
              onPress={() => setSelectedReport(item.title)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Default.fixPadding * 1.3,
                paddingHorizontal: Default.fixPadding,
                backgroundColor: Colors.extraGrey,
              }}
            >
              <Text
                style={{
                  ...(selectedReport === item.title
                    ? Fonts.Bold16primary
                    : Fonts.Bold16grey),
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedReport === tr("week") ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("steps")}
            </Text>
            <View
              style={{
                ...styles.chartViewBox,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                    marginHorizontal: Default.fixPadding * 3,
                  }}
                >
                  April 2022
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.grey}
                />
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginTop: Default.fixPadding * 2,
                }}
              >
                {stepsWeekList.map((item) => {
                  return (
                    <View
                      key={item.key}
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                      }}
                    >
                      <View
                        style={{
                          flex: 8.5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Progress.Bar
                          width={155}
                          height={10}
                          borderWidth={0}
                          progress={item.progress}
                          color={Colors.primary}
                          unfilledColor={Colors.regularPrimary}
                          style={{
                            transform: [{ rotate: "-90deg" }],
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1.5,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingTop: Default.fixPadding * 0.5,
                        }}
                      >
                        <Text numberOfLines={1} style={{ ...Fonts.Bold12grey }}>
                          {item.title}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.Bold12grey }}>
                          {item.other}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: Default.fixPadding * 1.5,
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
                    marginHorizontal: Default.fixPadding * 0.5,
                    maxWidth: 140,
                  }}
                >
                  {tr("average")}
                  {` : 2141`}
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
          </View>

          <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("calories")}
            </Text>
            <View
              style={{
                ...styles.chartViewBox,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                    marginHorizontal: Default.fixPadding * 3,
                  }}
                >
                  April 2022
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.grey}
                />
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginTop: Default.fixPadding * 2,
                }}
              >
                {caloriesWeekList.map((item) => {
                  return (
                    <View
                      key={item.key}
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 220,
                      }}
                    >
                      <View
                        style={{
                          flex: 7.8,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Progress.Bar
                          width={155}
                          height={10}
                          borderWidth={0}
                          progress={item.progress}
                          color={Colors.primary}
                          unfilledColor={Colors.regularPrimary}
                          style={{
                            transform: [{ rotate: "-90deg" }],
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 2.2,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingTop: Default.fixPadding * 0.5,
                        }}
                      >
                        <Text numberOfLines={1} style={{ ...Fonts.Bold12grey }}>
                          {item.title}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.Bold12grey }}>
                          {item.other}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.Bold12grey }}>
                          kcal
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: Default.fixPadding * 1.5,
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
                    maxWidth: 140,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("average")}
                  {` : 2141`}
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
          </View>

          <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("distance")}
            </Text>
            <View
              style={{
                ...styles.chartViewBox,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                    marginHorizontal: Default.fixPadding * 3,
                  }}
                >
                  April 2022
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.grey}
                />
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginTop: Default.fixPadding * 2,
                }}
              >
                {distanceWeekList.map((item) => {
                  return (
                    <View
                      key={item.key}
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                      }}
                    >
                      <View
                        style={{
                          flex: 8.5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Progress.Bar
                          width={155}
                          height={10}
                          borderWidth={0}
                          progress={item.progress}
                          color={Colors.primary}
                          unfilledColor={Colors.regularPrimary}
                          style={{
                            transform: [{ rotate: "-90deg" }],
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1.5,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingTop: Default.fixPadding * 0.5,
                        }}
                      >
                        <Text
                          numberOfLines={2}
                          style={{ ...Fonts.Bold12grey, overflow: "hidden" }}
                        >
                          {item.title}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.Bold12grey }}>
                          {item.km}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: Default.fixPadding * 1.5,
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
                    maxWidth: 140,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("average")}
                  {` : 2141`}
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
          </View>
        </ScrollView>
      ) : selectedReport === tr("month") ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("steps")}
            </Text>

            <View
              style={{
                ...styles.chartViewBox,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                    marginHorizontal: Default.fixPadding * 3,
                  }}
                >
                  Year 2022
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.grey}
                />
              </View>

              <MonthBarChart data={stepsMonthData} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: Default.fixPadding * 1.5,
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
                    maxWidth: 140,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("average")}
                  {` : 3541`}
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

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("calories")}
            </Text>

            <View
              style={{
                ...styles.chartViewBox,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                    marginHorizontal: Default.fixPadding * 3,
                  }}
                >
                  Year 2022
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.grey}
                />
              </View>

              <MonthBarChart data={caloriesMonthData} title={"(Kcal)"} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: Default.fixPadding * 1.5,
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
                    maxWidth: 140,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("average")}
                  {` : 52544`}
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

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("distance")}
            </Text>

            <View
              style={{
                ...styles.chartViewBox,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                    marginHorizontal: Default.fixPadding * 3,
                  }}
                >
                  Year 2022
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.grey}
                />
              </View>

              <MonthBarChart data={distanceMonthData} title={"(Km)"} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: Default.fixPadding * 1.5,
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
                    maxWidth: 140,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("average")}
                  {` : 2141`}
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
          </View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("steps")}
            </Text>

            <View
              style={{
                paddingVertical: Default.fixPadding,
                marginTop: Default.fixPadding,
                marginBottom: Default.fixPadding * 1.5,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                  }}
                >
                  Year 2016-2022
                </Text>
              </View>

              <YearAreaChart
                title={tr("average")}
                average={2141}
                other={tr("steps")}
              />
            </View>

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("calories")}
            </Text>

            <View
              style={{
                paddingVertical: Default.fixPadding,
                marginTop: Default.fixPadding,
                marginBottom: Default.fixPadding * 1.5,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                  }}
                >
                  Year 2016-2022
                </Text>
              </View>

              <YearAreaChart
                title={tr("average")}
                average={2141}
                other={"kcal"}
              />
            </View>

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
              }}
            >
              {tr("distance")}
            </Text>

            <View
              style={{
                paddingVertical: Default.fixPadding,
                marginTop: Default.fixPadding,
                marginBottom: Default.fixPadding * 1.5,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                  }}
                >
                  Year 2016-2022
                </Text>
              </View>

              <YearAreaChart
                title={tr("average")}
                average={254141}
                other={"km"}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  chartViewBox: {
    padding: Default.fixPadding,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
