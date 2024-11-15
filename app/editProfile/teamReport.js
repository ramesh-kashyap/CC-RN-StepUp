import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,StyleSheet ,Alert
  } from "react-native";
  import React, { useState ,useEffect} from "react"; 
  import { useTranslation } from "react-i18next";
  import { Colors, Default, Fonts } from "../../constants/styles";
  import MyStatusBar from "../../components/myStatusBar";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import AntDesign from "react-native-vector-icons/AntDesign";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import AwesomeButton from "react-native-really-awesome-button";
  import moment from "moment";
  import DateTimePicker from "react-native-ui-datepicker";
  import { useNavigation } from "expo-router";
  import { DataTable } from 'react-native-paper';
  import Api from '../../services/Api.js'; // Adjust path if necessary
  import { BottomSheet } from "react-native-btr";
  import WheelPicker from "react-native-wheely";


  
  const { width, height } = Dimensions.get("window");
  
  const teamReport = () => {
    const navigation = useNavigation();
  
    const { t, i18n } = useTranslation();

    const [data, setData] = useState([]);
    const [userData, setUserData] = useState('');
    const [teamCount, setTeamCount] = useState([]);

    const teamLevelList = ["All","1", "2", "3", "4", "5", "6", "7", "8","9", "10","11","12","13","14","15","16","17","18","19","20"];

  const [level, setLevel] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(0);


    const renderItem = ({ item, level }) => (
        <DataTable.Row>
          <DataTable.Cell style={styles.cell}>{item.username}</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>{level}</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>{item.active_status}</DataTable.Cell>
          <DataTable.Cell numeric style={styles.cell}>{item.investment_sum_amount || '-'}</DataTable.Cell>
          <DataTable.Cell numeric style={styles.cell}>{item.jdate}</DataTable.Cell>
        </DataTable.Row>
      );

  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`teamReport:${key}`);
    }
  
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [AllDelete, setAllDelete] = useState(false);
  
    const [openDateModal, setOpenDateModal] = useState(false);

    const [levelAddressBottomSheet, setLevelAddressBottomSheet] = useState(false);

  
    const today = moment().format("YYYY-MM-DD");
    const fetchUserData = async () => {
      try {
        const response = await Api.get('/userInfo'); // Replace with your actual GET endpoint
  
      
        if (response.data.success) {
          // Handle the successful response here
          console.log(response.data.data);
          setUserData(response.data.data);
      
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

    const fetchData = async () => {
        try {
          const response = await Api.get('/levelTeam'); // Replace with your actual GET endpoint

          console.log(response.data);
        
          if (response.data.success) {
            // Handle the successful response here
            console.log(response.data); // or store the data in state
            setData(response.data.data);
            setTeamCount(response.data.teamCount);


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
        fetchUserData();
      }, []); 
      

      const styles = StyleSheet.create({
        container: {
          backgroundColor: Colors.regularGrey,
         
          flex: 1, // This will ensure the container takes full available space vertically
          width: '100%', // Ensures the container spans the full width of the screen
          
        },
        cell: {
          minWidth: 125, // Set a minimum width for cells
          justifyContent: 'center', // Centers content vertically
          alignItems: 'center', // Centers content horizontally
         
          backgroundColor: Colors.regularGrey,
          width: '100%', // Ensures the cell spans the full width of the container
        },
        title: {
          fontWeight: 'bold', // Makes the text bold
          fontSize: 16, // Sets the font size to be larger
        },
      });
      

  
    const historyList = [
      
    ];
  
   
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
  
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    const filteredData = level
    ? Object.entries(data).filter(([lvl]) => lvl === level) // Include only selected level
    : Object.entries(data); 
  
  
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
          <View
            style={{
              flex: 9,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
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
             Team Report
            </Text>
          </View>
         
        </View>
  
        {AllDelete ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Image
              source={require("../../assets/images/empty.png")}
              style={{ width: 145, height: 110, resizeMode: "contain" }}
            />
            <Text
              style={{ ...Fonts.Bold20grey, marginTop: Default.fixPadding * 2 }}
            >
              {tr("empty")}
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold16grey,
                textAlign: "center",
                marginTop: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              {tr("recordAtTime")}
            </Text>
          </View>
        ) : (
          <FlatList
           
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <>
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    paddingHorizontal: Default.fixPadding * 2,
                    paddingVertical: Default.fixPadding,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.lightGrey,
                    backgroundColor: Colors.regularGrey,
                  }}
                >
                  <View
                    style={{
                      flex: 9,
                      flexDirection: isRtl ? "row-reverse" : "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account-group"
                      size={20}
                      Colors={Colors.black}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold15black,
                        overflow: "hidden",
                        marginHorizontal: Default.fixPadding,
                      }}
                    >
                       Team Level {teamLevelList[selectedIndex]}
                    </Text>
                  </View>
  
                  <TouchableOpacity
                    onPress={() => setLevelAddressBottomSheet(true)}
                    style={{
                      flex: 1,
                      alignItems: isRtl ? "flex-start" : "flex-end",
                    }} 
                  >
                    <MaterialCommunityIcons
                      name="magnify"
                      size={22}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    paddingVertical: Default.fixPadding * 2,
                    paddingHorizontal: Default.fixPadding,
                    backgroundColor: Colors.regularGrey,
                    ...Default.shadow,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      borderRightColor: Colors.extraLightPrimary,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/money.png")}
                      style={{ width: 25, height: 25, resizeMode: "contain" }}
                    />
                    <Text
                      style={{
                        ...Fonts.SemiBold14black,
                        marginTop: Default.fixPadding,
                      }}
                    >
                      ${userData.totalTeamIncome}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
                    >
                     Total Income
                    </Text>
                  </View>
  
        
  
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderLeftWidth: isRtl ? 1 : null,
                      borderLeftColor: isRtl ? Colors.extraLightPrimary : null,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/withdraw.png")}
                      style={{ width: 25, height: 25, resizeMode: "contain" }}
                    />
                    <Text
                      style={{
                        ...Fonts.SemiBold14black,
                        marginTop: Default.fixPadding,
                      }}
                    >
                      ${userData.todayTeamIncome}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
                    >
                      Today Income
                    </Text>
                  </View>
                </View>

                <View
      >

<View style={{  paddingVertical: Default.fixPadding * 1,
          }}>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          padding: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 1.5,
         
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 55,
            height: 55,
          
           
          }}
        >
        <Image
                      source={require("../../assets/images/team.png")}
                      style={{ width: 25, height: 25, resizeMode: "contain" }}
                    />
        </View>
    
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold18black }}>
            Total Level Team
          </Text>
         
          
        </View>
    
        <Text
          style={{
            ...Fonts.Bold20black,  // Same font style as Deposit
            textAlign: "right",
            marginLeft: "auto", // Ensures the amount is aligned to the right
            paddingRight: Default.fixPadding,
          }}
        >
           {teamCount}
        </Text>
      </View>
    </View>


    <View style={styles.container}>
      <ScrollView horizontal>
        <DataTable style={{ backgroundColor: Colors.regularGrey, width: '100%',}}>
        <DataTable.Header style={{ backgroundColor: Colors.regularGrey, width: '100%',}}>
        <DataTable.Title style={styles.cell }><Text style={styles.title}>User Name</Text></DataTable.Title>
        <DataTable.Title style={styles.cell}><Text style={styles.title}>Level</Text></DataTable.Title>
        <DataTable.Title style={styles.cell}><Text style={styles.title}>Active Status</Text></DataTable.Title>
        <DataTable.Title numeric style={styles.cell}><Text style={styles.title}>Active Balance</Text></DataTable.Title>
        <DataTable.Title numeric style={styles.cell}><Text style={styles.title}>Joining Date</Text></DataTable.Title>
      </DataTable.Header>

      {filteredData.length === 0 ? (
        // Show "No data found" when filteredData is empty
        <DataTable.Row>
          <DataTable.Cell style={styles.cell} colSpan={5}>
            No data found
          </DataTable.Cell>
        </DataTable.Row>
      ) : (
        filteredData.map(([level, userList], index) => (
          <FlatList
            key={index}
            data={userList}
            renderItem={({ item }) => renderItem({ item, level })}
            keyExtractor={(item) => item.username}
          />
        ))
      )}
        </DataTable>
      </ScrollView>
    </View>



</View>
              </>
            )}
          />
        )}

