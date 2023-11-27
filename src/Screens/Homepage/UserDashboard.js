import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "./../../component/TopNav";
import RequestBtn from "./RequestBtn";
import RideStarted from "./RideStarted";
import { useSelector } from "react-redux";
import {
  selectRideStarted,
  selectRideStartedSchool,
  selectSaveDriverId,
  selectSaveDriverIdSchool,
} from "../../Redux/navSlice";
import RequestStatus from "./RequestStatus";
import RequestStatusSchool from "./RequestStatusSchool";
import RideStartedSchool from "./RideStartedSchool";

const UserDashboard = () => {
  const driverId = useSelector(selectSaveDriverId);
  const driverIdSchool = useSelector(selectSaveDriverIdSchool);
  const rideStarted = useSelector(selectRideStarted);
  const rideStartedSchool = useSelector(selectRideStartedSchool);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNav showBurger={true} />
      {rideStarted ? (
        <View style={styles.loadingContainer}>{<RideStarted />}</View>
      ) : rideStartedSchool ? (
        <View style={styles.loadingContainer}>{<RideStartedSchool />}</View>
      ) : driverId !== null ? (
        <View style={styles.loadingContainer}>{<RequestStatus />}</View>
      ) : driverIdSchool !== null ? (
        <View style={styles.loadingContainer}>{<RequestStatusSchool />}</View>
      ) : (
        <View style={styles.loadingContainer}>{<RequestBtn />}</View>
      )}
    </SafeAreaView>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313133",
  },
});
