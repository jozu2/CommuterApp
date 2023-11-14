import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import {
  selectRequestHide,
  selectSaveDriverId,
  selectUserProfile,
  setRequestHide,
  setRideStarted,
  setSaveDriverId,
} from "../../Redux/navSlice";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import RideInfoModal from "./RideInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../config";
import { off, onValue, ref, remove } from "firebase/database";
import MapView, { Marker } from "react-native-maps";
import { removeLabels } from "./../../data/mapStyle";
import MapViewDirections from "react-native-maps-directions";
import Chat from "./Chat";
import { useNavigation } from "@react-navigation/native";
import ShowProfileDriver from "../../component/ShowProfileDriver";
import DriverProfileModal from "./DriverProfileModal";
const RideStarted = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const driverId = useSelector(selectSaveDriverId);
  const hideProfile = useSelector(selectRequestHide);
  const userReduxData = useSelector(selectUserProfile);
  const [fetchedData, setFetchedData] = useState(null);
  const [showRideInfo, setShowRideInfo] = useState(false);
  const [openDriver, setOpenDriver] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [prevMessages, setPrevMessages] = useState([]);
  const [changed, setChanged] = useState(false);
  const [fetchDataWithComID, setFetchDataWithComID] = useState(null);
  const [rideInfo, setRideInfo] = useState({
    duration: null,
    distance: null,
    description: null,
  });

  useEffect(() => {
    if (hideProfile) {
      setShowChat(false);
      setOpenDriver(false);

      setTimeout(() => {
        dispatch(setRequestHide(false));
      }, 100);
    }
  }, [hideProfile]);
  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.status.isFinished) {
        navigation.navigate("RideFinish");
      }
    }
  }, [fetchedData]);

  const handleCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
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
                `POSTED_RIDES/${driverId}/request/${userReduxData.id}`
              );

              await remove(requestDocRef);
              console.log("Data removed successfully");
              dispatch(setRideStarted(false));
              dispatch(setSaveDriverId(null));
            } else {
              console.log("No DriverPostID found in AsyncStorage");
            }
          } catch (error) {
            console.error("Error removing data:", error);
          }
        },
      },
    ]);
  };
  useEffect(() => {
    if (driverId !== null) {
      console.log("useEffect is running with driverId:", driverId);

      const dbRef = ref(db, "POSTED_RIDES/" + driverId);

      const onDataChange = (snapshot) => {
        const requestData = snapshot.val();
        if (!requestData) {
          console.log("No data found");
          dispatch(setRideStarted(false));
          setFetchedData(null);
          return;
        }

        const userRequestData =
          requestData.request && requestData.request[userReduxData.id];

        if (!userRequestData) {
          console.log("No Data of commuter id");
          dispatch(setRideStarted(false));
          setFetchedData(null);
          return;
        }
        setFetchDataWithComID(userRequestData);
        setFetchedData(requestData);
      };

      const errorCallback = (error) => {
        console.error("Error:", error);
      };

      onValue(dbRef, onDataChange, errorCallback);

      return () => off(dbRef, "value", onDataChange);
    }
  }, [driverId]);

  useEffect(() => {
    if (fetchedData && !fetchDataWithComID) {
      Alert.alert(
        "Notification",
        "Your ride request has been canceled by the driver."
      );
    }
  }, [fetchedData, fetchDataWithComID]);

  const mapRef = useRef(null);
  useEffect(() => {
    if (fetchedData && fetchedData.chat) {
      const dbRef = ref(db, `POSTED_RIDES/${driverId}/chat`);

      const onDataChanged = (snapshot) => {
        const chatData = snapshot.val();

        if (chatData) {
          const currentMessages = Object.values(chatData);

          if (currentMessages.length !== prevMessages.length) {
            setChanged(true);
            setPrevMessages(currentMessages);
          }
        }
      };

      onValue(dbRef, onDataChanged);

      return () => off(dbRef, onDataChanged);
    }
  }, [driverId, fetchedData, changed]);

  if (fetchedData) {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        {openDriver && (
          <>
            <DriverProfileModal
              data={userReduxData.info}
              id={fetchedData.driverInfo.driverId}
            />
          </>
        )}

        {showRideInfo && (
          <>
            <RideInfoModal
              origin={fetchedData.rideInfo.origin}
              destination={fetchedData.rideInfo.destination}
              vehicle={fetchedData.rideInfo.vehicle}
              status={fetchedData.status}
              driverProfile={fetchedData.driverInfo}
              rideInfo={rideInfo ? rideInfo : null}
            />
            <EvilIcons
              style={{ position: "absolute", top: 175, right: 40, zIndex: 200 }}
              name={"close"}
              size={45}
              color={"black"}
              onPress={() => {
                setShowRideInfo(false);
              }}
            />
          </>
        )}

        {showChat && (
          <>
            <Chat />
          </>
        )}
        <View
          style={{
            width: "96%",
            height: "80%",
            backgroundColor: "#ebebeb",
            alignSelf: "center",
            borderRadius: 10,
            marginTop: "15%",
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderRadius: 20,
              borderColor: "transparent",
            }}
          >
            <MapView
              showsMyLocationButton={false}
              showsUserLocation={false}
              scrollEnabled={true}
              zoomControlEnabled={false}
              ref={mapRef}
              customMapStyle={removeLabels}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
              region={{
                latitude: fetchedData.rideInfo.origin.latitude,
                longitude: fetchedData.rideInfo.origin.longitude,
                latitudeDelta: 0.031,
                longitudeDelta: 0.031,
              }}
            >
              <Marker
                style={{ width: 200, height: 200 }}
                coordinate={{
                  latitude: fetchedData.rideInfo.origin.latitude,
                  longitude: fetchedData.rideInfo.origin.longitude,
                }}
              >
                <Image
                  source={require("./../../assets/iconOrigin.png")}
                  style={{
                    width: 40,
                    height: 50,
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 0,
                  }}
                />
              </Marker>
              <Marker
                style={{ width: 200, height: 200 }}
                coordinate={{
                  latitude: fetchedData.rideInfo.destination.latitude,
                  longitude: fetchedData.rideInfo.destination.longitude,
                }}
              >
                <Image
                  source={require("./../../assets/iconDestination.png")}
                  style={{
                    width: 40,
                    height: 50,
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 0,
                  }}
                />
              </Marker>
              <MapViewDirections
                origin={{
                  latitude: fetchedData.rideInfo.origin.latitude,
                  longitude: fetchedData.rideInfo.origin.longitude,
                }}
                destination={{
                  latitude: fetchedData.rideInfo.destination.latitude,
                  longitude: fetchedData.rideInfo.destination.longitude,
                }}
                waypoints={
                  fetchedData.rideInfo.waypoints !== null
                    ? fetchedData.rideInfo.waypoints
                    : [
                        {
                          latitude: fetchedData.rideInfo.origin.latitude,
                          longitude: fetchedData.rideInfo.origin.longitude,
                        },
                      ]
                }
                apikey="AIzaSyBVtjPXDhyI3n_xnDYYbX0lOK3zpNQg_1o"
                strokeWidth={4}
                strokeColor="green"
                onReady={(result) => {
                  const distance = result.distance || 0;
                  const duration = result.duration || 0;
                  const description = result.legs[0].end_address;
                  setRideInfo({
                    duration: duration,
                    distance: distance,
                    description: description,
                  });

                  if (!fetchedData.status.isStarted) {
                    mapRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        top: 50,
                        right: 50,
                        bottom: 5,
                        left: 5,
                      },
                    });
                  }
                }}
              />
            </MapView>
          </View>
          {!fetchedData.status.isStarted && (
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                paddingVertical: 12,
                backgroundColor: "#f03f46",
                width: "30%",
                borderRadius: 30,
                position: "absolute",
                left: 20,
                bottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              width: !fetchedData.status.isStarted ? "70%" : "50%",
              height: 60,
              backgroundColor: !fetchedData.status.isStarted
                ? "#696969"
                : "#ebebeb",
              borderRadius: 11,
              borderTopEndRadius: 30,
              borderBottomStartRadius: 30,
              position: "absolute",
              top: -30,
              zIndex: 3,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            {!fetchedData.status.isStarted && (
              <Animatable.Text
                animation="fadeIn"
                iterationCount="infinite"
                style={{ fontSize: 16, color: "#fff" }}
              >
                Waiting for Driver to Start...
              </Animatable.Text>
            )}
            {fetchedData.status.isStarted && (
              <Animatable.Text
                animation="fadeOut"
                iterationCount="infinite"
                style={{ fontSize: 17, color: "#121212", fontWeight: "bold" }}
              >
                Ride Started
              </Animatable.Text>
            )}
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            alignItems: "center",
            top: "30%",
            right: 20,
          }}
        >
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setOpenDriver(true);
            }}
          >
            <FontAwesome name="user-circle-o" size={50} color={"#302c34"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setShowRideInfo(true);
            }}
          >
            <MaterialCommunityIcons
              name="clipboard-text"
              size={50}
              color={"#302c34"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              setShowChat(true);
              setChanged(false);
            }}
          >
            <Entypo name="chat" size={47} color={"#302c34"} />
            {changed && (
              <Text
                style={{
                  backgroundColor: "#f03f46",
                  color: "#fff",
                  textAlign: "center",
                  width: 15,
                  height: 15,
                  borderRadius: 20,
                  position: "absolute",
                  right: -10,
                }}
              ></Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default RideStarted;

const styles = StyleSheet.create({});
