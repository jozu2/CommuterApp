import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

const ShowProfileDriver = ({ data }) => {
  console.log(data);
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {data ? (
        <>
          <Text
            style={{
              fontSize: 34,
              color: "#fff",
              marginBottom: 20,

              fontWeight: "bold",
              marginTop: 100,
              alignSelf: "center",
            }}
          >
            Driver Profile
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              width: 340,
              justifyContent: "center",
              borderLeftWidth: 4,
              borderBottomWidth: 2,
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Image
              source={{ uri: data.driverPic }}
              style={{
                width: 130,
                height: 130,
                borderRadius: 130,
                borderWidth: 4,
                borderColor: "gray",
                marginTop: 40,
              }}
            />
            <View
              style={{
                paddingBottom: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "500",
                  alignSelf: "center",
                }}
              >
                {data.driverName}
              </Text>
              <Text
                style={{
                  lineHeight: 14,
                  fontSize: 14,
                  fontWeight: "400",
                  alignSelf: "center",
                }}
              >
                {`${data.faculty} Faculty Member`}
              </Text>

              <View
                style={{
                  top: -2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="location" size={20} color="green" />

                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                    alignSelf: "center",
                  }}
                >
                  {data.address}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#ebebeb",
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 50,
                  position: "absolute",
                  bottom: -30,
                  borderBottomColor: "gray",
                  borderWidth: 2,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    paddingHorizontal: 34,
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "400",
                          color: "black",
                        }}
                      >
                        {`${data.stars} ⭐`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#4f4f4f",
                        }}
                      >
                        Stars
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "400",
                          color: "black",
                        }}
                      >
                        {data.completedRide}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#4f4f4f",
                        }}
                      >
                        Total Rides
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "400",
                          color: "black",
                        }}
                      >
                        {data.dateCreated}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#4f4f4f",
                        }}
                      >
                        Date Created
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View>
          <Text style={{ fontSize: 25, color: "#fff", marginTop: 200 }}>
            No Driver Data Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default ShowProfileDriver;

const styles = StyleSheet.create({});
