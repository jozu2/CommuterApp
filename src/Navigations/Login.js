import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverLogin from "../Screens/Login/DriverLogin";
import Registration1 from "../Screens/Login/Registration/Registration1";
import Registration2 from "../Screens/Login/Registration/Registration2";
import Registration3 from "../Screens/Login/Registration/Registration3";
import Registration4 from "../Screens/Login/Registration/Registration4";
import Thankyou from "../Screens/Login/Registration/Thankyou";
import RegistrationCamera from "../Screens/Login/Registration/RegistrationCamera";

const Login = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="HomeLogin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
      <Stack.Screen name="Registration1" component={Registration1} />
      <Stack.Screen name="Registration2" component={Registration2} />
      <Stack.Screen name="Registration3" component={Registration3} />
      <Stack.Screen name="Registration4" component={Registration4} />
      <Stack.Screen name="ThankYou" component={Thankyou} />
      <Stack.Screen name="RegistrationCamera" component={RegistrationCamera} />
    </Stack.Navigator>
  );
};

export default Login;
