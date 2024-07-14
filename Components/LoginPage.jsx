import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import CustomInput from "./CustomInput";
import Logo from "../assets/Designer.jpeg";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onLogInButtonPressed = async () => {
    const userData = {
      username: usernameInput,
      password: passwordInput,
    };

    login(userData, navigation);
  };

  const onGuestLoginPressed = async () => {
    const userData = {
      username: "DragonRider",
      password: "password123",
    };

    login(userData, navigation);
  };

  const onForgotPasswordPressed = () => {};

  const onSignUpPressed = () => {};

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login</Text>
        <CustomInput
          placeholder="Username"
          value={usernameInput}
          setValue={setUsernameInput}
        />
        <CustomInput
          placeholder="Password"
          value={passwordInput}
          setValue={setPasswordInput}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          type="Password"
        />
        <CustomButton text="Log In" onPress={onLogInButtonPressed} />
        <CustomButton
          text="Forgot Password"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
        <CustomButton
          text="Continue as Guest"
          onPress={onGuestLoginPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
  },
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",

    margin: 10,
  },
});
