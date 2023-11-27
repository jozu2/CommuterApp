import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserProfile,
  setRideStarted,
  setRideStartedSchool,
  setSaveDriverId,
  setSaveDriverIdSchool,
  setUserProfile,
} from "../Redux/navSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("John Doe");
  const [driverID, setDriverId] = useState("0000");
  const [profilePic, setProfilePic] = useState(null);
  const FName = fullName === "John Doe";
  useEffect(() => {
    if (userProfile.id === null) return;
    setFullName(userProfile.info.fullName);
    setDriverId(userProfile.info.UserID);
    setProfilePic(userProfile.info.profilePic);
  }, [fullName, profilePic]);
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify({ info: null, id: null })
      );
      dispatch(setUserProfile({ info: null, id: null }));
      dispatch(setSaveDriverId(null));
      dispatch(setSaveDriverIdSchool(null));
      dispatch(setRideStarted(false));
      dispatch(setRideStartedSchool(false));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#393939" }}
      >
        <ImageBackground
          source={require("../assets/menu-bg.png")}
          style={{
            paddingTop: 20,
            paddingLeft: 12,
            paddingBottom: 20,
            paddingRight: 6,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: profilePic }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 500,
              marginBottom: 10,
              backgroundColor: "gray",
              borderWidth: 2,
              borderColor: "#ebebeb",
            }}
          />

          {!FName ? (
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ color: "#fff", fontSize: 17 }}>{fullName}</Text>
              <Text style={{ color: "#fff", fontSize: 12 }}>{driverID}</Text>
            </View>
          ) : null}
        </ImageBackground>

        <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
          <TouchableOpacity
            style={{
              marginTop: 100,
              borderWidth: 1,
              width: "70%",
              alignSelf: "center",
              borderRadius: 10,
            }}
            onPress={handleLogout}
          >
            <Text style={{ alignSelf: "center", paddingVertical: 8 }}>
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
