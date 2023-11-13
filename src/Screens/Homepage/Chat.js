import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  ref,
  push,
  off,
  onChildAdded,
  serverTimestamp,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSaveDriverId,
  selectUserProfile,
  setRequestHide,
} from "./../../Redux/navSlice";
import { debounce } from "lodash";
import { db } from "./../../../config";

const Chat = () => {
  const driverReduxData = useSelector(selectUserProfile);
  const savedId = useSelector(selectSaveDriverId);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const pic = driverReduxData.info.profilePic;
  const dispatch = useDispatch();
  console.log(savedId);

  const options = {
    timeZone: "Asia/Manila", // Set the timezone to Philippines (PH)
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Use 24-hour format
  };
  const formatter = new Intl.DateTimeFormat("en-PH", options);

  useEffect(() => {
    const chatRef = ref(db, `POSTED_RIDES/${savedId}/chat`);

    const onMessageAdded = (snapshot) => {
      const message = snapshot.val();
      if (message) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    onChildAdded(chatRef, onMessageAdded);

    return () => off(chatRef, "child_added", onMessageAdded);
  }, [savedId]);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      sender: driverReduxData.id,
      message: inputText,
      picture: pic,
      timestamp: serverTimestamp(),
    };

    push(ref(db, `POSTED_RIDES/${savedId}/chat`), newMessage)
      .then(() => {
        console.log("Message sent successfully");
        setInputText("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  const handlePress = () => {
    dispatch(setRequestHide(true));
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "absolute",
        alignContent: "center",
        justifyContent: "center",
        paddingTop: 140,
        paddingBottom: 150,
      }}
    >
      <Pressable
        style={{
          width: "90%",
          height: 350,
          justifyContent: "flex-start",
          alignSelf: "center",
          borderRadius: 20,
          backgroundColor: "#fff",
          padding: 15,
        }}
      >
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                alignSelf:
                  driverReduxData.id === item.sender
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              {driverReduxData.id !== item.sender && (
                <Image
                  source={{ uri: item.picture }}
                  style={{
                    borderWidth: 1.5,
                    borderColor: "#8660bf",
                    width: 37,
                    height: 37,
                    backgroundColor: "#ebebeb",
                    borderRadius: 50,
                  }}
                />
              )}
              <View
                style={{
                  backgroundColor:
                    driverReduxData.id === item.sender ? "#8660bf" : "#ebebeb",
                  borderRadius: 8,
                  padding: 8,
                  marginHorizontal: 8,
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 8,
                    fontSize: 16,
                    color:
                      driverReduxData.id === item.sender ? "#fff" : "#121212",
                  }}
                >
                  {`${item.message}   `}
                  <Text style={styles.time}>
                    {formatter.format(item.timestamp)}
                  </Text>
                </Text>
              </View>

              {driverReduxData.id === item.sender && (
                <Image
                  source={{ uri: item.picture }}
                  style={{
                    borderWidth: 1.5,
                    borderColor: "#8660bf",
                    width: 37,
                    height: 37,
                    backgroundColor: "#ebebeb",
                    borderRadius: 50,
                  }}
                />
              )}
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  time: {
    fontSize: 12,
    fontWeight: "300",
  },
  messageContainer: {},
  messageText: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    paddingLeft: 8,
  },
  sendButton: {
    backgroundColor: "#25a45c",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Chat;
