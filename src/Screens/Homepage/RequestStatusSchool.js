import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

import React from "react";
import { off, onValue, ref, remove } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import {
  selectOrigin,
  selectSaveDriverId,
  selectSaveDriverIdSchool,
  selectUserProfile,
  setRideStarted,
  setRideStartedSchool,
  setSaveDriverIdSchool,
} from "../../Redux/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../config";

const RequestStatusSchool = () => {
  const origin = useSelector(selectOrigin);
  const userReduxData = useSelector(selectUserProfile);
  const navigation = useNavigation();
  const driverId = useSelector(selectSaveDriverIdSchool);
  const [fetchedData, setFetchedData] = useState(null);
  const [userStat, setUserStat] = useState(null);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const dispatch = useDispatch();
  console.log(origin);
  useEffect(() => {
    if (driverId !== null) {
      console.log("useEffect is running with driverId:", driverId);

      const dbRef = ref(db, "POSTED_RIDES_TO_SCHOOL/" + driverId);

      const onDataChange = (snapshot) => {
        const requestData = snapshot.val();

        if (!requestData) {
          console.log("No data found");
          dispatch(setRideStartedSchool(false));
          dispatch(setSaveDriverIdSchool(null));
          setFetchedData(null);
          return;
        }

        const userRequestData =
          requestData.request && requestData.request[userReduxData.id];

        const isStarted = requestData.status.isStarted;

        if (!userRequestData) {
          console.log("No user request data found");
          dispatch(setSaveDriverIdSchool(null));
          setFetchedData(null);
          return;
        }

        setIsStarted(isStarted);
        setFetchedData(userRequestData);
        setUserStat(userRequestData.status.isAccepted);
        setIsDeclined(userRequestData.status.isDeclined);
      };

      const errorCallback = (error) => {
        console.error("Error:", error);
      };

      onValue(dbRef, onDataChange, errorCallback);

      return () => off(dbRef, "value", onDataChange);
    }
  }, [driverId]);
  useEffect(() => {
    if (userStat) {
      setTimeout(() => {
        dispatch(setRideStartedSchool(true));
      }, 3000);
    }
  }, [dispatch, userStat]);

  if (driverId !== null && !isDeclined && !isStarted) {
    return (
      <View style={{ width: "100%", height: "100" }}>
        <View
          style={{
            width: "95%",
            height: 440,
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 20,
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 15,
          }}
        >
          {userStat && (
            <>
              <AntDesign name={"checkcircle"} size={100} color={"green"} />
              <Text style={{ fontSize: 20, marginTop: 20 }}>
                Request Accepted
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 20,
                  fontWeight: "300",
                  marginTop: 5,
                }}
              >
                Waiting for driver to start the ride
              </Text>
            </>
          )}
          {!userStat && (
            <>
              <ActivityIndicator size={100} color="green" />
              <Animatable.Text
                animation="fadeIn"
                iterationCount="infinite"
                style={{ fontSize: 20, marginVertical: 20 }}
              >
                Waiting. . .
              </Animatable.Text>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 35,
                  paddingVertical: 14,
                  backgroundColor: "#f03f46",
                  borderRadius: 30,
                  marginTop: 30,
                }}
                onPress={async () => {
                  Alert.alert(
                    "Cancel Request",
                    "Are you sure you want to cancel?",
                    [
                      {
                        text: "No",
                        onPress: () => {},
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        onPress: async () => {
                          try {
                            if (driverId) {
                              const requestDocRef = ref(
                                db,
                                `POSTED_RIDES_TO_SCHOOL/${driverId}/request/${userReduxData.id}`
                              );

                              await remove(requestDocRef);
                              console.log("Data removed successfully");

                              await AsyncStorage.setItem(
                                "driverId",
                                JSON.stringify(null)
                              );
                              dispatch(setSaveDriverIdSchool(null));
                            } else {
                              console.log(
                                "No DriverPostID found in AsyncStorage"
                              );
                            }
                          } catch (error) {
                            console.error("Error removing data:", error);
                          }
                        },
                      },
                    ]
                  );
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }

  if (isDeclined) {
    return (
      <View style={{ width: "100%", height: "100" }}>
        <View
          style={{
            width: "95%",
            height: 440,
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 20,
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 15,
          }}
        >
          <>
            <AntDesign name={"closecircle"} size={100} color={"red"} />
            <Text style={{ fontSize: 20, marginTop: 20 }}>
              Request Declined
            </Text>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 20,
                fontWeight: "300",
                marginTop: 5,
              }}
            >
              The driver declined your request
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                width: "30%",
                borderWidth: 2,
                borderColor: "red",
                paddingVertical: 10,
                borderRadius: 20,
              }}
              onPress={async () => {
                try {
                  if (driverId) {
                    const requestDocRef = ref(
                      db,
                      `POSTED_RIDES_TO_SCHOOL/${driverId}/request/${userReduxData.id}`
                    );

                    await remove(requestDocRef);
                    console.log("Data removed successfully");

                    await AsyncStorage.setItem(
                      "driverId",
                      JSON.stringify(null)
                    );
                    dispatch(setSaveDriverIdSchool(null));
                  } else {
                    console.log("No DriverPostID found in AsyncStorage");
                  }

                  if (origin) {
                    navigation.navigate("SearchingRideToSchool");
                  } else {
                    navigation.navigate("Home");
                  }
                } catch (error) {
                  console.error("Error removing data:", error);
                }
              }}
            >
              <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
                OK
              </Text>
            </TouchableOpacity>
          </>
        </View>
      </View>
    );
  }
  if (isStarted) {
    return (
      <View style={{ width: "100%", height: "100" }}>
        <View
          style={{
            width: "95%",
            height: 440,
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 20,
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 15,
          }}
        >
          <>
            <AntDesign name={"closecircle"} size={100} color={"red"} />
            <Text style={{ fontSize: 20, marginTop: 20 }}>
              Ride Already Started
            </Text>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 20,
                fontWeight: "300",
                marginTop: 5,
              }}
            >
              The Driver Already Started The Ride
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                width: "30%",
                borderWidth: 2,
                borderColor: "red",
                paddingVertical: 10,
                borderRadius: 20,
              }}
              onPress={async () => {
                try {
                  if (driverId) {
                    const requestDocRef = ref(
                      db,
                      `POSTED_RIDES_TO_SCHOOL/${driverId}/request/${userReduxData.id}`
                    );

                    await remove(requestDocRef);
                    console.log("Data removed successfully");

                    await AsyncStorage.setItem(
                      "driverId",
                      JSON.stringify(null)
                    );
                    dispatch(setSaveDriverIdSchool(null));
                  } else {
                    console.log("No DriverPostID found in AsyncStorage");
                  }

                  if (origin) {
                    navigation.navigate("SearchingRide");
                  } else {
                    navigation.navigate("Home");
                  }
                } catch (error) {
                  console.error("Error removing data:", error);
                }
              }}
            >
              <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
                OK
              </Text>
            </TouchableOpacity>
          </>
        </View>
      </View>
    );
  }
};

export default RequestStatusSchool;

const styles = StyleSheet.create({});
