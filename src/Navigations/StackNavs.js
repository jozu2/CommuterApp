import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./../component/LoadingScreen";
import SetAvatar from "./../Screens/AvatarSetup/SetAvatar";
import { useDispatch } from "react-redux";
import { firebase } from "./../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserProfile } from "../Redux/navSlice";
import SetRideRequest from "../Screens/Homepage/SetRideRequest";
import SetOriginPlace from "../Screens/Homepage/SetOriginPlace";
import SetDestination from "../Screens/Homepage/SetDestination";
import SearchingRide from "../Screens/Homepage/SearchingRide";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchAvatar, setFetchAvatar] = useState(null);
  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const driverFirestore = await AsyncStorage.getItem("userInfo");
        const parsedDriverData = JSON.parse(driverFirestore);
        if (parsedDriverData.id !== null) {
          const docRef = firebase
            .firestore()
            .collection("commuters")
            .doc(parsedDriverData.id);
          docRef.onSnapshot(async (doc) => {
            if (doc.exists) {
              const userData = doc.data();

              await AsyncStorage.setItem(
                "userInfo",
                JSON.stringify({ info: userData, id: parsedDriverData.id })
              );

              const driverData = await AsyncStorage.getItem("userInfo");
              const driverDataParsed = JSON.parse(driverData);

              dispatch(setUserProfile(driverDataParsed));
              setFetchAvatar(driverDataParsed.info.isAvatarSet);
              setIsLoading(false);
            }
          });
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error checking user authentication:", error);
      }
    };

    fetchFirestoreData();
  }, [fetchAvatar, dispatch]);

  if (isLoading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="UserNavHome"
        screenOptions={{ headerShown: false }}
      >
        {!fetchAvatar && (
          <Stack.Screen name="SetAvatar" component={SetAvatar} />
        )}
        <Stack.Screen name="Home" component={Drawer} />
        <Stack.Screen name="SetRideRequest" component={SetRideRequest} />
        <Stack.Screen name="SetOriginPlace" component={SetOriginPlace} />
        <Stack.Screen name="SetDestination" component={SetDestination} />
        <Stack.Screen name="SearchingRide" component={SearchingRide} />
      </Stack.Navigator>
    );
  }
};

export default StackNav;

const styles = StyleSheet.create({});
