import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    Platform,Alert,
    KeyboardAvoidingView,Dimensions
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useTranslation } from "react-i18next";
  import WheelPicker from "react-native-wheely";
  import Api from '../../services/Api.js'; // Adjust path if necessary
  import { Colors, Default, Fonts } from "../../constants/styles";
  import MyStatusBar from "../../components/myStatusBar";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { BottomSheet } from "react-native-btr";
  import AwesomeButton from "react-native-really-awesome-button";
  import { useNavigation } from "expo-router";

  const { height } = Dimensions.get("window");

  
  const withdraw = () => {
    const navigation = useNavigation();
  
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`deposit:${key}`);
    }
    const [data, setData] = useState([]);
    const [walletAddress, setWalletAddress] = useState('');
    const [number, setNumber] = useState('');
    const fetchData = async () => {
      try {
        const response = await Api.get('/userInfo'); // Replace with your actual GET endpoint
  
      
        if (response.data.success) {
          // Handle the successful response here
          console.log(response.data.data);
          setData(response.data.data);
          setWalletAddress(response.data.data.walletAddress.bepAddress); // Set bepAddress by default
          setNumber(response.data.data.phone)
  
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

   

    const [amount, setAmount] = useState("100");
    const handleWithdraw = async () => {
      try {

        if (  !amount) {
          Alert.alert("Error", "Please fill out all fields.");
          return;
        }
    
        // Check if the mobile number is exactly 10 digits
        if (!number || number.length !== 10) {
          Alert.alert("Error", "Mobile number must be 10 digits.");
          return;
        }

        
        if (!walletAddress) {
          Alert.alert("Error", "Please Go Profile Section Add Wallet Address");
          return;
        }
    
        // Make the API call
        const response = await Api.post('/WithdrawRequest', { amount: amount, paymentMode: wallet, walletAddress: walletAddress });
     
        if (response.data.success) {
         
          Alert.alert("Error", response.data.message)

        } else {
          Alert.alert("Error", response.data.errors);
        }
      } catch (error) {
        console.log("Error details:", error);
    if (error.response) {
      console.log("Error response data:", error.response.data);
      Alert.alert("Error", error.response.data.errors || "An error occurred on the server.");
    } else if (error.request) {
      console.log("Error request:", error.request);
      Alert.alert("Error", "No response from server. Please check your network.");
    } else {
      console.log("Error message:", error.message);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
      } 
    };

    useEffect(() => {

      fetchData(); // Call fetchData when component mounts
  
    }, []); 
  
    const stepsList = [
        "USDTTRC20",
        "USDTBEP20",
      ];
  
      const [wallet, setWallet] = useState(stepsList[1]);

    const [selectedIndex, setSelectedIndex] = useState(1);

   
    
  
    
    const [confirmAmount, setConfirmAmount] = useState("100");
    const [selectedWalletType, setSelectedWalletType] = useState('USDTBEP20'); // 'TRC' or 'BEP'
   
   
    
   
  
    const [walletAddressBottomSheet, setWalletAddressBottomSheet] = useState(false);
    const [amountBottomSheet, setAmountBottomSheet] = useState(false);
    const [phoneNumberBottomSheet, setPhoneNumberBottomSheet] = useState(false);
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
           Withdraw
          </Text>
        </View>
  
  
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
         
  
          <View style={{ marginHorizontal: Default.fixPadding * 2,marginTop: Default.fixPadding * 2  }}>
          <View style={{ paddingVertical: Default.fixPadding * 1 }}>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 0,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 28,
            borderWidth: 1,
            borderColor: Colors.primary,
            backgroundColor: Colors.lightRegularPrimary,
          }}
        >
         <Image
              source={require("../../assets/images/usdt.png")}
              style={{ width: 35, height: 35, resizeMode: "contain" }}
            />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.SemiBold14black,
              overflow: 'hidden',
              textAlign: isRtl ? 'right' : 'left',
              marginVertical: Default.fixPadding * 0.3,
            }}
          >
           USDT
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
          
        </Text>
      </View>
    </View>
  
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold16black,
              }}
            >
              Select Wallet
            </Text>
            <TouchableOpacity
              onPress={() => {
                setWalletAddressBottomSheet(true);
              }}
              style={{
                alignItems: isRtl ? "flex-end" : "flex-start",
                ...styles.touchableOpacityStyle,
              }}
            >
              <Text
                style={{
                  ...( !wallet
                    ? Fonts.SemiBold15grey
                    : Fonts.SemiBold15black),
                }}
              >
                {wallet
                  ? wallet
                  :  "Select Wallet" 
                  }
              </Text>
              
            </TouchableOpacity>
            <Text
  style={{
    textAlign: isRtl ? "right" : "left",
    
    ...Fonts.SemiBold16black,
  }}
