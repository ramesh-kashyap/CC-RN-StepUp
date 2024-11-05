import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
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

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`editProfileScreen:${key}`);
  }

  const [name, setName] = useState("Guy hawkins");
  const [confirmName, setConfirmName] = useState("Guy hawkins");

  const [email, setEmail] = useState("guyhawkins@mail.com");
  const [confirmEmail, setConfirmEmail] = useState("guyhawkins@mail.com");

  const [number, setNumber] = useState("1234567890");
  const [confirmNumber, setConfirmNumber] = useState("1234567890");

  const [changeImageBottomSheet, setChangeImageBottomSheet] = useState(false);
  const toggleCloseChangeImage = () => {
    setChangeImageBottomSheet(!changeImageBottomSheet);
  };

  const [pickedImage, setPickedImage] = useState();
  const [removeImage, setRemoveImage] = useState(false);

  const [removeImageToast, setRemoveImageToast] = useState(false);
  const onDismissRemoveImage = () => setRemoveImageToast(false);

  const galleryHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      toggleCloseChangeImage();
    }
  };

  const [cameraNotGranted, setCameraNotGranted] = useState(false);
  const onDismissCameraNotGranted = () => setCameraNotGranted(false);

  const cameraHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      setCameraNotGranted(true);
      return;
    }
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      toggleCloseChangeImage();
    }
  };

  const [userNameBottomSheet, setUserNameBottomSheet] = useState(false);
  const [emailAddressBottomSheet, setEmailAddressBottomSheet] = useState(false);
  const [mobileNumberBottomSheet, setMobileNumberBottomSheet] = useState(false);
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
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold16black,
            }}
          >
            {tr("name")}
          </Text>
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
                : "Guy hawkins"}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold16black,
            }}
          >
            {tr("email")}
          </Text>
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

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold16black,
            }}
          >
            {tr("mobile")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setNumber(confirmNumber);
              setMobileNumberBottomSheet(true);
            }}
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              ...styles.touchableOpacityStyle,
            }}
          >
            <Text
              style={{
                ...(!confirmNumber && !number
                  ? Fonts.SemiBold15grey
                  : Fonts.SemiBold15black),
              }}
            >
              {confirmNumber
                ? confirmNumber
                : !number
                ? tr("enterMobile")
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
                numberOfLines={1}
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
                numberOfLines={1}
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
                numberOfLines={1}
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
        visible={mobileNumberBottomSheet}
        onBackButtonPress={() => setMobileNumberBottomSheet(false)}
        onBackdropPress={() => setMobileNumberBottomSheet(false)}
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
            {tr("changeMobileNumber")}
          </Text>

          <View style={styles.textInputStyle}>
            <TextInput
              maxLength={10}
              value={number}
              onChangeText={setNumber}
              keyboardType={"number-pad"}
              selectionColor={Colors.primary}
              placeholder={tr("enterMobile")}
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
                setMobileNumberBottomSheet(false);
                setConfirmNumber(number);
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
            onPress={() => setMobileNumberBottomSheet(false)}
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
