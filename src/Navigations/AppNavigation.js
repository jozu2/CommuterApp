import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, setUserProfile } from "../Redux/navSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./../component/LoadingScreen";
import StackNav from "./StackNavs";
const AppNavigation = () => {
  const driverProfile = useSelector(selectUserProfile);
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    checkUserAuthentication();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const checkUserAuthentication = async () => {
    try {
      const driverFirestore = await AsyncStorage.getItem("userInfo");
      const parsedDriverData = JSON.parse(driverFirestore);
      if (driverFirestore) {
        setIsLoading(true);

        dispatch(setUserProfile(parsedDriverData));

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      ) : driverProfile.id ? (
        <StackNav />
      ) : (
        <Login />
      )}
    </>
  );
};

export default AppNavigation;
