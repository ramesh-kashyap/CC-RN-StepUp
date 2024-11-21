import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,Alert
} from "react-native";
import React, { useState , useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import SnackbarToast from "../../components/snackbarToast";
import { BottomSheet } from "react-native-btr";
import * as ImagePicker from "expo-image-picker";
import AwesomeButton from "react-native-really-awesome-button";
import { useNavigation } from "expo-router";
import { useRouter } from 'expo-router';  // Make sure to import useRouter
import * as FileSystem from 'expo-file-system';
import Api from '../../services/Api';


const EditProfileScreen = () => {
  const navigation = useNavigation();

  const router = useRouter();


  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`editProfileScreen:${key}`);
  }

  const [name, setName] = useState("");
  const [confirmName, setConfirmName] = useState("");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [bep, setBep] = useState("");
  const [confirmBep, setConfirmBep] = useState("");

  const [trc, setTrc] = useState("");
  const [confirmTrc, setConfirmTrc] = useState("");

  const [changeImageBottomSheet, setChangeImageBottomSheet] = useState(false);
  const toggleCloseChangeImage = () => {
    setChangeImageBottomSheet(!changeImageBottomSheet);
  };

  const [pickedImage, setPickedImage] = useState();
  const [removeImage, setRemoveImage] = useState(false);

  const [number, setNumber] = useState();


  const [removeImageToast, setRemoveImageToast] = useState(false);
  const onDismissRemoveImage = () => setRemoveImageToast(false);

  const handleUpdate = async () => {  
    try {
      // Log the parameters for debugging
      console.log({ bep, trc, name, email ,number });
  
      // Make API call to send OTP
      const response = await Api.post('/sendCodephone', { number });
  
      // Handle success response
      if (response.data.success) {
        // Use router.push to navigate to 'auth/otpProfile' with parameters
        router.push({
          pathname: 'auth/otpProfile',
          params: { bep, trc, name, email },
        });    
      } else {
        // If the API call was not successful, show error message
        Alert.alert("Error", response.data.message || "Failed to send OTP.");
        console.log(response.data);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.log("Error:", error);
      Alert.alert("Error", "An error occurred while sending OTP. Please try again.");
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await Api.get('/userInfo'); // Replace with your actual GET endpoint

      console.log(response.data);

      if (response.data.success) {
        // Handle the successful response here
        console.log(response.data.data);

        setNumber(response.data.data.phone);

        setName(response.data.data.name??"");
        setConfirmName(response.data.data.name??"");
        setEmail(response.data.data.email??"");
        setConfirmEmail(response.data.data.email??"");
        setConfirmBep(response.data.data.walletAddress.bepAddress??"");
        setBep(response.data.data.walletAddress.bepAddress??"");
        setConfirmTrc(response.data.data.walletAddress.trcAddress??"");
        setTrc(response.data.data.walletAddress.trcAddress??"");
        if (response.data.data.uri && response.data.data.uri.includes("http://192.168.29.193:8000/storage/images/")) {
          setPickedImage(response.data.data.uri ?? null);
        } else {
          setPickedImage(null); // Optional: Clear the image if the condition isn't met
        }
        



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



  const uploadImageToServer = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: `image_${Date.now()}.jpg`, // Unique file name
        type: 'image/jpeg', // Correct MIME type
      });
  
      const response = await Api.post('upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Override content type for file uploads
        },
      });
  
      console.log(response.data);

      if (response.data.uri) {
        console.log('Image uploaded successfully:', response.data.uri);
        setPickedImage(response.data.uri); // Save URI for later use
      } else {
        console.error('Error uploading image:', result);
        Alert.alert('Error', 'Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };
  
  const galleryHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Picked image URI:', uri);
      await uploadImageToServer(uri); // Upload to server and update state
    }
  };
  
  const [cameraNotGranted, setCameraNotGranted] = useState(false);
  const onDismissCameraNotGranted = () => setCameraNotGranted(false);
  
  const cameraHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (!permissionResult.granted) {
      setCameraNotGranted(true);
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Captured image URI:', uri);
      await uploadImageToServer(uri); // Upload to server and update state
    }
  };
  

  const [userNameBottomSheet, setUserNameBottomSheet] = useState(false);
  const [emailAddressBottomSheet, setEmailAddressBottomSheet] = useState(false);
  const [mobileBepBottomSheet, setMobileBepBottomSheet] = useState(false);
  const [mobileTrcBottomSheet, setMobileTrcBottomSheet] = useState(false);

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
          {tr("editProfile")}
        </Text>
      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: Default.fixPadding * 2.5,
            marginBottom: Default.fixPadding * 3.3,
          }}
        >
          {!pickedImage ? (
            <View>
              {removeImage ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.lightGrey,
                    ...styles.image,
                  }}
                >
                  <Ionicons name="person" size={45} color={Colors.white} />
                </View>
              ) : (
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={{
                    ...styles.image,
                  }} 
                />
              )}
            </View>
          ) : (
            <Image
              source={{ uri: pickedImage }}
              style={{
                ...styles.image,
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => toggleCloseChangeImage()}
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              bottom: 0,
              left: isRtl ? 0 : null,
              right: isRtl ? null : 0,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.extraLightGrey,
            }}
          >
            <Feather name="camera" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
         
          <View style={{ flexDirection: "row", alignItems: "center" }}>
  <Image
    source={require("../../assets/images/profile_icon.png")}
    style={{
      width: 20,
      height: 20,
      marginRight: 8, // Adds space between the image and text
    }}
  />
  <Text
    style={{
      textAlign: isRtl ? "right" : "left",
      ...Fonts.SemiBold16black,
    }}
  >
     Name
  </Text>
