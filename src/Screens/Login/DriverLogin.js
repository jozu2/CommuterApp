import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import { firebase } from "./../../../config";
import Entypo from "react-native-vector-icons/Entypo";

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setUserProfile } from "../../Redux/navSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
const DriverLogin = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const validateEmail = (email) => {
    if (email.endsWith("@gmail.com")) {
      setInvalid(false);
      return true;
    } else {
      Alert.alert("Invalid Email", "Must be @dhvsu.edu.ph ");
      setInvalid(true);
      return false;
    }
  };

  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid(false);
      }, 4000);
    }
  }, [invalid]);
  const loginDriver = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const userDocs = await firebase
          .firestore()
          .collection("commuters")
          .doc(user.uid)
          .get();
        if (userDocs.exists) {
          const userData = userDocs.data();
          await AsyncStorage.setItem(
            "userInfo",
            JSON.stringify({ info: userData, id: user.uid })
          );

          dispatch(setUserProfile({ info: userData, id: user.uid }));
        } else {
          setIsloading(false);
          alert("Please log in your Driver Account");
        }
      } else {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://v5angkas.firebaseapp.com",
        });
        setIsloading(false);
        alert("Please verify your email before proceeding.");
        await firebase.auth().signOut();
      }
    } catch (error) {
      setIsloading(false);
      console.error("Login error:", error);
      alert("Invalid Email/Password");
      setInvalid(true);
    }
  };

  const handleResetPassword = async () => {
    setIsloading(true);

    try {
      if (!email) {
        setIsloading(false);
        return;
      }
      if (!validateEmail(email)) {
        setIsloading(false);
        return;
      }
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert(
        "Password Reset Email Sent",
        "Check your email to reset your password."
      );
      setIsloading(false);
    } catch (error) {
      setIsloading(false);

      console.error("Password Reset Failed", error);
      Alert.alert("Password Reset Failed", error.message);
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
      <Image
        source={require("./../../assets/Icon.png")}
        style={{
          width: 120,
          height: 120,
          marginBottom: 30,
        }}
      />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.sub}>
        Enter your username and password to login to your driver account
      </Text>

      <TextInput
        style={[styles.inputBox, { borderColor: invalid ? "red" : "#121212" }]}
        placeholder="Dhvsu Email"
        defaultValue={email}
        autoCorrect={false}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <View
        style={[styles.inputBox, { borderColor: invalid ? "red" : "#121212" }]}
      >
        <TextInput
          placeholder="Password"
          defaultValue={password}
          onChangeText={(pass) => setPassword(pass)}
          keyboardType="default"
          autoCorrect={false}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <Entypo
          name={passwordVisible ? "eye" : "eye-with-line"}
          color="gray"
          size={23}
          onPress={() => {
            setPasswordVisible(!passwordVisible);
          }}
          style={styles.eyeIcon}
        />
      </View>
      <TouchableOpacity
        onPress={handleResetPassword}
        style={{ alignSelf: "flex-end", marginRight: 20, marginTop: -10 }}
      >
        <Text>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (password == "") {
            alert("No Password input");
            return;
          }
          if (email == "") {
            alert("No email input");
            return;
          }
          if (email.length < 12) {
            alert("Incomplete Email");
            return;
          }
          if (!validateEmail(email)) {
            return;
          }
          setIsloading(true);
          loginDriver(email, password);
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", paddingTop: 70 }}>
        <Text style={{ fontWeight: "400" }}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Registration1");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{` Register`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverLogin;

const styles = StyleSheet.create({
  eyeIcon: {
    position: "absolute",
    right: 15,
    bottom: "25%",
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
    marginVertical: 14,
  },
  title: {
    fontSize: 28,
    marginVertical: 17,

    fontWeight: "bold",
  },
  sub: {
    paddingHorizontal: 40,
    textAlign: "center",
    marginVertical: 17,
  },
});
