import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "../../component/TopNav";
import { db } from "../../../config";
import { off, onValue, ref, remove, set } from "firebase/database";
import moment from "moment-timezone";
import "moment-timezone";
import ShowProfileDriver from "../../component/ShowProfileDriver";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestinationSchool,
  selectUserCount,
  selectUserProfile,
  setSaveDriverIdSchool,
} from "../../Redux/navSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function formatTimeAgo(timePosted) {
  const now = moment();
  const postedTime = moment(timePosted, "HH:mm:ss");
  const timeDifference = now.diff(postedTime, "minutes");
  return `${timeDifference} ${timeDifference !== 1 ? "mins" : "min"} ago`;
}
function calculatePassengerAvailable(seatsOccupied, seatCapacity) {
  const availableSeats = seatCapacity - seatsOccupied;

  return Math.max(availableSeats, 0);
}
const SearchingRideToSchool = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [driverDetails, setDriverDetails] = useState(null);
  const origin = useSelector(selectDestinationSchool);
  const [destination, setDestination] = useState({ title: "DHVSU" });
  console.log(destination.title);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const numberOfPassenger = useSelector(selectUserCount);
  const userReduxData = useSelector(selectUserProfile);
  useEffect(() => {
    const dbRef = ref(db, `POSTED_RIDES_TO_SCHOOL`);

    const onDataChange = (snapshot) => {
      const requestData = snapshot.val();

      if (!requestData) {
        console.log("No data found");
        setIsFetching(false);
        return;
      }
      const flatData = Object.values(requestData).flatMap((rideData) =>
        rideData.rideInfo &&
        !rideData.status.isStarted &&
        rideData.rideInfo.origin.title === origin.title &&
        rideData.rideInfo.destination.title === destination.title
          ? rideData
          : []
      );
      setFetchedData(flatData);
      setIsFetching(false);
    };

    const errorCallback = (error) => {
      console.error("Error:", error);
    };

    onValue(dbRef, onDataChange, errorCallback);

    return () => off(dbRef, "value", onDataChange);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#313133",
      }}
    >
      <TopNav backBtn={true} />
      {!fetchedData ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={100} color="#fff" />
        </View>
      ) : showProfile && driverDetails ? (
        <View style={styles.loadingContainer2}>
          <ShowProfileDriver data={driverDetails} />
          <TouchableOpacity>
            <EvilIcons
              style={{
                position: "absolute",
                zIndex: 30,
                bottom: 80,
                alignSelf: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: 9,
                borderRadius: 30,
              }}
              name={"close"}
              size={50}
              color={"#ebebeb"}
              onPress={() => setShowProfile(false)}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              textAlign: "center",
              color: "#fff",
              marginTop: 55,
            }}
          >
            {fetchedData
              ? `Search Results: ${fetchedData.length} available rides found`
              : ""}
          </Text>
          <ScrollView
            style={{
              flex: 1,
              width: "93%",
              marginTop: 5,
              marginBottom: 30,
            }}
          >
            {fetchedData.map((data, index) => (
              <View key={index} style={styles.dataContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setDriverDetails(data.driverInfo);
                      setShowProfile(true);
                    }}
                  >
                    <Image
                      source={{ uri: data.driverInfo.driverPic }}
                      style={{
                        width: 95,
                        height: 95,
                        borderRadius: 100,
                        borderWidth: 3,
                        borderColor: "gray",
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      marginHorizontal: 15,
                      alignSelf: "center",
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>
                      {data.driverInfo?.driverName}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          lineHeight: 15,
                          fontSize: 15,
                          fontWeight: "400",
                          marginRight: 10,
                        }}
                      >
                        {` ${data.rideInfo.vehicle.SeatOccupied}/${data.rideInfo.vehicle.seatCapacity}`}
                      </Text>
                      <TouchableOpacity
                        style={{
                          width: "50%",
                          backgroundColor: "gray",
                          paddingVertical: 10,

                          borderRadius: 10,
                        }}
                        onPress={async () => {
                          const seatOccupied =
                            data.rideInfo.vehicle.SeatOccupied;
                          const seatCapacity = parseInt(
                            data.rideInfo.vehicle.seatCapacity,
                            10
                          );
                          const avail = seatCapacity - seatOccupied;

                          if (seatOccupied >= seatCapacity) {
                            Alert.alert("Sorry!,", "no seats are available");
                            return;
                          }

                          if (numberOfPassenger > avail) {
                            Alert.alert(
                              "Sorry!,",
                              `Only ${avail} seats available`
                            );
                            return;
                          }

                          const userD = userReduxData.info;
                          const userCount = parseInt(numberOfPassenger);

                          try {
                            await set(
                              ref(
                                db,
                                `POSTED_RIDES_TO_SCHOOL/${data.driverInfo.driverId}/request/${userReduxData.id}`
                              ),
                              {
                                userInfo: {
                                  fullName: userD.fullName,
                                  accID: userReduxData.id,
                                  userCount: userCount,
                                  faculty: userD.faculty,
                                  userProfile: userD.profilePic,
                                  userID: userD.UserID,
                                  address: userD.address,
                                  completedRide: userD.completedRide,
                                },
                                status: {
                                  isAccepted: false,
                                  isDeclined: false,
                                  isDropped: false,
                                },
                              }
                            );

                            dispatch(
                              setSaveDriverIdSchool(data.driverInfo.driverId)
                            );
                            await AsyncStorage.setItem(
                              "driverId",
                              JSON.stringify(data.driverInfo.driverId)
                            );
                            navigation.navigate("Home");
                          } catch (error) {
                            console.error(
                              "Error adding data to Firebase:",
                              error
                            );
                          }
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "#fff" }}>
                          Request
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchingRideToSchool;

const styles = StyleSheet.create({
  dataContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderLeftWidth: 7,
    borderBottomWidth: 4,
    alignSelf: "center",
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313133",
  },
  loadingContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313133",
  },
});
