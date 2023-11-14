import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "../../component/TopNav";
import { firebase } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSaveDriverId,
  selectUserProfile,
  setRideStarted,
  setSaveDriverId,
} from "../../Redux/navSlice";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";

const RideFinish = () => {
  const userReduxData = useSelector(selectUserProfile);
  const driverSavedId = useSelector(selectSaveDriverId);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [runOne, setRunOne] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);
  const [saveID, setSaveID] = useState(null);
  console.log(userReduxData.info.star);
  useEffect(() => {
    if (runOne) {
      setSaveID(driverSavedId);
      setRunOne(false);
    }
  }, [setSaveID, setRunOne]);
  const handleHome = async () => {
    const db = firebase.firestore();
    const docRef = db.collection("commuters").doc(userReduxData.id);

    const updatedData = {
      completedRide: userReduxData.info.completedRide + 1,
    };
    try {
      await docRef.update(updatedData);
      console.log("Driver's completedRide count updated successfully");
      dispatch(setSaveDriverId(null));
      dispatch(setRideStarted(null));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating driver's completedRide count:", error);
    }
  };
  const handlePlusStart = async () => {
    if (saveID) {
      const db = firebase.firestore();
      const docRef = db.collection("drivers").doc(saveID);

      try {
        const snapshot = await docRef.get();
        const currentStarCount = snapshot.data()?.star || 0;
        await docRef.update({ star: currentStarCount + 1 });
        setDisableBtn(true);

        console.log("Driver's star count updated successfully");
      } catch (error) {
        console.error("Error updating driver's star count:", error);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNav />
      <View style={styles.loadingContainer}>
        <View
          style={{
            backgroundColor: "#fff",
            width: "95%",
            paddingVertical: 40,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 27, fontWeight: "bold", color: "#121212" }}>
            {`🎉   Ride Complete!   🎉`}
          </Text>
          <Text style={{ lineHeight: 14, fontSize: 14 }}>
            The Ride Has Ended
          </Text>

          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              textAlign: "center",
              marginTop: 20,
              width: "100%",
            }}
          >
            As a token of appreciation, if you enjoyed the ride, consider
            sharing a star .Your feedback is invaluable and helps us maintain a
            high standard of service.
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              backgroundColor: disableBtn ? "gray" : "#25a45c",
              paddingHorizontal: 18,
              borderRadius: 30,
              marginTop: 15,
            }}
            disabled={disableBtn}
            onPress={handlePlusStart}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>+1⭐</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              backgroundColor: "#8660bf",
              paddingHorizontal: 18,
              borderRadius: 10,
              marginTop: 40,
            }}
            onPress={handleHome}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Go Back Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideFinish;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313338",
  },
});
