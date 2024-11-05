import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const SelectGender = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`selectGender:${key}`);
  }
  const genderList = [
    {
      key: "1",
      image: require("../assets/images/male.png"),
    },
    {
      key: "2",
      image: require("../assets/images/female.png"),
    },
  ];
  const [selectedGender, setSelectedGender] = useState("1");
  return (
    <View style={{ marginTop: Default.fixPadding * 4 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.Bold20black }}>{tr("selectGender")}</Text>
        <Text
          style={{
            ...Fonts.Bold14grey,
            textAlign: "center",
            marginTop: Default.fixPadding * 0.5,
          }}
        >
          {tr("selectGenderIt")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          marginVertical: Default.fixPadding * 6,
          marginHorizontal: Default.fixPadding,
        }}
      >
        {genderList.map((item) => {
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelectedGender(item.key)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: Default.fixPadding,
                paddingBottom: Default.fixPadding * 2.4,
                borderWidth: 1,
                borderColor:
                  selectedGender === item.key
                    ? Colors.primary
                    : Colors.transparent,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <Ionicons
                name={
                  selectedGender === item.key
                    ? "checkmark-circle-sharp"
                    : "ellipse"
                }
                size={23}
                color={
                  selectedGender === item.key
                    ? Colors.primary
                    : Colors.lightGrey
                }
                style={{
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding * 0.5,
                }}
              />
              <Image
                source={item.image}
                style={{
                  resizeMode: "contain",
                  width: 130,
                  height: 130,
                  paddingHorizontal: Default.fixPadding,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SelectGender;
