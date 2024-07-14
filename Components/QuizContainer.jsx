import {
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useState, useContext } from "react";
import Topics from "./Topics";
import { withTheme } from "react-native-paper";
import { useColorScheme } from "react-native";
import { UserContext } from "../context/UserContext";

function QuizContainer({ theme }) {
  const { colors } = theme;
  const colorScheme = useColorScheme();
  const [currentScheme, setCurrentScheme] = useState(colorScheme);
  const { userLogged } = useContext(UserContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surfaceVariant,
    },
    h2: {
      textAlign: "center",
      fontSize: 30,
      marginVertical: 20,
      color: colors.secondary,
    },
  });

  if (currentScheme === "light") {
    return (
      <ImageBackground
        source={require("../assets/jigsaw_puzzle_frame_6_a_white.jpg")}
        style={styles.container}
      >
        <View>
          <Topics />
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <View style={styles.container}>
        <Topics userLogged={userLogged} setUserLogged={setUserLogged} />
      </View>
    );
  }
}

export default withTheme(QuizContainer);
