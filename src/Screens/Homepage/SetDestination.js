import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDestination, setOrigin } from "../../Redux/navSlice";
import { markers } from "../../data/destinationEndpoints";
import { mapDarkStyle } from "../../data/mapStyle";
import TopNav from "../../component/TopNav";
import { SafeAreaView } from "react-native-safe-area-context";

const SetDestination = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pressedMarkerPic, setPressedMarkerPic] = useState({
    img1: null,
    img2: null,
  });
  const [pressedMarkerDes, setPressedMarkerDes] = useState(null);
  const [takeMarkerCoordinates, setTakeMarkerCoordinates] = useState({
    latitude: "",
    longitude: "",
    description: "",
    title: "",
  });
  const [viewPicture, setViewPicture] = useState(null);
  const [showBottomBox, setShowBottomBox] = useState(false);
  const [showModalPic, setShowModalPic] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNav showBurger={false} backBtn={true} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#313133",
        }}
      >
        <MapView
          showsMyLocationButton={false}
          showsUserLocation={false}
          ref={mapRef}
          customMapStyle={mapDarkStyle}
          style={{
            width: "100%",
            height: "100%",
            zIndex: -2,
          }}
          region={{
            latitude: 14.9996518,
            longitude: 120.6513158,
            latitudeDelta: 0.0541,
            longitudeDelta: 0.0541,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              pinColor="red"
              onPress={() => {
                setPressedMarkerPic({
                  img1: marker.image,
                  img2: marker.image2,
                });
                setPressedMarkerDes({
                  title: marker.title,
                  desc: marker.description,
                });

                setTakeMarkerCoordinates({
                  latitude: marker.coordinate.latitude,
                  longitude: marker.coordinate.longitude,
                  description: marker.description,
                });
                setShowBottomBox(true);
              }}
            />
          ))}
        </MapView>
      </View>

      {showBottomBox && (
        <>
          <View
            style={{
              backgroundColor: "#313338",
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
              width: "101%",
              borderTopLeftRadius: 17,
              borderTopRightRadius: 17,
              paddingBottom: 20,
              paddingHorizontal: 20,
              borderWidth: 3,
              borderColor: "#1e1f22",
            }}
          >
            <TouchableOpacity
              style={{
                width: 110,
                height: 70,
                borderRadius: 5,
                position: "absolute",
                top: -83,
                left: 10,
              }}
              onPress={() => {
                setViewPicture(pressedMarkerPic.img1);
                setShowModalPic(true);
              }}
            >
              <Image
                source={pressedMarkerPic.img1}
                style={{
                  borderWidth: 2,
                  borderColor: "#25a45c",
                  borderRadius: 5,
                  width: "100%",
                  height: "100%",
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 110,
                height: 70,
                borderRadius: 5,
                position: "absolute",
                top: -83,
                left: 130,
              }}
              onPress={() => {
                setViewPicture(pressedMarkerPic.img2);
                setShowModalPic(true);
              }}
            >
              <Image
                source={pressedMarkerPic.img2}
                style={{
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#25a45c",
                  width: "100%",
                  height: "100%",
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 26,
                fontWeight: "400",
                paddingTop: 20,
                color: "#fff",
              }}
            >
              {pressedMarkerDes.title}
            </Text>
            <Text style={{ color: "gray", fontSize: 16, marginBottom: 20 }}>
              {pressedMarkerDes.desc}
            </Text>
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                borderRadius: 22,
                backgroundColor: "#8660bf",
                alignSelf: "flex-end",
                marginRight: 5,
                width: "60%",
                paddingVertical: 9,
                marginBottom: 5,
              }}
              onPress={() => {
                dispatch(
                  setDestination({
                    latitude: takeMarkerCoordinates.latitude,
                    longitude: takeMarkerCoordinates.longitude,
                    description: takeMarkerCoordinates.description,
                    title: pressedMarkerDes.title,
                  })
                );
                navigation.navigate("SetRideRequest");
              }}
            >
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 18,
                  paddingRight: 2,
                  color: "#fff",
                }}
              >
                Set Destination
              </Text>
              <MaterialIcons name="done" size={25} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </>
      )}

      {showModalPic && (
        <Pressable
          onPress={() => {
            setShowModalPic(false);
          }}
          style={{
            flex: 1,
            position: "absolute",

            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
            backgroundColor: "rgba(0, 0, 0, 0.63)",
          }}
        >
          <View style={{ width: "100%", height: "40%" }}>
            <Image
              source={viewPicture}
              style={{
                borderRadius: 10,

                width: "100%",
                height: "100%",
                alignSelf: "center",
                position: "absolute",
                bottom: 0,
              }}
            />
          </View>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default SetDestination;

const styles = StyleSheet.create({});
