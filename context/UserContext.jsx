import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { patchUserByUsername, postUserLogin } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userLogged");
        if (userData) {
          setUserLogged(userData);
        }
      } catch (error) {
        console.error("Error setting user in context:", err);
      }
    };

    loadUser();
  }, []);

  const login = async (userData, navigation) => {
    try {
      const res = await postUserLogin(userData);
      if (res.status === 200) {
        await AsyncStorage.setItem("token", JSON.stringify(res.data));
        await AsyncStorage.setItem("userLogged", userData.username);
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        setUserLogged(userData.username);
        navigation.navigate("AppNavigation");
      } else {
        alert("Login failed", "Please check your credentials and try again.");
      }
    } catch (error) {
      alert("Login failed", "An error occurred. Please try again later.");
    }
  };

  const editUser = async (patchBody) => {
    await patchUserByUsername(userLogged, patchBody)
      .then(({ modifiedUser }) => {
        setUserLogged(modifiedUser.username);
      })
      .catch((err) => {
        console.log("Error in patching user:", err);
      });
  };

  const logout = async (navigation) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(false));
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("userLogged", "");
      navigation.navigate("LogIn");
      setUserLogged(null);
    } catch (err) {
      console.error("Failed to log out user:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{ userLogged, setUserLogged, login, logout, editUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
