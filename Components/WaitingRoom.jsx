import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import Logo from "../assets/Designer.jpeg";

const ANGLE = 10;
const TIME = 100;
const PAUSE_DURATION = 1000;
const WOBBLE_COUNT = 8;
const EASING = Easing.linear;

export default function WaitingRoom() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    const startAnimation = () => {
      rotation.value = withRepeat(
        withSequence(
          withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
          withRepeat(
            withSequence(
              withTiming(ANGLE, { duration: TIME, easing: EASING }),
              withTiming(-ANGLE, { duration: TIME, easing: EASING })
            ),
            WOBBLE_COUNT,
            false
          ),
          withTiming(0, { duration: TIME / 2, easing: EASING }),
          withDelay(PAUSE_DURATION, withTiming(0, { duration: 0 }))
        ),
        -1, 
        false 
      );
    };

    startAnimation();
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Image source={Logo} style={styles.image} />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text>Waiting for more players...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", 
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginTop: 300,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
