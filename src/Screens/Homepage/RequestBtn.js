import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Location from "expo-location";
import { useRef, useState, useEffect } from "react";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../Redux/navSlice";

const RequestBtn = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const driverData = useSelector(selectUserProfile);
  const [activeIndicator, setActiveIndicator] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (activeIndicator) {
      timeoutId = setTimeout(() => {
        setActiveIndicator(false);
        Alert.alert("Please try again.");
      }, 5000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [activeIndicator]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const handleCreateRide = async () => {
    setActiveIndicator(true);
    if (!driverData.info.isVerified) {
      setActiveIndicator(false);
      Alert.alert(
        "Sorry!",
        "You cannot create a ride at this time as your account is currently under review."
      );

      return;
    }
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setActiveIndicator(false);

        Alert.alert(
          "Can't Create Ride : Access location was denied",
          " Please go to settings and enable the location permission",
          [
            {
              text: "Go To Settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
            {
              text: "Ok",
              style: "cancel",

              style: "ok",
            },
          ]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);

      if (location) {
        const currentLat = location.coords.latitude;
        const currentLon = location.coords.longitude;
        const targetLat = 14.9977;
        const targetLon = 120.6549;
        const distance = calculateDistance(
          currentLat,
          currentLon,
          targetLat,
          targetLon
        );

        if (distance <= 40) {
          setActiveIndicator(false);

          navigation.navigate("chooseRide");
        } else {
          setActiveIndicator(false);

          Alert.alert(
            "Sorry You Can't Create a Ride",
            "Creating a ride is only allowed when you are within the campus vicinity"
          );
        }
      } else {
        setActiveIndicator(false);

        Alert.alert("Error getting location. Please try again.");
      }
    } catch (error) {
      setActiveIndicator(false);

      console.log(error);
    }
  };

  return (
    <View>
      {activeIndicator && <ActivityIndicator size="large" color="gray" />}

      <MapView
        showsUserLocation={true}
        style={{
          zIndex: -12,
        }}
        ref={mapRef}
        scrollEnabled={false}
        zoomEnabled={false}
        region={{
          latitude: 14.997609051113422,
          longitude: 120.6530592776835,
          latitudeDelta: 0.21,
          longitudeDelta: 0.21,
        }}
      ></MapView>
      {!activeIndicator && (
        <TouchableOpacity
          style={styles.addContainer}
          onPress={handleCreateRide}
        >
          <View style={styles.wl}></View>
          <View style={styles.wl2}></View>
          <View style={styles.wl3}></View>
          <View style={styles.wl4}></View>
          <AntDesign name="plus" color={"gray"} size={80} style={styles.Icon} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "300",
          textAlign: "center",
          color: activeIndicator ? "#ebebeb" : "#fff",
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        {activeIndicator ? "Loading . . ." : "REQUEST A RIDE"}
      </Text>
    </View>
  );
};

export default RequestBtn;

const styles = StyleSheet.create({
  wl: {
    backgroundColor: "#313133",

    width: 200,
    height: 20,
    bottom: -10,
    position: "absolute",
    alignSelf: "center",
    zIndex: 10,
  },
  wl2: {
    backgroundColor: "#313133",

    width: 200,
    height: 20,
    top: -10,
    position: "absolute",
    alignSelf: "center",
    zIndex: 10,
  },
  wl3: {
    backgroundColor: "#313133",

    width: 20,
    height: 200,
    top: 40,
    left: -10,
    position: "absolute",
    alignSelf: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },
  wl4: {
    backgroundColor: "#313133",

    width: 20,
    height: 200,
    top: 40,
    right: -10,
    position: "absolute",
    alignSelf: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },
  addContainer: {
    width: 300,
    alignSelf: "center",
    height: 280,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#ebebeb",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15%",
  },
});