</View>
          <TouchableOpacity
            onPress={() => {
              setName(confirmName);
              setUserNameBottomSheet(true);
            }}
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              ...styles.touchableOpacityStyle,
            }}
          >
            <Text
              style={{
                ...(!confirmName && !name
                  ? Fonts.SemiBold15grey
                  : Fonts.SemiBold15black),
              }}
            >
              {confirmName
                ? confirmName
                : !name
                ? tr("enterName")
                : "Sahil "}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
  <Image
    source={require("../../assets/images/email.png")}
    style={{
      width: 20,
      height: 20,
      marginRight: 8, // Adds space between the image and text
    }}
  />
  <Text
    style={{
      textAlign: isRtl ? "right" : "left",
      ...Fonts.SemiBold16black,
    }}
  >
     Email address
  </Text>
</View>
          
          <TouchableOpacity
            onPress={() => {
              setEmail(confirmEmail);
              setEmailAddressBottomSheet(true);
            }}
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              ...styles.touchableOpacityStyle,
            }}
          >
            <Text
              style={{
                ...(!confirmEmail && !email
                  ? Fonts.SemiBold15grey
                  : Fonts.SemiBold15black),
              }}
            >
              {confirmEmail
                ? confirmEmail
                : !email
                ? tr("enterEmail")
                : "guyhawkins@mail.com"}
            </Text>
          </TouchableOpacity>
         
          <View style={{ flexDirection: "row", alignItems: "center" }}>
  <Image
    source={require("../../assets/images/bep.png")}
    style={{
      width: 20,
      height: 20,
      marginRight: 8, // Adds space between the image and text
    }}
  />
  <Text
    style={{
      textAlign: isRtl ? "right" : "left",
      ...Fonts.SemiBold16black,
    }}
  >
    USDT BEP20
  </Text>
</View>

          <TouchableOpacity
            onPress={() => {
              setBep(confirmBep);
              setMobileBepBottomSheet(true);
            }}
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              ...styles.touchableOpacityStyle,
            }}
          >
            <Text
              style={{
                ...(!confirmBep && !bep
                  ? Fonts.SemiBold15grey
                  : Fonts.SemiBold15black),
              }}
            >
              {confirmBep
                ? confirmBep
                : !bep
                ? "Enter your USDT BEP20"
                : ""}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
  <Image
    source={require("../../assets/images/trx.png")}
    style={{
      width: 20,
      height: 20,
      marginRight: 8, // Adds space between the image and text
    }}
  />
  <Text
    style={{
      textAlign: isRtl ? "right" : "left",
      ...Fonts.SemiBold16black,
    }}
  >
    USDT TRC20
  </Text>
