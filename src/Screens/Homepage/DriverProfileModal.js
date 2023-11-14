import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import { selectSaveDriverId, setRequestHide } from "../../Redux/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "./../../../config";

const DriverProfileModal = ({ data, id }) => {
  const driverId = useSelector(selectSaveDriverId);
  console.log(driverId);
  const [starCount, setStarCount] = useState(null);
  const [totalRides, setTotalRides] = useState(null);
  const [name, setName] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchStarCount = async () => {
      if (driverId) {
        const db = firebase.firestore();
        const docRef = db.collection("drivers").doc(driverId);

        try {
          const snapshot = await docRef.get();

          if (snapshot.exists) {
            const currentStarCount = snapshot.data()?.star || 0;
            setStarCount(currentStarCount);
            const currentRideCount = snapshot.data()?.completedRide || 0;
            setTotalRides(currentRideCount);

            const name = snapshot.data()?.fullName || 0;
            setName(name);

            const faculty = snapshot.data()?.faculty || 0;
            setFaculty(faculty);

            const address = snapshot.data()?.address || 0;
            setAddress(address);
            const image = snapshot.data()?.profilePic || 0;
            setImage(image);
          } else {
            console.log("Driver document does not exist");
          }
        } catch (error) {
          console.error("Error fetching driver's star count:", error);
        }
      }
    };

    fetchStarCount();
  }, [driverId]);
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => {
        dispatch(setRequestHide(true));
      }}
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "absolute",
        alignContent: "center",
        paddingTop: 140,
        paddingBottom: 110,
      }}
    >
      <Pressable
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          marginBottom: "60%",
        }}
      >
        <Text
          style={{
            fontSize: 34,
            color: "#fff",
            marginBottom: 20,
            fontWeight: "bold",
            marginTop: 100,
            alignSelf: "center",
          }}
        ></Text>
        <View
          style={{
            backgroundColor: "#fff",
            width: 340,
            justifyContent: "center",
            borderLeftWidth: 4,
            borderBottomWidth: 2,
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 130,
              height: 130,
              borderRadius: 130,
              borderWidth: 4,
              borderColor: "#25a45c",
              marginTop: 40,
            }}
          />
          <View
            style={{
              paddingBottom: 50,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "500",
                alignSelf: "center",
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                lineHeight: 14,
                fontSize: 14,
                fontWeight: "400",
                alignSelf: "center",
              }}
            >
              {`Teaching in BS${faculty} `}
            </Text>

            <View
              style={{
                top: -2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="location" size={20} color="#25a45c" />

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                  alignSelf: "center",
                }}
              >
                {address}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#8660bf",
                width: "90%",
                alignSelf: "center",
                borderRadius: 50,
                position: "absolute",
                bottom: -30,
                borderBottomColor: "gray",
                borderWidth: 2,
              }}
            >
              <View
                style={{
                  display: "flex",
                  paddingHorizontal: 54,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "400",
                        color: "#fff",
                      }}
                    >
                      {totalRides}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#ebebeb",
                      }}
                    >
                      Total Rides
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "400",
                        color: "#fff",
                      }}
                    >
                      {starCount}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#ebebeb",
                      }}
                    >
                      ⭐
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
};

export default DriverProfileModal;

const styles = StyleSheet.create({});
