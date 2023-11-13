import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Registration4 = () => {
  const navigation = useNavigation();
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
      <Text style={styles.sub}>Upload your Profile picture</Text>
      <Image
        source={require("./../../../assets/user.png")}
        style={{
          width: 180,
          padding: 20,
          borderWidth: 4,
          height: 180,
          marginBottom: 10,
          borderRadius: 1000,
        }}
      />

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          Upload
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.Next}
          onPress={() => {
            navigation.navigate("ThankYou");
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
            Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Next}
          onPress={() => {
            navigation.navigate("ThankYou");
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration4;

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: "gray",
    width: "40%",
    paddingVertical: 8,
    marginHorizontal: 15,
    marginTop: 17,
    marginBottom: 37,
    borderRadius: 20,
  },
  Next: {
    backgroundColor: "gray",
    width: "45%",
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
