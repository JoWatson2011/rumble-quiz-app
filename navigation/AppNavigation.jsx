import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import QuizContainer from "../Components/QuizContainer";
import NotificationsList from "../Components/NotificationsList";
import Friends from "../Components/Friends";
import { useNavigation } from "@react-navigation/native";
import LeaderBoard from "../Components/LeaderBoardPage";
import MyAccount from "../Components/MyAccount";
import { withTheme } from "react-native-paper";

function AppNavigation({ theme, isLoading, setIsLoading, avatars }) {
  const navigation = useNavigation();
  const { colors } = theme;
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Play":
        icon = "extension-puzzle";
        break;
      case "MyAccount":
        icon = "person";
        break;
      case "Leaderboard":
        icon = "trophy";
        break;
      case "Friends":
        icon = "people-sharp";
        break;
      case "Notifications":
        icon = "notifications-sharp";
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? "black" : colors.primaryContainer}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    button: {
      flex: 1,
      justifyContent: "center",
    },
    bottomBar: {},
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      bottom: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: colors.surface,
    },
    tabbarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    img: {
      width: 30,
      height: 30,
    },
    screen1: {
      flex: 1,
      backgroundColor: "#BFEFFF",
    },
    screen2: {
      flex: 1,
      backgroundColor: "#FFEBCD",
    },
  });
  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor={colors.primary}
      initialRouteName="Play"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Play")}
          >
            <Ionicons
              name={"extension-puzzle"}
              color={colors.primaryContainer}
              size={25}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="Leaderboard"
        position="LEFT"
        component={() => (
          <LeaderBoard isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen
        name="MyAccount"
        position="LEFT"
        component={() => <MyAccount avatars={avatars} />}
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen
        name="Play"
        position="CIRCLE"
        component={() => <QuizContainer />}
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen
        name="Friends"
        component={() => <Friends />}
        position="RIGHT"
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen
        name="Notifications"
        component={() => <NotificationsList />}
        position="RIGHT"
        options={{ headerShown: false }}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

export default withTheme(AppNavigation);
