import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Pressable } from "react-native";

const Settings = () => {
  const openAppSettings = async () => {
    await Linking.openSettings();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={openAppSettings}>
        <Text>Location settings</Text>
      </Pressable>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