<BottomSheet
     visible={levelAddressBottomSheet}
     onBackButtonPress={() => setLevelAddressBottomSheet(false)}
     onBackdropPress={() => setLevelAddressBottomSheet(false)}
     
    >
      <View style={{
      padding: Default.fixPadding * 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: Colors.white,
    }}>
        <View
          style={{
            paddingTop: Default.fixPadding * 1.5,
            paddingBottom: Default.fixPadding * 2,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGrey,
          }}
        >
          <Text style={{ ...Fonts.Bold20black, textAlign: "center" }}>
           Team Level
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
          Choose Level
        </Text>
        <View
          style={{
            justifyContent: "center",
            height: height / 3.1,
          }}
        >
          <WheelPicker
            selectedIndex={selectedIndex}
            options={teamLevelList}
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
                setLevelAddressBottomSheet(false);
                setLevel(selectedIndex===0?null:teamLevelList[selectedIndex]);

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
           onPress={() => setLevelAddressBottomSheet(false)}
          style={{
            alignSelf: "center",
            marginBottom: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.Bold16black }}>{tr("cancel")}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  
        <Modal
          transparent={true}
          animationType="fade"
          visible={openDeleteModal}
          onRequestClose={() => setOpenDeleteModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setOpenDeleteModal(false)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.transparentBlack,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  padding: Default.fixPadding * 2,
                  width: width * 0.9,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: Colors.extraLightGrey,
                    }}
                  >
                    <AntDesign name="delete" size={24} color={Colors.red} />
                  </View>
                  <Text
                    style={{
                      ...Fonts.SemiBold16black,
                      textAlign: "center",
                      marginVertical: Default.fixPadding * 2,
                    }}
                  >
                    {tr("areYouSure")}
                  </Text>
                </View>
  
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setOpenDeleteModal(false)}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: Default.fixPadding,
                      marginRight: isRtl ? 0 : Default.fixPadding * 2,
                      marginLeft: isRtl ? Default.fixPadding * 2 : 0,
                      borderWidth: 1,
                      borderColor: Colors.primary,
                      borderRadius: 5,
                      backgroundColor: Colors.white,
                      ...Default.shadowBtn,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.Bold16primary, overflow: "hidden" }}
                    >
                      {tr("cancel")}
                    </Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity
                    onPress={() => {
                      setAllDelete(true);
                      setOpenDeleteModal(false);
                    }}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: Default.fixPadding,
                      borderRadius: 5,
                      backgroundColor: Colors.primary,
                      ...Default.shadowBtn,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.Bold16white, overflow: "hidden" }}
                    >
                      {tr("delete")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
  
        <Modal
          transparent={true}
          animationType="fade"
          visible={openDateModal}
          onRequestClose={() => setOpenDateModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setOpenDateModal(false)}
            style={{ flex: 1 }}
          > 
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.transparentBlack,
              }}
            >
              <View
                style={{
                  maxHeight: height / 1.3,
                  width: width * 0.9,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <TouchableWithoutFeedback>
                  <View>
                    <Text
                      style={{
                        ...Fonts.Bold18black,
                        textAlign: "center",
                        marginVertical: Default.fixPadding * 1.5,
                        marginHorizontal: Default.fixPadding * 2,
                      }}
                    >
                      {tr("selectDate")}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
  
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableWithoutFeedback>
                    <View
                      style={{
                        paddingHorizontal: Default.fixPadding * 2,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: isRtl ? "row-reverse" : "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: Default.fixPadding * 0.5,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: isRtl ? "row-reverse" : "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              ...Fonts.Bold16black,
                              overflow: "hidden",
                              maxWidth: 50,
                              marginRight: isRtl ? 0 : Default.fixPadding,
                              marginLeft: isRtl ? Default.fixPadding : 0,
                            }}
                          >
                            {tr("from")}
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingVertical: Default.fixPadding,
                              paddingHorizontal: Default.fixPadding * 0.5,
                              borderRadius: 10,
                              backgroundColor: Colors.white,
                              ...Default.shadow,
                            }}
                          >
                            <Text
                              numberOfLines={1}
                              style={{ ...Fonts.Bold14black, overflow: "hidden" }}
                            >
                              {formatDate(fromDate)}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: isRtl ? "row-reverse" : "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginLeft: isRtl ? 0 : Default.fixPadding,
                            marginRight: isRtl ? Default.fixPadding : 0,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              ...Fonts.Bold16black,
                              overflow: "hidden",
                              maxWidth: 50,
                              marginRight: isRtl ? 0 : Default.fixPadding,
                              marginLeft: isRtl ? Default.fixPadding : 0,
                            }}
                          >
                            {tr("to")}
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingVertical: Default.fixPadding,
                              paddingHorizontal: Default.fixPadding * 0.5,
                              borderRadius: 10,
                              backgroundColor: Colors.white,
                              ...Default.shadow,
                            }}
                          >
                            <Text
                              numberOfLines={1}
                              style={{ ...Fonts.Bold14black, overflow: "hidden" }}
                            >
                              {toDate ? formatDate(toDate) : formatDate(fromDate)}
                            </Text>
                          </View>
                        </View>
                      </View>
  
                      <View
                        style={{
                          marginTop: Default.fixPadding * 2,
                          marginBottom: Default.fixPadding,
                        }}
                      >
                        <DateTimePicker
                          mode="range"
                          locale="en"
                          minDate={today}
                          height={280}
                          startDate={fromDate}
                          endDate={toDate}
                          onChange={({ startDate, endDate }) => {
                            setFromDate(startDate);
                            setToDate(endDate);
                          }}
                          displayFullDays={true}
                          headerButtonsPosition="around"
                          selectedItemColor={Colors.primary}
                          headerTextStyle={{
                            ...Fonts.Bold16black,
                          }}
                          timePickerDecelerationRate="fast"
                          dayContainerStyle={{
                            borderRadius: 5,
                            margin: 0,
                          }}
                          selectedTextStyle={{
                            ...Fonts.Bold16white,
                          }}
                          todayTextStyle={{
                            ...Fonts.Bold16riverBedColor,
                          }}
                          todayContainerStyle={{
                            borderWidth: null,
                          }}
                          calendarTextStyle={{ ...Fonts.Bold16riverBedColor }}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
                <TouchableWithoutFeedback>
                  <View>
                    <View
                      style={{
                        marginVertical: Default.fixPadding * 2,
                        marginHorizontal: Default.fixPadding * 4,
                      }}
                    >
                      <AwesomeButton
                        height={50}
                        onPress={() => {
                          setConfirmDate({
                            fromConfirmDate: formatDate(fromDate),
                            toConfirmDate: toDate
                              ? formatDate(toDate)
                              : formatDate(fromDate),
                          });
                          setOpenDateModal(false);
                        }}
                        raiseLevel={1}
                        stretch={true}
                        borderRadius={10}
                        backgroundShadow={Colors.primary}
                        backgroundDarker={Colors.primary}
                        backgroundColor={Colors.primary}
                      >
                        <Text style={{ ...Fonts.Bold18white }}>{tr("ok")}</Text>
                      </AwesomeButton>
                    </View>
  
                    <TouchableOpacity
                      onPress={() => setOpenDateModal(false)}
                      style={{
                        alignSelf: "center",
                        marginBottom: Default.fixPadding * 2,
                      }}
                    >
                      <Text style={{ ...Fonts.Bold16grey }}>{tr("close")}</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };
  
  export default teamReport;
  