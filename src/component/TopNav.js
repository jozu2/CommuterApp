import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
const TopNav = (showBurger) => {
  const navigation = useNavigation();
  return (
    <View style={[tw`shadow-lg`, styles.topBar]}>
      {showBurger.showBurger === true && (
        <EvilIcons
          style={{ position: "absolute", bottom: 30, left: 15 }}
          name={"navicon"}
          size={50}
          color={"#ebebeb"}
          onPress={() => navigation.openDrawer()}
        />
      )}

      {showBurger.backBtn === true && (
        <Feather
          style={{ position: "absolute", bottom: 27, left: 15 }}
          name={"arrow-left"}
          size={40}
          color={"#ebebeb"}
          onPress={() => navigation.goBack()}
        />
      )}
      <Image
        source={require("./../assets/Icon.png")}
        style={{ width: 60, height: 60, alignSelf: "center" }}
      />
    </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#1e1f22",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: "#b5b5b5",
  },
});
