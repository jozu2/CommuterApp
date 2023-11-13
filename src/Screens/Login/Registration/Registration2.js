import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRegistrationInfo,
  setRegistrationInfo,
} from "../../../Redux/navSlice";
import { useEffect } from "react";
const Registration2 = () => {
  const navigation = useNavigation();
  const regInfo = useSelector(selectRegistrationInfo);
  const [selectedFaculty, setselectedFaculty] = useState("");
  const [selectedGender, setselectedGender] = useState("");
  const Faculty = ["IT", "ICT", "HRM", "BM", "COE"];
  const Gender = ["Male", "Female"];
  const [teacherID, setTeacherID] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const [errorId, setErrorId] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorFaculty, setErrorFaculty] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  useEffect(() => {
    if (errorId) {
      setTimeout(() => {
        setErrorId(false);
      }, 3000);
    }
    if (errorAddress) {
      setTimeout(() => {
        setErrorAddress(false);
      }, 3000);
    }
    if (errorFaculty) {
      setTimeout(() => {
        setErrorFaculty(false);
      }, 3000);
    }
  }, [errorId, errorAddress, errorFaculty]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
      }}
    >
      <Image
        source={require("./../../../assets/Icon.png")}
        style={{
          width: 110,
          height: 110,
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>Register</Text>

      <Text style={styles.sub}>
        Provide your information to complete the registration process
      </Text>
      <TextInput
        style={[styles.inputBox, { borderColor: errorId ? "red" : "#121212" }]}
        placeholder="ID Number"
        defaultValue={teacherID}
        autoCorrect={false}
        returnKeyType="next"
        keyboardType="number-pad"
        onChangeText={(id) => setTeacherID(id)}
      />
      {errorId && <Text style={styles.txtError}>* Invalid ID Number</Text>}
      <TextInput
        style={[
          styles.inputBox,
          { borderColor: errorAddress ? "red" : "#121212" },
        ]}
        placeholder="Address"
        defaultValue={address}
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(add) => setAddress(add)}
      />
      {errorAddress && (
        <Text style={styles.txtError}>* Please Fill up the Address</Text>
      )}
      <View style={styles.dropDown}>
        <Picker
          selectedValue={selectedFaculty}
          onValueChange={(itemValue, itemIndex) =>
            setselectedFaculty(itemValue)
          }
        >
          <Picker.Item
            label="Select Faculty"
            value=""
            style={{ color: "gray", fontSize: 17 }}
          />
          {Faculty.map((faculty, index) => (
            <Picker.Item label={faculty} value={faculty} key={index} />
          ))}
        </Picker>
      </View>
      {errorFaculty && (
        <Text style={styles.txtError}>
          * Please choose your Faculty building
        </Text>
      )}

      <View style={styles.dropDown}>
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue, itemIndex) => setselectedGender(itemValue)}
        >
          <Picker.Item
            label="Gender"
            value=""
            style={{ color: "gray", fontSize: 17 }}
          />
          {Gender.map((gender, index) => (
            <Picker.Item label={gender} value={gender} key={index} />
          ))}
        </Picker>
      </View>
      {errorGender && (
        <Text style={styles.txtError}>
          * Please choose your Gender building
        </Text>
      )}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (teacherID.length < 7) {
            setErrorId(true);
            return;
          }
          if (address.length < 7) {
            setErrorAddress(true);
            return;
          }

          if (selectedFaculty === "") {
            setErrorFaculty(true);
            return;
          }

          if (selectedGender === "") {
            setErrorGender(true);
            return;
          }

          const OldAndNewData = {
            ...regInfo,
            selectedFaculty,
            selectedGender,
            teacherID,
            address,
          };

          dispatch(setRegistrationInfo(OldAndNewData));
          navigation.navigate("Registration3");
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Registration2;

const styles = StyleSheet.create({
  txtError: {
    color: "red",
    marginTop: -10,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  dropDown: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: "90%",
    marginTop: 5,
    borderRadius: 8,
    borderColor: "#121212",
    marginBottom: 12,
  },
  loginBtn: {
    backgroundColor: "gray",
    width: "90%",
    paddingVertical: 8,
    marginVertical: 30,
    borderRadius: 10,
  },
  inputBox: {
    borderWidth: 1.2,
    width: "90%",
    borderRadius: 8,
    paddingVertical: 5,
    fontSize: 15,
    borderColor: "#121212",
    paddingLeft: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    marginVertical: 12,

    fontWeight: "bold",
  },
  sub: {
    paddingHorizontal: 40,
    textAlign: "center",
    marginVertical: 17,
  },
});
