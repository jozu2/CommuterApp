import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          backgroundColor: "#ebebeb",
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
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
