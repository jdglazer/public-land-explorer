import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

interface FadeOutViewProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    initialVisibility?: boolean;
    delay: number;
    fadeTime: number;
    props?: {[key: string]: any}
};

export interface FadeOutViewRef {
  setVisible: () => void;
}

const FadeOutView = forwardRef<FadeOutViewRef, FadeOutViewProps>(({children, style, initialVisibility, delay, fadeTime, ...props}: FadeOutViewProps, ref) => {
  const pointerEvents = useSharedValue<"box-none"|"none"|"auto"|"box-only"|undefined>("box-none");
  const opacity = useSharedValue(initialVisibility ? 1 : 0);

  useImperativeHandle(ref, () => ({
    setVisible: () => {
      resetFade();
    }
  }));

  const resetFade = () => {
    opacity.value = 1;
    pointerEvents.value = "box-none";

    opacity.value = withDelay(delay*1000, 
      withTiming(
        0.0,
        {
          duration: fadeTime * 1000,
          easing: Easing.linear
        },
        (finished) => {
          if (finished) pointerEvents.value = "none";
        }
      )
    );
  };

  const animatedOpacity = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      pointerEvents: pointerEvents.value
    })
  );

  return (
      <Animated.View style={[
        animatedOpacity,
        style
      ]} {...props}>
        {children}
      </Animated.View>
  );
});

export default FadeOutView;
