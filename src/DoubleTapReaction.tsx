import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

type AnimationType = "fade" | "fly";

interface DoubleTapReactionProps {
  children: React.ReactNode;
  emojiComponent: React.ReactNode;
  type?: AnimationType;                  // animation type: fade or fly
  animationDuration?: number;            // ms
  scaleToValue?: number;                 // final scale
  friction?: number;                     // spring friction
  flyDistance?: number;                  // px to fly up
  onDoubleTap?: () => void;              // optional callback
  emojiContainerStyle?: ViewStyle;       // optional custom style for emoji container
}

export default function DoubleTapReaction({
  children,
  emojiComponent,
  type = "fade",
  animationDuration = 700,
  scaleToValue = 1.5,
  friction = 4,
  flyDistance = 100,
  onDoubleTap,
  emojiContainerStyle,
}: DoubleTapReactionProps) {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      triggerAnimation();
      onDoubleTap?.(); // call parent callback if exists
    } else {
      setLastTap(now);
    }
  };

  const triggerAnimation = () => {
    // reset values
    scale.setValue(0);
    opacity.setValue(1);
    translateY.setValue(0);

    const animations: Animated.CompositeAnimation[] = [
      Animated.spring(scale, {
        toValue: scaleToValue,
        friction,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ];

    if (type === "fly") {
      animations.push(
        Animated.timing(translateY, {
          toValue: -flyDistance,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container}>
        {children}

        <Animated.View
          style={[
            styles.emojiContainer,
            emojiContainerStyle,
            {
              opacity,
              transform: [
                { scale },
                ...(type === "fly" ? [{ translateY }] : []),
              ],
            },
          ]}
        >
          {emojiComponent}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex:1
  },
  emojiContainer: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
});
