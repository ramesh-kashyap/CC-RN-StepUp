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
import moment from "moment";

const AwardsScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const [data, setData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [openHeightBottomSheet, setOpenHeightBottomSheet] = useState(false);


  const formatDateTime = (isoDate) => {
    return moment(isoDate).format("MMMM DD, YYYY hh:mm:ss A");
  };
  function tr(key) {
    return t(`awardsScreen:${key}`);
  }

  const fetchData = async () => {
    try {
      const response = await Api.get('/transactionHistory'); // Replace with your actual GET endpoint

    
      if (response.data.success) {
        // Handle the successful response here
        setData(response.data.data.level_income);
        console.log(response.data.data);

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

  const fetchProfileData = async () => {
    try {
      const response = await Api.get('/userInfo'); // Replace with your actual GET endpoint

    
      if (response.data.success) {
        // Handle the successful response here
       
        setProfileData(response.data.data);        

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
    fetchProfileData();
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
            width: 45,
            height: 45,
            borderRadius: 28,
            borderWidth: 1,
            borderColor: Colors.primary,
            backgroundColor: Colors.lightRegularPrimary,
          }}
        >
         <Image
              source={require("../../../assets/images/usdt.png")}
              style={{ width: 40, height: 40, resizeMode: "contain" }}
            />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold14black }}>
            {item.remarks}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.SemiBold12black,
              overflow: 'hidden',
              textAlign: isRtl ? 'right' : 'left',
              marginVertical: Default.fixPadding * 0.3,
            }}
          >
            {item.status}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.SemiBold14grey }}>
            
          {formatDateTime(item.created_at)}
          </Text>
        </View>

        <Text
          style={{
            ...Fonts.Bold16black, // Same font style as Deposit
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
    flexDirection: "row", // Arrange text and icon in a row
    alignItems: "center", // Vertically center the items
    paddingHorizontal: Default.fixPadding * 2,
    paddingVertical: Default.fixPadding * 1.2,
    backgroundColor: Colors.primary,
  }}
>
  <Text
    style={{
      ...Fonts.Bold20white,
      flex: 1, // Take up available space to center the text
      textAlign: "center", // Ensure text is centered within its container
    }}
  >
    {tr("awards")}
  </Text>
  
  <TouchableOpacity
    onPress={() => navigation.push("notification/notificationScreen")}
  >
    <Ionicons
      name="document-text-outline"
      size={24}
      color={Colors.white}
    />
  </TouchableOpacity>
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
          ${profileData.availableBalance}
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
              ${profileData.totalInvestSum}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
             Total Investment
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
            ${profileData.totalWithdrawalSum}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              Total withdraw
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
