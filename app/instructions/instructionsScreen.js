import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";

const InstructionsScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`instructionsScreen:${key}`);
  }

  const instructionsList = [
    {
      key: "1",
      question: tr("question1"),
    },
    {
      key: "2",
      question: tr("question3"),
    },
    {
      key: "3",
      question: tr("question3"),
    },
    {
      key: "4",
      question: tr("question4"),
    },
    {
      key: "5",
      question: tr("question5"),
    },
    {
      key: "6",
      question: tr("question6"),
    },
  ];

  const [instructionsData, setInstructionsData] = useState(instructionsList);

  const onSelectItem = (item) => {
    const newItem = instructionsData.map((val) => {
      if (val.key === item.key) {
        return { ...val, selected: !val.selected };
      } else {
        return val;
      }
    });
    setInstructionsData(newItem);
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
          {tr("instructions")}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: Default.fixPadding * 2 }}>
          {instructionsData.map((item) => {
            return (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.8}
                onPress={() => onSelectItem(item)}
                style={{
                  paddingVertical: Default.fixPadding * 1.5,
                  paddingHorizontal: Default.fixPadding * 2.2,
                  marginBottom: Default.fixPadding * 2,
                  marginHorizontal: Default.fixPadding * 2,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold16black,
                      flex: 1,
                      textAlign: isRtl ? "right" : "left",
                      overflow: "hidden",
                    }}
                  >
                    {item.question}
                  </Text>

                  <Ionicons
                    name={
                      item.selected
                        ? "chevron-up-outline"
                        : "chevron-down-outline"
                    }
                    size={20}
                    color={Colors.black}
                  />
                </View>
                {item.selected && (
                  <View style={{ marginTop: Default.fixPadding * 1.2 }}>
                    <Text
                      style={{
                        ...Fonts.Regular14grey,
                        textAlign: isRtl ? "right" : "left",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas amet ut eget eu nibh lorem velit. Id ornare
                      lectus mauris, mauris. Pharetra, amet erat feugiat
                      duis.Maecenas amet ut eget eu nibh lorem velit. Id ornare
                      lectus mauris, mauris. Pharetra, amet erat feugiat
                      duis.eget eu nibh lorem velit. Id ornare lectus mauris,
                      mauris. Pharetra,
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default InstructionsScreen;
