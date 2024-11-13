import React, { useState ,useEffect} from "react"; 
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,Alert,FlatList 
} from "react-native";
import { Colors, Default, Fonts } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import Api from '../../../services/Api.js'; // Adjust path if necessary


const AwardsScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const [data, setData] = useState([]);
  const [openHeightBottomSheet, setOpenHeightBottomSheet] = useState(false);



  function tr(key) {
    return t(`awardsScreen:${key}`);
  }

  const fetchData = async () => {
    try {
      const response = await Api.get('/transactionHistory'); // Replace with your actual GET endpoint

    
      if (response.data.success) {
        // Handle the successful response here
        setData(response.data.data.level_income);

      } else {
        Alert.alert("Error", response.data.errors);
      }
    } catch (error) {
      console.log("Error details:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.errors);
      } else {
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    }
  };


  useEffect(() => {

    fetchData(); // Call fetchData when component mounts

  }, []); 
 

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: Colors.extraLightGrey, paddingVertical: Default.fixPadding * 1 }}>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 55,
            height: 55,
            borderRadius: 28,
            borderWidth: 1,
            borderColor: Colors.primary,
            backgroundColor: Colors.lightRegularPrimary,
          }}
        >
         <Image
              source={require("../../../assets/images/usdt.png")}
              style={{ width: 50, height: 50, resizeMode: "contain" }}
            />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            {item.remarks}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.SemiBold14black,
              overflow: 'hidden',
              textAlign: isRtl ? 'right' : 'left',
              marginVertical: Default.fixPadding * 0.3,
            }}
          >
            {item.status}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.SemiBold14grey }}>
            {item.created_at}
          </Text>
        </View>

        <Text
          style={{
            ...Fonts.Bold20black, // Same font style as Deposit
            textAlign: 'right',
            marginLeft: 'auto', // Ensures the amount is aligned to the right
            paddingRight: Default.fixPadding,
          }}
        >
          ${item.comm}
        </Text>
      </View>
    </View>
  );


  

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
        <Text style={{ ...Fonts.Bold20white }}>{tr("awards")}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flexGrow: Platform.OS === "ios" ? null : 1,
        }}
      >
       <View
        style={{
          marginTop: Default.fixPadding * 2 ,
          marginHorizontal: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            paddingTop: Default.fixPadding * 0.7,
            paddingBottom: Default.fixPadding,
            borderBottomWidth: 1,
            borderBottomColor: Colors.extraLightPrimary,
          }}
        >
          <Text style={{ ...Fonts.Bold14black, textAlign: "center" }}>
            My Assets
          </Text>
          <Text style={{ ...Fonts.SemiBold20black, textAlign: "center" }}>
           $200
          </Text>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            padding: Default.fixPadding,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/images/usdt.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
              $100
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
             Total Balance
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderLeftWidth: 1,
              borderLeftColor: Colors.extraLightPrimary,
            }}
          >
            <Image
              source={require("../../../assets/images/usdt.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
            <Text
              style={{
                ...Fonts.SemiBold14black,
                marginTop: Default.fixPadding,
              }}
            >
             $30
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              Active Balance
            </Text>
          </View>
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
  {/* First Button */}
  <TouchableOpacity
    onPress={() => {
      navigation.push("deposit/deposit")
    }}
    style={{
      flexDirection: isRtl ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: Default.fixPadding * 1,
      paddingVertical: Default.fixPadding * 0.8,
      marginTop: Default.fixPadding * 2,
      marginBottom: Default.fixPadding * 2.5,
      marginHorizontal: Default.fixPadding * 0.5, // Space between buttons
      borderRadius: 10,
      backgroundColor: Colors.white,
      ...Default.shadow,
    }}
  >
    <Image
              source={require("../../../assets/images/usdt.png")}
              style={{ width: 25, height: 25, resizeMode: "contain", paddingRight: isRtl ? 10 : Default.fixPadding,
                paddingLeft: isRtl ? Default.fixPadding : 10, }}
            />
    <Text
      numberOfLines={1}
      style={{
        ...Fonts.SemiBold16primary,
        overflow: "hidden",
        paddingLeft: isRtl ? 0 : Default.fixPadding,
        paddingRight: isRtl ? Default.fixPadding : 0,
        borderLeftWidth: isRtl ? null : 1,
        borderLeftColor: isRtl ? null : Colors.grey,
        borderRightWidth: isRtl ? 1 : null,
        borderRightColor: isRtl ? Colors.grey : null,
      }}
    >
      Deposit
    </Text>
  </TouchableOpacity>

  {/* Second Button */}
  <TouchableOpacity
     onPress={() => {
      navigation.push("withdraw/withdraw")
    }}
    style={{
      flexDirection: isRtl ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: Default.fixPadding * 1,
      paddingVertical: Default.fixPadding * 0.8,
      marginTop: Default.fixPadding * 2,
      marginBottom: Default.fixPadding * 2.5,
      marginHorizontal: Default.fixPadding * 0.5, // Space between buttons
      borderRadius: 10,
      backgroundColor: Colors.white,
      ...Default.shadow,
    }}
  >
    <Image
              source={require("../../../assets/images/usdt.png")}
              style={{ width: 25, height: 25, resizeMode: "contain", paddingRight: isRtl ? 10 : Default.fixPadding,
                paddingLeft: isRtl ? Default.fixPadding : 10, }}
            />
    <Text
      numberOfLines={1}
      style={{
        ...Fonts.SemiBold16primary,
        overflow: "hidden",
        paddingLeft: isRtl ? 0 : Default.fixPadding,
        paddingRight: isRtl ? Default.fixPadding : 0,
        borderLeftWidth: isRtl ? null : 1,
        borderLeftColor: isRtl ? null : Colors.grey,
        borderRightWidth: isRtl ? 1 : null,
        borderRightColor: isRtl ? Colors.grey : null,
      }}
    >
     Withdraw
    </Text>
  </TouchableOpacity>
</View>

          <Text
            style={{ textAlign: isRtl ? "right" : "left", ...Fonts.Bold16grey,  marginHorizontal: Default.fixPadding*1.8, }}
          >
           Recent Assets
          </Text>

          <View
      >

<FlatList
      data={data} // Array of data to display
      renderItem={renderItem}
      keyExtractor={(item) => item.id} // Unique identifier for each item
    />


</View>



      </ScrollView>
    </View>
  );
};

export default AwardsScreen;

const styles = StyleSheet.create({
  stepsBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.2,
    marginTop: Default.fixPadding * 1.2,
    marginBottom: Default.fixPadding * 2.5,
    marginHorizontal: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
