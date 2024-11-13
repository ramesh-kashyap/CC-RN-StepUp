import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
    ,Dimensions
  } from "react-native";
  import React, { useState,useEffect } from "react";
  import { useTranslation } from "react-i18next";
  import Api from '../../services/Api.js'; // Adjust path if necessary
  import { Colors, Default, Fonts } from "../../constants/styles";
  import MyStatusBar from "../../components/myStatusBar";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { useNavigation } from "expo-router";
  import QRCode from 'react-native-qrcode-svg';


  const { height } = Dimensions.get("window");

  
  const deposit = () => {
    const navigation = useNavigation();
  
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`deposit:${key}`);
    }
  
    const stepsList = [
        "USDTTRC20",
        "USDTBEP20",
      ];
  
    const [data, setData] = useState([]);
    


   

  
    const fetchData = async () => {
        try {
          const response = await Api.get('/confirmPay'); // Replace with your actual GET endpoint
    
        
          if (response.data.success) {
            // Handle the successful response here
            console.log(response.data.data);
            setData(response.data.data);
    
          } else {
           
            console.log(response.data.error);


            Alert.alert("Error", response.data.error);
          }
        } catch (error) {
          console.log("Error details:", error);
          if (error.response) {
            Alert.alert("Error", error.response.data.error);
          } else {
            Alert.alert("Error", "An error occurred. Please try again.");
          }
        }
      };
    
    
      useEffect(() => {
    
        fetchData(); // Call fetchData when component mounts
    
      }, []); 
      
   
  
    const [walletAddressBottomSheet, setWalletAddressBottomSheet] = useState(false);
    const [amountBottomSheet, setAmountBottomSheet] = useState(false);
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
           Deposit
          </Text>
        </View>
  
  
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
         
  
          <View style={{ marginHorizontal: Default.fixPadding * 2,marginTop: Default.fixPadding * 2  }}>

          <View style={{ marginHorizontal: Default.fixPadding * 2,marginTop: Default.fixPadding * 2 ,marginBottom: Default.fixPadding * 2 , alignItems: 'center', }}>
           <QRCode
              value={data.usdt_address} 
              size={170}
             color="black"
             backgroundColor="white"
           />
        
          </View>

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
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            {data.usdt_address}
          </Text>
          
        </View>

        <MaterialCommunityIcons
  name="content-copy"  // The copy-to-clipboard icon
  size={20}  // Set the icon size
  color="black"  // Set the icon color, adjust as needed
  style={{
    marginLeft: 'auto', // Ensures the icon is aligned to the right
    paddingRight: Default.fixPadding,
  }}
  onPress={() => {
    // Copy to clipboard logic goes here
    Clipboard.setString(yourTextToCopy); // Replace `yourTextToCopy` with the text you want to copy
    Alert.alert('Copied to clipboard');
  }}
/>
      </View>
    </View>

          <View style={{ backgroundColor: Colors.extraLightGrey, paddingVertical: Default.fixPadding * 1 }}>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 1,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            Selected Currency
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
                       {data.payment_mode}

          </Text>
          
        </View>

       
      </View>
    </View>
           
    <View style={{ backgroundColor: Colors.extraLightGrey, paddingVertical: Default.fixPadding * 1 }}>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 1,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            Amount
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
              {data.amount}
          </Text>
          
        </View>

       
      </View>
    </View>

    <View style={{ backgroundColor: Colors.extraLightGrey, paddingVertical: Default.fixPadding * 1 }}>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 1,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            Order ID
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
              {data.orderId}
          </Text>
          
        </View>

       
      </View>
    </View>

    <View style={{ backgroundColor: Colors.extraLightGrey, paddingVertical: Default.fixPadding * 1 }}>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 1,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
            Transaction ID
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
            {data.transaction_id}
          </Text>
          
        </View>

       
      </View>
    </View>

    <View style={{ backgroundColor: Colors.extraLightGrey, paddingVertical: Default.fixPadding * 1 }}>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 1,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
           Send {data.payment_mode}
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
             {data.amount}
          </Text>
          
        </View>

       
      </View>
    </View>
  
            
          </View>
        </ScrollView>
       
          
  


  
      
      </View>
    );
  };
  
  export default deposit;
  
  const styles = StyleSheet.create({
    image: {
      width: 130,
      height: 130,
      borderRadius: 65,
    },
    textInputStyle: {
      paddingVertical: Default.fixPadding * 1.2,
      paddingHorizontal: Default.fixPadding * 1.5,
      marginTop: Default.fixPadding,
      marginBottom: Default.fixPadding * 2.5,
      borderRadius: 10,
      backgroundColor: Colors.white,
      ...Default.shadow,
    },
    touchableOpacityStyle: {
      padding: Default.fixPadding * 1.5,
      marginTop: Default.fixPadding,
      marginBottom: Default.fixPadding * 2.5,
      borderRadius: 10,
      backgroundColor: Colors.white,
      ...Default.shadow,
    },
    bottomSheetMain: {
      padding: Default.fixPadding * 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: Colors.white,
    },
    circle: {
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: Colors.white,
      ...Default.shadow,
    },
  });
  