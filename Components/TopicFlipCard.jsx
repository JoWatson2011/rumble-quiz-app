import React from 'react';
import { Pressable, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native'

const handlePlayButtonPressed = () => {
    
}

const RegularContent = ({topic}) => {
  return (
    <View style={regularContentStyles.card}>
      <Text style={regularContentStyles.text}>{topic.name}</Text>
    </View>
  );
};

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ff8c00',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#001a72',
  },
});

const FlippedContent = ({navigation}) => {
  return (
    <View style={flippedContentStyles.card}>
        <Pressable>
      <Text style={flippedContentStyles.text} onPress={() => navigation.navigate("QuizPage", <QuizPage/>)}>Let's Play!</Text>
        </Pressable>
    </View>
  );
};

const flippedContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ff8c00',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#001a72',
  },
});

const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
}) => {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}>
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: 'hidden',
    zIndex: 2,
  },
});

export default function TopicFlipCard({topic}) {
    const navigation = useNavigation()
  const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  return (
    <SafeAreaView style={styles.container} >
        <Pressable onPress={handlePress}>
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={styles.flipCard}
        FlippedContent={<FlippedContent topic={topic} navigation={navigation}/>}
        RegularContent={<RegularContent topic={topic}/>}
        
      />
        </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 165,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    width: 350,
    height: 150,
  },
});