import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import AwesomeButton from "react-native-really-awesome-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectGender from "../../components/selectGender";
import DailyGoalSteps from "../../components/dailyGoalSteps";
import CurrentWeight from "../../components/currentWeight";
import CurrentHeight from "../../components/currentHeight";
import ChooseAge from "../../components/chooseAge";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const SetGoalScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`setGoalScreen:${key}`);
  }

  const ref = useRef();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slidesList = [
    {
      key: "1",
      component: SelectGender,
    },
    {
      key: "2",
      component: DailyGoalSteps,
    },
    {
      key: "3",
      component: CurrentWeight,
    },
    {
      key: "4",
      component: CurrentHeight,
    },
    {
      key: "5",
      component: ChooseAge,
    },
  ];

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slidesList.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const renderItemSlides = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          width: width,
        }}
      >
        <item.component />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{
          alignSelf: isRtl ? "flex-end" : "flex-start",
          marginTop: Default.fixPadding * 1.2,
          marginBottom: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Ionicons
          name={isRtl ? "arrow-forward-outline" : "arrow-back-outline"}
          size={25}
          color={Colors.black}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        {slidesList.map((item, index) => (
          <View
            key={item.key}
            style={[
              styles.dotIndicator,
              currentSlideIndex == index && {
                backgroundColor: Colors.primary,
              },
            ]}
          />
        ))}
      </View>

      <FlatList
        ref={ref}
        horizontal
        pagingEnabled
        data={slidesList}
        renderItem={renderItemSlides}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
      />

      <Text
        style={{
          ...Fonts.SemiBold14grey,
          textAlign: "center",
          marginTop: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        {tr("weNeverShare")}
      </Text>

      <View
        style={{
          marginTop: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        {currentSlideIndex == slidesList.length - 1 ? (
          <AwesomeButton
            progress
            height={50}
            progressLoadingTime={1500}
            onPress={(next) => {
              setTimeout(() => {
                next();
                navigation.push("(tabs)");
              }, 1500);
            }}
            raiseLevel={1}
            stretch={true}
            borderRadius={10}
            backgroundShadow={Colors.primary}
            backgroundDarker={Colors.primary}
            backgroundColor={Colors.primary}
          >
            <Text style={{ ...Fonts.ExtraBold18white }}>{tr("continue")}</Text>
          </AwesomeButton>
        ) : (
          <AwesomeButton
            height={50}
            onPress={() => goToNextSlide()}
            raiseLevel={1}
            stretch={true}
            borderRadius={10}
            backgroundShadow={Colors.primary}
            backgroundDarker={Colors.primary}
            backgroundColor={Colors.primary}
          >
            <Text style={{ ...Fonts.ExtraBold18white }}>{tr("continue")}</Text>
          </AwesomeButton>
        )}
      </View>
    </View>
  );
};

export default SetGoalScreen;

const styles = StyleSheet.create({
  dotIndicator: {
    width: 28,
    height: 4,
    marginHorizontal: Default.fixPadding * 0.4,
    backgroundColor: Colors.lightGrey,
  },
});
