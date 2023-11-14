import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { setRegistrationInfo } from "../../../Redux/navSlice";
const Registration1 = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [next, setNext] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [showErrorPass, setShowErrorPass] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const validateEmail = (email) => {
    if (email.endsWith("@dhvsu.edu.ph")) {
      setErrorEmail(false);
      return true;
    } else {
      Alert.alert("Invalid Email", "Must be @dhvsu.edu.ph ");

      setErrorEmail(true);
      return false;
    }
  };

  useEffect(() => {
    if (fullName !== "") {
      if (fullName.length < 6) {
        setErrorName(true);
      } else {
        setErrorName(false);
      }
    } else {
      setErrorName(false);
    }
    if (confirmPass !== "") {
      if (pass !== confirmPass) {
        setShowErrorPass(true);
      } else {
        setShowErrorPass(false);
      }
    } else {
      setShowErrorPass(false);
    }

    if (mobile.length !== 0) {
      if (mobile.length > 4) {
        if (mobile.length !== 11) {
          setErrorMobile(true);
        } else {
          setErrorMobile(false);
        }
      }
    } else {
      setErrorMobile(false);
    }
  }, [pass, confirmPass, mobile, email, fullName]);
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
      <Text style={styles.sub}>Enter your details to register</Text>

      <TextInput
        style={[
          styles.inputBox,
          { borderColor: errorName ? "red" : "#121212" },
        ]}
        placeholder="Full Name"
        defaultValue={fullName}
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(fname) => setFullName(fname)}
      />
      {errorName && <Text style={styles.txtError}>*Name too short</Text>}

      <TextInput
        style={[
          styles.inputBox,
          { borderColor: errorEmail ? "red" : "#121212" },
        ]}
        placeholder="Dhvsu Email Address"
        defaultValue={email}
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(email) => setEmail(email)}
      />
      {errorEmail && (
        <Text style={styles.txtError}>* Invalid Email Address</Text>
      )}
      <TextInput
        style={[
          styles.inputBox,
          { borderColor: errorMobile ? "red" : "#121212" },
        ]}
        placeholder="Mobile Number (0918 *** ****)"
        defaultValue={mobile}
        onChangeText={(mobile) => setMobile(mobile)}
        keyboardType="number-pad"
      />
      {errorMobile && (
        <Text style={styles.txtError}>* Invalid Mobile Number</Text>
      )}
      <View
        style={[
          styles.inputBox,
          { borderColor: showErrorPass ? "red" : "#121212" },
        ]}
      >
        <TextInput
          placeholder="Password"
          defaultValue={pass}
          autoCorrect={false}
          textContentType="password"
          keyboardType="default"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={!passwordVisible}
          onChangeText={(pass) => setPass(pass)}
        />
        <Entypo
          name={passwordVisible ? "eye" : "eye-with-line"}
          color="gray"
          size={23}
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        />
      </View>
      {showErrorPass && (
        <Text style={styles.txtError}>* Password Doesn't Match</Text>
      )}
      <TextInput
        style={[
          styles.inputBox,
          { borderColor: showErrorPass ? "red" : "#121212" },
        ]}
        placeholder="Confirm Password"
        defaultValue={confirmPass}
        autoCorrect={false}
        textContentType="password"
        keyboardType="default"
        secureTextEntry={!passwordVisible}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
      />

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (fullName.length < 6) {
            return;
          }

          if (email.length !== 0) {
            if (!validateEmail(email)) {
              return;
            }
          }

          if (mobile.length !== 11) {
            return;
          }
          if (pass === "") {
            return;
          } else {
            if (pass.length < 5) {
              Alert.alert("Error", "Password too short");
              return;
            }
          }
          if (showErrorPass) {
            return;
          }
          if (confirmPass.length !== pass.length) {
            return;
          }

          dispatch(
            setRegistrationInfo({
              fullName: fullName,
              emailAdd: email,
              mobileNo: mobile,
              pass: pass,
            })
          );
          navigation.navigate("Registration2");
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration1;

const styles = StyleSheet.create({
  eyeIcon: {
    position: "absolute",
    right: 15,
    bottom: "25%",
  },
  txtError: {
    color: "red",
    marginTop: -10,
    alignSelf: "flex-start",
    marginLeft: 20,
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
