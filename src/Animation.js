import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { withBouncing } from "./withBouncing";
import { BlurView } from "expo-blur";

const widthAndHeight = Dimensions.get("screen");
const width = widthAndHeight.width;
const height = widthAndHeight.height;

const VELOCITY = 1;

export default function Animation() {
  const isLoaded = useRef(false);
  const animatedImageCircles = [
    {
      circle: 100,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      image: require("../assets/profile.jpg"),
    },
    {
      circle: 150,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      image: require("../assets/4twiggers.png"),
    },
    {
      circle: 90,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      image: require("../assets/profile2.jpg"),
    },
    {
      circle: 120,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      image: require("../assets/profile3.jpg"),
    },
    {
      circle: 130,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      image: require("../assets/profile4.jpg"),
    },
  ];
  const animatedBlurBubbles = [
    {
      circle: 100,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      color: "#cffc03",
    },
    {
      circle: 180,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      color: "#fc0384",
    },
    {
      circle: 90,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      color: "#8803fc",
    },
    {
      circle: 120,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      color: "#fc8003",
    },
    {
      circle: 140,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      color: "#0703fc",
    },
    {
      circle: 130,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      color: "#fcb103",
    },
    {
      circle: 150,
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),
      color: "#03ebfc",
    },
  ];
  const animateProfilesOrBubbles = animatedBlurBubbles;

  useEffect(() => {
    if (!isLoaded.current) {
      animateProfilesOrBubbles.map((item) => {
        console.log("item", item);
        return (
          (item.translateY.value = withBouncing(
            VELOCITY,
            0,
            height - item.circle
          )),
          (item.translateX.value = withBouncing(
            VELOCITY,
            0,
            width - item.circle
          ))
        );
      });
      isLoaded.current = true;
    }
  });

  const style = (translateX, translateY) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

  return (
    <View style={styles.container}>
      {animateProfilesOrBubbles.map((item, index) => (
        <Animated.View
          key={item.circle.toString()}
          style={[
            style(item.translateX, item.translateY),
            { position: "absolute", zIndex: index },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.touchable,
              { width: item.circle, height: item.circle },
              item.color && { backgroundColor: item.color },
            ]}
          >
            {!item.color && (
              <Image
                style={[
                  styles.touchable,
                  { width: item.circle, height: item.circle },
                ]}
                source={item.image}
              />
            )}
          </TouchableOpacity>
        </Animated.View>
      ))}
      {animateProfilesOrBubbles[0].color && (
        <BlurView
          intensity={100}
          style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
        ></BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: widthAndHeight.height,
    width,
    backgroundColor: "#506CEE",
  },
  nonBlurredContent: {
    zIndex: 100,
  },
  touchable: {
    borderRadius: 200,
    borderRadius: 900,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    zIndex: 1,
    elevation: 3,
  },
});
