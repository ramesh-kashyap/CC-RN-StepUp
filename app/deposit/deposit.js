import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,Alert,
    KeyboardAvoidingView,Dimensions
  } from "react-native";
  import React, { useState } from "react";
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

  
  const deposit = () => {
    const navigation = useNavigation();
  
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`deposit:${key}`);
    }
  
    const stepsList = [
        "USDT(TRC20)",
        "USDT(BEP20)",
      ];
  
    const [wallet, setWallet] = useState(stepsList[1]);

    const [selectedIndex, setSelectedIndex] = useState(1);

   

  
    const [amount, setAmount] = useState("100");
    const [confirmAmount, setConfirmAmount] = useState("100");
  
   
    const handleDeposit = async () => {
        try {
          // Make the API call
          const response = await Api.post('/confirmDeposit', { Sum: amount, PSys: wallet });
       
          if (response.data.success) {
           
           navigation.push("deposit/confirmDeposit");

          } else {
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
      onPress={handleDeposit} // Simply call handleDeposit without loading logic
    >
      <Text style={{ ...Fonts.ExtraBold18white }}>Confirm</Text>
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
                setWalletAddressBottomSheet(false);
                setWallet(stepsList[selectedIndex]);

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
  