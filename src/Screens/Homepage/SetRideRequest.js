import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import TopNav from "../../component/TopNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectUserCount,
  setUserCount,
} from "../../Redux/navSlice";
import Feather from "react-native-vector-icons/Feather";
import { Keyboard } from "react-native";

const SetRideRequest = () => {
  const navigation = useNavigation();
  const number = useSelector(selectUserCount);
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const handleSearchRide = () => {
    if (origin.title === null) {
      Alert.alert("Please Set your Entry point");
      return;
    }
    if (destination.description === null) {
      Alert.alert("Please Set your destination point");
      return;
    }
    navigation.navigate("SearchingRide");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNav backBtn={true} />
      <View style={styles.loadingContainer}>
        <View style={styles.mainContainer}>
          <Text style={styles.titleMain}>Set up Ride Requests</Text>
          <TouchableOpacity
            style={styles.btnSetOrigin}
            onPress={() => {
              navigation.navigate("SetOriginPlace");
            }}
          >
            <Text style={styles.setOriginText}>
              {origin.title ? (
                <Text>
                  {`Waiting Area: ${origin.title}  `}

                  <Feather name="edit-2" size={14} color={"black"} />
                </Text>
              ) : (
                "Set up Entry point"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSetDestination}
            onPress={() => {
              navigation.navigate("SetDestination");
            }}
          >
            <Text style={styles.setDestinationText}>
              {destination.title ? (
                <Text>
                  {`Destination : ${destination.title}  `}

                  <Feather name="edit-2" size={14} color={"#fff"} />
                </Text>
              ) : (
                "Set up Destination"
              )}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "400" }}
            >{`Number of Passenger:    `}</Text>
            <TextInput
              style={styles.TextInp}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-5]/g, "");

                if (numericText.length > 0 && parseInt(numericText) !== 0) {
                  dispatch(setUserCount(numericText));
                } else {
                  dispatch(setUserCount(""));
                }

                if (numericText.length > 0 && parseInt(numericText) !== 0) {
                  Keyboard.dismiss();
                }
              }}
              placeholder={`${number}`}
              maxLength={1}
              keyboardType="numeric"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btnConfirm} onPress={handleSearchRide}>
          <Text style={styles.setConfirmText}>Search Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetRideRequest;

const styles = StyleSheet.create({
  TextInp: {
    width: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 2,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 17,
  },
  setConfirmText: {
    textAlign: "center",
    paddingHorizontal: 5,
    fontSize: 19,
    color: "#fff",
    fontWeight: "400",
  },
  setDestinationText: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
  },
  setOriginText: {
    textAlign: "center",
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: "400",
  },
  btnConfirm: {
    borderWidth: 2,
    borderColor: "black",
    marginTop: 40,
    borderRadius: 14,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#25a45c",
    paddingVertical: 10,
    marginBottom: 30,
  },
  btnSetDestination: {
    marginTop: 20,
    borderWidth: 1,

    borderRadius: 30,
    width: "70%",
    alignSelf: "center",
    backgroundColor: "#8660bf",
    paddingVertical: 12,
    marginBottom: 15,
  },
  btnSetOrigin: {
    marginTop: 30,
    borderRadius: 30,
    width: "70%",
    alignSelf: "center",
    backgroundColor: "#ebebeb",
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 12,
  },
  titleMain: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: "#1e1f22",
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    color: "#fff",
    paddingVertical: 20,
  },
  mainContainer: {
    width: "90%",
    borderLeftWidth: 7,
    borderBottomWidth: 4,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313133",
  },
});
