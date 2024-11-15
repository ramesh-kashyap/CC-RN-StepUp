import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Share,Alert
  } from "react-native";
  import React, { useState ,useEffect} from "react"; 
  import { useTranslation } from "react-i18next";
  import { Colors, Default, Fonts } from "../../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import MyStatusBar from "../../components/myStatusBar";
  import { useNavigation } from "expo-router";
  import Api from '../../services/Api.js'; // Adjust path if necessary

  
  const inviteScreen = () => {
    const navigation = useNavigation();
  
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`inviteScreen:${key}`);
    }

    const [sponsor, setSponsor] = useState("");


    const fetchData = async () => {
      try {
        const response = await Api.get('/userInfo'); // Replace with your actual GET endpoint
  
        console.log(response.data);
  
        if (response.data.success) {
          // Handle the successful response here
          console.log(response.data.data);
  
          setSponsor(response.data.data.userName??"");
  
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
  
    const shareMessage = () => {
      Share.share({
        url: "https://google.com",
        message: `Sponsor-${sponsor}`,
      });
      
    };
  
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar />
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            alignSelf: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 1.2,
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
            flex: 1,
            justifyContent: "center",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <View style={{ alignItems: "center" }}>

          <Text
              style={{
                ...Fonts.SemiBold20primary,
                marginTop: Default.fixPadding * 4,
                marginBottom: Default.fixPadding, 
              }}
            >
             Invite to Earn More
            </Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
               
              }}
            >
              <Image
                source={require("../../assets/images/refer.png")}
                style={{ width: 300, height:170, resizeMode: "contain" }}
              />
              
            </View>
  
            
            <Text style={{ ...Fonts.Bold14black ,marginTop: Default.fixPadding * 4}}>Your Sponsor Code - {sponsor}</Text>
          </View>
  
          <TouchableOpacity style={styles.shareBtn} onPress={shareMessage}>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold18primary, overflow: "hidden" }}
            >
              {tr("share")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default inviteScreen;
  
  const styles = StyleSheet.create({
    shareBtn: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Default.fixPadding * 1.2,
      paddingHorizontal: Default.fixPadding * 2,
      marginTop: Default.fixPadding * 5,
      marginBottom: Default.fixPadding * 2,
      borderRadius: 10,
      backgroundColor: Colors.white,
      ...Default.shadow,
    },
  });
  