</View>
         
          <TouchableOpacity
            onPress={() => {
              setTrc(confirmTrc);
              setMobileTrcBottomSheet(true);
            }}
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              ...styles.touchableOpacityStyle,
            }}
          >
            <Text
              style={{
                ...(!confirmTrc && !trc
                  ? Fonts.SemiBold15grey
                  : Fonts.SemiBold15black),
              }}
            >
              {confirmTrc
                ? confirmTrc
                : !trc
                ? "Enter your USDT TRC20"
                : ""}
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
          onPress={handleUpdate}
          raiseLevel={1}
          stretch={true}
          borderRadius={10}
          backgroundShadow={Colors.primary}
          backgroundDarker={Colors.primary}
          backgroundColor={Colors.primary}
        >
          <Text style={{ ...Fonts.ExtraBold18white }}>{tr("update")}</Text>
        </AwesomeButton>
      </View>

      <BottomSheet
        visible={changeImageBottomSheet}
        onBackButtonPress={toggleCloseChangeImage}
        onBackdropPress={toggleCloseChangeImage}
      >
        <View style={styles.bottomSheetMain}>
          <Text
            style={{
              ...Fonts.SemiBold18black,
              textAlign: "center",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            {tr("changeProfile")}
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={cameraHandler}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ ...styles.circle }}>
                <Ionicons name="camera" size={24} color={Colors.blue} />
              </View>
              <Text
                bepOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  marginTop: Default.fixPadding,
                }}
              >
                {tr("camera")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={galleryHandler}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: Default.fixPadding,
              }}
            >
              <View style={{ ...styles.circle }}>
                <Ionicons name="image" size={24} color={Colors.green} />
              </View>
              <Text
                bepOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  marginTop: Default.fixPadding,
                }}
              >
                {tr("gallery")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                toggleCloseChangeImage();
                setRemoveImageToast(!removeImageToast);
                setRemoveImage(true);
                setPickedImage(null);
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ ...styles.circle }}>
                <Ionicons name="trash" size={24} color={Colors.lightRed} />
              </View>
              <Text
                bepOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  marginTop: Default.fixPadding,
                }}
              >
                {tr("remove")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SnackbarToast
          visible={cameraNotGranted}
          onDismiss={onDismissCameraNotGranted}
          title={tr("deny")}
        />
      </BottomSheet>

      <BottomSheet
        visible={userNameBottomSheet}
        onBackButtonPress={() => setUserNameBottomSheet(false)}
        onBackdropPress={() => setUserNameBottomSheet(false)}
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
            {tr("changeUserName")}
          </Text>

          <View style={styles.textInputStyle}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={tr("enterName")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                ...Fonts.Bold15black,
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
                setConfirmName(name);
                setUserNameBottomSheet(false);
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
            onPress={() => {
              setUserNameBottomSheet(false);
            }}
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
        visible={emailAddressBottomSheet}
        onBackButtonPress={() => setEmailAddressBottomSheet(false)}
        onBackdropPress={() => setEmailAddressBottomSheet(false)}
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
            {tr("changeEmailAddress")}
          </Text>

          <View style={styles.textInputStyle}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder={tr("enterEmail")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                ...Fonts.Bold15black,
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
                setEmailAddressBottomSheet(false);
                setConfirmEmail(email);
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
            onPress={() => setEmailAddressBottomSheet(false)}
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
        visible={mobileBepBottomSheet}
        onBackButtonPress={() => setMobileBepBottomSheet(false)}
        onBackdropPress={() => setMobileBepBottomSheet(false)}
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
            Change USDT BEP20
          </Text>

          <View style={styles.textInputStyle}>
            <TextInput
              value={bep}
              onChangeText={setBep}
              keyboardType={"bep-pad"}
              selectionColor={Colors.primary}
              placeholder="Enter your USDT BEP20"
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
                setMobileBepBottomSheet(false);
                setConfirmBep(bep);
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
            onPress={() => setMobileBepBottomSheet(false)}
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
        visible={mobileTrcBottomSheet}
        onBackButtonPress={() => setMobileTrcBottomSheet(false)}
        onBackdropPress={() => setMobileTrcBottomSheet(false)}
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
            Change USDT TRC20
          </Text>

          <View style={styles.textInputStyle}>
            <TextInput
              value={trc}
              onChangeText={setTrc}
              keyboardType={"bep-pad"}
              selectionColor={Colors.primary}
              placeholder="Enter your USDT TRC20"
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
                setMobileTrcBottomSheet(false);
                setConfirmTrc(trc);
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
            onPress={() => setMobileTrcBottomSheet(false)}
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

      <SnackbarToast
        visible={removeImageToast}
        onDismiss={onDismissRemoveImage}
        title={tr("removeImage")}
      />
    </View>
  );
};

export default EditProfileScreen;

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
