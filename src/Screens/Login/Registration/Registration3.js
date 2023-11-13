import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRegistrationInfo,
  selectSavedImage,
} from "../../../Redux/navSlice";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Alert } from "react-native";
import { TextInput } from "react-native";
import moment from "moment-timezone";
import { firebase } from "./../../../../config";

const Registration3 = () => {
  const [isChecked, setChecked] = useState(false);
  const [showModalTerms, setShowModalTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const regInfo = useSelector(selectRegistrationInfo);
  const ImageData = useSelector(selectSavedImage);
  const isAvatarSet = false;
  const isVerified = false;
  const completedRide = 0;
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");
  const dateCreated = formattedDate;
  const registerDriver = async (
    email,
    password,
    fullName,
    address,
    UserID,
    mobileNo,
    faculty,
    gender,
    isVerified,
    isAvatarSet,
    completedRide,
    dateCreated,
    imageDataURI
  ) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await userCredential.user.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://v5angkas.firebaseapp.com",
      });

      const imageName = "schoolID" + userCredential.user.uid + ".jpg";

      const storageRef = firebase
        .storage()
        .ref(
          "student_images/" + `${userCredential.user.uid}/schoolID/` + imageName
        );

      const imageBlob = await fetch(imageDataURI).then((response) =>
        response.blob()
      );

      await storageRef.put(imageBlob);

      const imageUrl = await storageRef.getDownloadURL();

      await firebase
        .firestore()
        .collection("commuters")
        .doc(userCredential.user.uid)
        .set({
          email,
          fullName,
          address,
          UserID,
          mobileNo,
          faculty,
          gender,
          isVerified,
          isAvatarSet,
          completedRide,
          dateCreated,
          imageUrl,
        });
      Alert.alert("Success!", "We sent you an email for a confirmation link");
      navigation.navigate("ThankYou");
    } catch (error) {
      setIsLoading(false);
      alert("Registration and image upload failed: " + error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
      }}
    >
      {isLoading && (
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            position: "absolute",
            alignContent: "center",
            justifyContent: "center",
            paddingTop: 140,
            paddingBottom: 110,
          }}
        >
          <View
            style={{
              width: 200,
              height: 200,
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 20,
              backgroundColor: "#fff",
            }}
          >
            <ActivityIndicator size={70} color="gray" />
          </View>
        </View>
      )}
      {showModalTerms && (
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            alignContent: "center",
            justifyContent: "center",
            paddingTop: 140,
            paddingBottom: 110,
          }}
        >
          <EvilIcons
            style={{ position: "absolute", top: 155, zIndex: 30, right: 25 }}
            name={"close"}
            size={45}
            color={"red"}
            onPress={() => setShowModalTerms(false)}
          />
          <ScrollView
            style={{
              height: "85%",
              width: "95%",
              alignSelf: "center",
              borderRadius: 20,
              backgroundColor: "#ebebeb",
              paddingHorizontal: 22,
            }}
          >
            <View
              style={{
                height: "85%",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: "#ebebeb",
                paddingBottom: 20,
              }}
            >
              <Text
                style={{ fontSize: 20, marginTop: "18%", fontWeight: "bold" }}
              >
                Terms And Contidion
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 14, marginTop: 10 }}
              >{`Welcome to AngkasAtad, the ride-hailing application for your transportation needs. AngkasAtad, operated by DHVSU Capstone researchers (referred to as the “Students”), is pleased to offer you our services under the following terms and conditions. Prior to using the AngkasAtad app, please carefully read and understand these terms and conditions. By using our services, you agree to comply with and be bound by these terms and conditions.
`}</Text>
              <Text style={styles.term}>Registration and User Information</Text>
              <Text
                style={{ textAlign: "center", fontSize: 14, marginTop: 5 }}
              >{`1.1 User Account Information To use AngkasAtad, you must provide accurate and up-to-date information during registration. If we discover that you have provided false information, we reserve the right to terminate your AngkasAtad account. You will be solely liable for any damages incurred as a result of using false information.

        1.2 User Data Privacy We respect your privacy and are committed to protecting your personal information.
        `}</Text>
              <Text style={styles.term}>App Usage and Conduct</Text>
              <Text
                style={{ textAlign: "center", fontSize: 14, marginTop: 5 }}
              >{`2.1 Compliance with Rules and Regulations You agree to abide by all the rules, regulations, and ethics set forth by AngkasAtad. Any violation of these rules may result in the termination of your AngkasAtad account without prior notice.

2.2 Security of Account You are responsible for keeping your account credentials (e.g., ID and password) confidential and not sharing them with others. In the event of loss, theft, or unauthorized use of your account, you accept that the Researcher has taken reasonable security measures. You will be solely responsible for any resulting damages and will not seek compensation.

2.3 Prohibited Activities You are not permitted to share your account with others or resell it. Engaging in activities that infringe on others' privacy, violate the law, or disrupt public order and morality is strictly prohibited. Any such actions may result in the termination of your AngkasAtad account, and you will be solely responsible for any damages without seeking compensation from the Researcher`}</Text>
              <Text style={styles.term}>
                Account Suspension and Cancellation
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 14, marginTop: 5 }}
              >{`3.1 Account Inactivity If you do not access your AngkasAtad account or use any services under your account for one consecutive year, the admin reserves the right to cancel your account.

3.2 Supremacy of Terms Terms of use for any computer program under AngkasAtad service are an integral part of these terms. Any statements that contradict these terms are invalid, and these terms take precedence.`}</Text>
              <Text style={styles.term}>Acceptance of Terms</Text>
              <Text
                style={{ textAlign: "center", fontSize: 14, marginTop: 5 }}
              >{`By using AngkasAtad, you acknowledge and accept all the terms and conditions outlined in this agreement. You agree not to make any claims against the Researchers for any damages incurred or potentially incurred if your account is terminated or suspended, or for any other reasons related to AngkasAtad services.`}</Text>
              <Text style={styles.term}>Amendments</Text>
              <Text
                style={{ textAlign: "center", fontSize: 14, marginTop: 5 }}
              >{`The Researchers reserves the right to amend these terms and conditions for any reason, including compliance with applicable laws, government policies, rules, regulations, or other relevant matters.
`}</Text>
            </View>
          </ScrollView>
        </View>
      )}
      <Image
        source={require("./../../../assets/Icon.png")}
        style={{
          width: 110,
          height: 110,
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.sub}>Snap a photo of your school ID</Text>
      {ImageData !== null ? (
        <Image
          source={{ uri: ImageData }}
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "red",
            borderRadius: 10,
          }}
        />
      ) : (
        <Image
          source={require("./../../../assets/ID.png")}
          style={{
            width: "70%",
            height: 180,
            marginBottom: 20,
          }}
        />
      )}

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate("RegistrationCamera");
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          {ImageData !== null ? "Retake Photo" : "Take Photo"}
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 40, marginBottom: 5 }}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "green" : undefined}
        />
        <View style={{ flexDirection: "row" }}>
          <Text>{`  I agree with the `}</Text>
          <TouchableOpacity
            onPress={() => {
              setShowModalTerms(true);
            }}
          >
            <Text style={{ fontWeight: "bold" }}>terms and conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        disabled={!isChecked}
        style={[styles.Next, { backgroundColor: isChecked ? "gray" : "white" }]}
        onPress={() => {
          if (ImageData === null) {
            Alert.alert("No Image Found", "Please attach your schoolID");
            return;
          }

          setIsLoading(true);
          registerDriver(
            regInfo.emailAdd,
            regInfo.pass,
            regInfo.fullName,
            regInfo.address,
            regInfo.teacherID,
            regInfo.mobileNo,
            regInfo.selectedFaculty,
            regInfo.selectedGender,
            isVerified,
            isAvatarSet,
            completedRide,
            dateCreated,
            ImageData
          );
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: isChecked ? "#fff" : "#121212",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration3;

const styles = StyleSheet.create({
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
  term: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "flex-start",
    marginLeft: 35,
  },
  loginBtn: {
    backgroundColor: "gray",
    width: "40%",
    paddingVertical: 8,
    marginHorizontal: 15,
    marginVertical: 23,
    borderRadius: 20,
  },
  Next: {
    backgroundColor: "gray",
    width: "90%",
    paddingVertical: 8,
    marginHorizontal: 15,
    marginVertical: 23,
    borderRadius: 10,
  },
  inputBox: {
    borderWidth: 1.2,
    width: "50%",
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
