import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Stars from "react-native-stars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AwesomeButton from "react-native-really-awesome-button";
import { useNavigation } from "expo-router";

const { height } = Dimensions.get("window");

const GiveRateScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`giveRateScreen:${key}`);
  }

  const [comment, setComment] = useState();

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
          {tr("giveRate")}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flexGrow: Platform.OS === "ios" ? null : 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: Default.fixPadding * 5,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
            paddingHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Image
            source={require("../../assets/images/rating.png")}
            style={{
              alignSelf: "center",
              resizeMode: "contain",
              width: 132,
              height: 131,
              marginTop: -Default.fixPadding * 4,
              marginBottom: Default.fixPadding * 3,
            }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ ...Fonts.Bold20black }}>{tr("enjoyingApp")}</Text>
            <Text
              style={{
                ...Fonts.SemiBold15black,
                textAlign: "center",
                marginTop: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 3,
              }}
            >
              {tr("pleaseTell")}
            </Text>

            <View
              style={{
                alignItems: "center",
                marginBottom: Default.fixPadding * 2.5,
              }}
            >
              <Stars
                default={3.5}
                count={5}
                half={true}
                spacing={15}
                starSize={35}
                fullStar={
                  <FontAwesome
                    name="star"
                    size={35}
                    color={Colors.lightOrange}
                  />
                }
                emptyStar={
                  <FontAwesome name="star" size={35} color={Colors.lightGrey} />
                }
                halfStar={
                  <FontAwesome
                    name="star-half-empty"
                    size={35}
                    color={Colors.lightOrange}
                  />
                }
              />
            </View>
          </View>
          <TextInput
            value={comment}
            multiline={true}
            numberOfLines={7}
            textAlignVertical="top"
            onChangeText={setComment}
            placeholder={tr("comments")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              textAlign: isRtl ? "right" : "left",
              height: height / 6,
              ...styles.textInput,
            }}
          />

          <View
            style={{
              marginBottom: Default.fixPadding * 3,
            }}
          >
            <AwesomeButton
              progress
              height={50}
              progressLoadingTime={1000}
              onPress={(next) => {
                setTimeout(() => {
                  next();
                  navigation.pop();
                }, 1000);
              }}
              raiseLevel={1}
              stretch={true}
              borderRadius={10}
              backgroundShadow={Colors.primary}
              backgroundDarker={Colors.primary}
              backgroundColor={Colors.primary}
            >
              <Text style={{ ...Fonts.ExtraBold18white }}>{tr("verify")}</Text>
            </AwesomeButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GiveRateScreen;

const styles = StyleSheet.create({
  textInput: {
    ...Fonts.Bold16black,
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 3,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