>
  Wallet Address
</Text>
<View
             
              style={{
                alignItems: isRtl ? "flex-end" : "flex-start",
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1,
                marginTop: Default.fixPadding,
                marginBottom: Default.fixPadding * 2.5,
                marginHorizontal: Default.fixPadding * 0,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
 <Text
    style={{
      ...(walletAddress ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
      marginVertical: 8,
      alignSelf: isRtl ? "flex-end" : "flex-start",
    }}
  >
    {selectedWalletType === 'USDTTRC20' && walletAddress !== null ? walletAddress : 
     selectedWalletType === 'USDTBEP20' && walletAddress !== null ? walletAddress : 
     'No Address Found'}
  </Text>
 
</View>
     
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold16black,
              }}
            >
              Amount
            </Text>
            <TouchableOpacity
              onPress={() => {
                setAmount(confirmAmount);
                setAmountBottomSheet(true);
              }}
              style={{
                alignItems: isRtl ? "flex-end" : "flex-start",
                ...styles.touchableOpacityStyle,
              }}
            >
              <Text
                style={{
                  ...(!confirmAmount && !amount
                    ? Fonts.SemiBold15grey
                    : Fonts.SemiBold15black),
                }}
              >
                {confirmAmount
                  ? `$ ${confirmAmount}`
                  : !amount
                  ? tr("enterAmount")
                  : "1234567890"}
              </Text>

            </TouchableOpacity>
            
            <Text
  style={{
    textAlign: isRtl ? "right" : "left",
    ...Fonts.SemiBold16black,
  }}
>
  Phone Number
</Text>
<View
             
              style={{
                alignItems: isRtl ? "flex-end" : "flex-start",
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1,
                marginTop: Default.fixPadding,
                marginBottom: Default.fixPadding * 2.5,
                marginHorizontal: Default.fixPadding * 0,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
<Text
  style={{
    ...(number ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
   
    marginVertical: 8,
    alignSelf: isRtl ? "flex-end" : "flex-start",
  }}
>
{data.phone}
</Text>
</View>
          </View>
        </ScrollView>
        <View
          style={{
            margin: Default.fixPadding * 2,
          }}
        >
          <AwesomeButton
      height={50}
      raiseLevel={1}
      stretch={true}
      borderRadius={10}
      backgroundShadow={Colors.primary}
      backgroundDarker={Colors.primary}
      backgroundColor={Colors.primary}
      onPress={handleWithdraw}
      // Simply call handleDeposit without loading logic
    >
      <Text style={{ ...Fonts.ExtraBold18white }}>Withdrawl</Text>
    </AwesomeButton>
        </View>
          
  

<BottomSheet
     visible={walletAddressBottomSheet}
     onBackButtonPress={() => setWalletAddressBottomSheet(false)}
     onBackdropPress={() => setWalletAddressBottomSheet(false)}
    >
      <View style={styles.bottomSheetMain}>
        <View
          style={{
            paddingTop: Default.fixPadding * 1.5,
            paddingBottom: Default.fixPadding * 2,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGrey,
          }}
        >
          <Text style={{ ...Fonts.Bold20black, textAlign: "center" }}>
           Wallets
          </Text>
        </View>

        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: "center",
            marginTop: Default.fixPadding * 3,
            marginBottom: Default.fixPadding * 2,
          }}
        >
          Choose wallet
        </Text>
        <View
          style={{
            justifyContent: "center",
            height: height / 3.1,
          }}
        >
          <WheelPicker
            selectedIndex={selectedIndex}
            options={stepsList}
            visibleRest={5}
            itemHeight={50}
            decelerationRate="fast"
            itemTextStyle={{ ...Fonts.Bold25black }}
            onChange={(index) => {
                setSelectedIndex(index);
              }}
              
            containerStyle={{
              marginHorizontal: Default.fixPadding * 2,
            }}
            selectedIndicatorStyle={{
              borderRadius: 10,
              backgroundColor: Colors.regularGrey,
            }}
          />
        </View>

        <View
          style={{
            margin: Default.fixPadding * 2,
          }}
        >
          <AwesomeButton
            height={50}
            onPress={() => {
              const selectedWallet = stepsList[selectedIndex];
          setWalletAddressBottomSheet(false);
          setWallet(selectedWallet);
          setSelectedWalletType(selectedWallet);
          setWalletAddress(selectedWallet === 'USDTTRC20' ? data.walletAddress.trcAddress  : data.walletAddress.bepAddress );
              }}
            raiseLevel={1}
            stretch={true}
            borderRadius={10}
            backgroundShadow={Colors.primary}
            backgroundDarker={Colors.primary}
            backgroundColor={Colors.primary}
          >
            <Text style={{ ...Fonts.ExtraBold18white }}>{tr("save")}</Text>
          </AwesomeButton>
        </View>
        <TouchableOpacity
           onPress={() => setWalletAddressBottomSheet(false)}
          style={{
            alignSelf: "center",
            marginBottom: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  
        <BottomSheet
          visible={amountBottomSheet}
          onBackButtonPress={() => setAmountBottomSheet(false)}
          onBackdropPress={() => setAmountBottomSheet(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.bottomSheetMain}
          >
            <Text
              style={{
                ...Fonts.Bold18black,
                textAlign: "center",
                marginBottom: Default.fixPadding * 4,
              }}
            >
            Change Amount(Minimum $25)
            </Text>
  
            <View style={styles.textInputStyle}>
              <TextInput
                maxLength={10}
                value={amount}
                onChangeText={setAmount}
                keyboardType={"amount-pad"}
                selectionColor={Colors.primary}
                placeholder={tr("enterAmount")}
                placeholderTextColor={Colors.grey}
                style={{
                  ...Fonts.SemiBold15black,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
  
            <View
              style={{
                marginBottom: Default.fixPadding * 2,
                marginTop: Default.fixPadding * 1.5,
              }}
            >
              <AwesomeButton
                height={50}
                onPress={() => {
                  setAmountBottomSheet(false);
                  if(amount>=25){
                  setConfirmAmount(amount);
                  }else{
                    Alert.alert("Error", "Minimum Deposit is $25");
                  }
                }}
                raiseLevel={1}
                stretch={true}
                borderRadius={10}
                backgroundShadow={Colors.primary}
                backgroundDarker={Colors.primary}
                backgroundColor={Colors.primary}
              >
                <Text style={{ ...Fonts.ExtraBold18white }}>{tr("save")}</Text>
              </AwesomeButton>
            </View>
            <TouchableOpacity
              onPress={() => setAmountBottomSheet(false)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: Default.fixPadding,
              }}
            >
              <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </BottomSheet>
        <BottomSheet
  visible={phoneNumberBottomSheet} // Use state variable for phone number bottom sheet visibility
  onBackButtonPress={() => setPhoneNumberBottomSheet(false)}
  onBackdropPress={() => setPhoneNumberBottomSheet(false)}
>
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={styles.bottomSheetMain}
  >
    <Text
      style={{
        ...Fonts.Bold18black,
        textAlign: "center",
        marginBottom: Default.fixPadding * 4,
      }}
    >
      Enter Phone Number
    </Text>

    <View style={styles.textInputStyle}>
      <TextInput
        maxLength={15} // Set max length for phone numbers, you can adjust this
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad" // Set keyboard type to phone pad
        selectionColor={Colors.primary}
        placeholder={"Enter Phone Number"} // Placeholder for phone number
        placeholderTextColor={Colors.grey}
        style={{
          ...Fonts.SemiBold15black,
          textAlign: isRtl ? "right" : "left",
        }}
      />
    </View>

    <View
      style={{
        marginBottom: Default.fixPadding * 2,
        marginTop: Default.fixPadding * 1.5,
      }}
    >
      <AwesomeButton
        height={50}
        onPress={() => {
          setPhoneNumberBottomSheet(false);
          if (number && number.length >= 10) { // Simple validation for length
            setNumber(number); // Save confirmed phone number
          } else {
            Alert.alert("Error", "Please enter a valid phone number");
          }
        }}
        raiseLevel={1}
        stretch={true}
        borderRadius={10}
        backgroundShadow={Colors.primary}
        backgroundDarker={Colors.primary}
        backgroundColor={Colors.primary}
      >
        <Text style={{ ...Fonts.ExtraBold18white }}>{tr("save")}</Text>
      </AwesomeButton>
    </View>
    <TouchableOpacity
      onPress={() => setPhoneNumberBottomSheet(false)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Default.fixPadding,
      }}
    >
      <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>
</BottomSheet>

      
      </View>
    );
  };
  
  export default withdraw;
  
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
  

