import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  malesHorizontal1,
  malesHorizontal2,
  females1,
  females2,
} from "./../../data/AvatarImageFirebase";
import { useSelector } from "react-redux";
import { firebase } from "./../../../config";
import { selectUserProfile } from "../../Redux/navSlice";
const SetAvatar = () => {
  const [imageURL, setImageURL] = useState(null);
  const [pressed, setPressed] = useState(false);
  const gender = useSelector(selectUserProfile);
  const male = gender.info.gender === "Male";

  const setProfile = async () => {
    const db = firebase.firestore();

    const newItem = {
      profilePic: imageURL,
    };
    const updatedData = {
      isAvatarSet: true,
    };
    const docRef = db.collection("commuters").doc(gender.id);
    docRef
      .update(newItem)
      .then(() => {
        docRef
          .update(updatedData)
          .then(() => {
            console.log("AvatarUpdated");
          })
          .catch((error) => {
            console.error("Error updating Avatar:", error);
          });

        console.log("Avatar URL added");
      })
      .catch((error) => {
        console.error("Error adding Avatar Url", error);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#313133",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "600",
            letterSpacing: 5,
            textAlign: "center",
            color: "#fff",
            marginTop: "10%",
          }}
        >
          Welcome!
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "200",
            textAlign: "center",
            color: "#fff",
            lineHeight: 16,
          }}
        >
          Please Select your avatar first to continue
        </Text>
        <View
          style={{
            width: "96%",
            height: 500,
            backgroundColor: "#ebebeb",
            alignSelf: "center",
            borderRadius: 30,
            paddingVertical: 20,
            marginTop: 20,

            paddingHorizontal: 5,
          }}
        >
          {male && (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  {malesHorizontal1.map((male) => (
                    <Pressable
                      key={male.id}
                      style={{ flex: 1 }}
                      onPress={() => {
                        setImageURL(male.img);
                        setPressed(male.id);
                      }}
                    >
                      <Image
                        source={{ uri: male.img }}
                        style={[
                          styles.image,
                          {
                            borderWidth: pressed === male.id ? 5 : 2,
                            borderColor:
                              pressed === male.id ? "#8660bf" : "#1e1f22",
                          },
                        ]}
                      />
                    </Pressable>
                  ))}
                </View>
                <View>
                  {malesHorizontal2.map((male) => (
                    <Pressable
                      key={male.id}
                      style={{ flex: 1 }}
                      onPress={() => {
                        setPressed(male.id);
                        setImageURL(male.img);
                      }}
                    >
                      <Image
                        source={{ uri: male.img }}
                        style={[
                          styles.image,
                          {
                            borderWidth: pressed === male.id ? 5 : 2,
                            borderColor:
                              pressed === male.id ? "#8660bf" : "#1e1f22",
                          },
                        ]}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          )}

          {!male && (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  {females1.map((female) => (
                    <Pressable
                      key={female.id}
                      style={{ flex: 1 }}
                      onPress={() => {
                        setImageURL(female.img);
                        setPressed(female.id);
                      }}
                    >
                      <Image
                        source={{ uri: female.img }}
                        style={[
                          styles.image,
                          {
                            borderWidth: pressed === female.id ? 5 : 2,
                            borderColor:
                              pressed === female.id ? "#8660bf" : "#1e1f22",
                          },
                        ]}
                      />
                    </Pressable>
                  ))}
                </View>
                <View>
                  {females2.map((female) => (
                    <Pressable
                      key={female.id}
                      style={{ flex: 1 }}
                      onPress={() => {
                        setPressed(female.id);
                        setImageURL(female.img);
                      }}
                    >
                      <Image
                        source={{ uri: female.img }}
                        style={[
                          styles.image,
                          {
                            borderWidth: pressed === female.id ? 5 : 2,
                            borderColor:
                              pressed === female.id ? "#8660bf" : "#1e1f22",
                          },
                        ]}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
        <Text
          style={{
            fontSize: 27,
            fontWeight: "500",
            textAlign: "center",
            color: "#fff",
            marginTop: 15,
          }}
        >
          Choose Your Avatar
        </Text>
        {pressed && (
          <TouchableOpacity
            onPress={setProfile}
            style={{
              alignSelf: "center",
              backgroundColor: "#8660bf",
              borderRadius: 10,
              width: "50%",
              paddingVertical: 8,
              marginTop: 12,
            }}
          >
            <Text style={{ fontSize: 22, textAlign: "center", color: "#fff" }}>
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SetAvatar;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 200,
    marginHorizontal: 10,
    paddingVertical: 30,
  },
});
