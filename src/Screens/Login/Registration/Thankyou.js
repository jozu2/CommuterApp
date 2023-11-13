import { Image, StyleSheet, Text, View, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setRegistrationInfo, setSavedImage } from "../../../Redux/navSlice";

const Thankyou = () => {
  const [countdown, setCountdown] = useState(25);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DriverLogin");

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      dispatch(setRegistrationInfo(null));
      dispatch(setSavedImage(null));
      if (countdown === 0) {
        navigation.navigate("DriverLogin");
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(redirectTimer);
    };
  }, [countdown, navigation]);
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
      <Text style={styles.title}>Thank You for Registering!</Text>
      <Text
        style={{ textAlign: "center", marginTop: 5, paddingHorizontal: 20 }}
      >
        We appreciate your interest in joining the community. Your account is
        currently under review, and we're working diligently to verify your
        information. Please allow up to a couple of hours for this process to be
        completed.
      </Text>
      <Text style={{ textAlign: "center", marginTop: 15 }}>
        Once your account is fully verified, you
      </Text>
      <Text style={{ textAlign: "center", paddingHorizontal: 20 }}>
        will have full access to all the features our app has to offer. We thank
        you for your patience during this verification process and look forward
        to having you as a trusted member of the Angkas Atad - Ride Along Driver
        community.
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 70 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "300" }}>
          You will be redirected to login page in
        </Text>
        <Text
          style={{ fontSize: 20, fontWeight: "500" }}
        >{` ${countdown}s`}</Text>
      </View>
    </View>
  );
};

export default Thankyou;

const styles = StyleSheet.create({
  txtError: {
    color: "red",
    marginTop: -10,
    alignSelf: "flex-start",
    marginLeft: 20,
  },

  title: {
    fontSize: 23,
    marginVertical: 12,
    marginBottom: 0,

    fontWeight: "bold",
  },
  sub: {
    paddingHorizontal: 40,
    textAlign: "center",
    marginVertical: 17,
  },
});
