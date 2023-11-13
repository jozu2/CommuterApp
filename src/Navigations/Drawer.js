import { StyleSheet, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../component/CustomDrawer";
import Feather from "react-native-vector-icons/Feather";
import UserDashboard from "../Screens/Homepage/UserDashboard";
import Settings from "../Screens/Settings/index";
import DriverProfile from "../Screens/DriverProfile/DriverProfile";

const Drawer = () => {
  const DrawerNavigator = createDrawerNavigator();

  return (
    <View style={styles.container}>
      <DrawerNavigator.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "rgba(0, 0, 0, 0.4)",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "black",
          drawerLabelStyle: { marginLeft: -18 },
        }}
      >
        <DrawerNavigator.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="home" size={22} color={color} />
            ),
            drawerLabel: "Home",
          }}
        />
        <DrawerNavigator.Screen
          name="DriverProfile"
          component={DriverProfile}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="user" size={22} color={color} />
            ),
            drawerLabel: "Profile",
          }}
        />
        <DrawerNavigator.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="settings" size={22} color={color} />
            ),
            drawerLabel: "Settings",
          }}
        />
      </DrawerNavigator.Navigator>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
