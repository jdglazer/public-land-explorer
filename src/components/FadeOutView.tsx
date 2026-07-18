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
  const [visible, setVisible] = useState(initialVisibility);
  const opacity = useSharedValue(1);

  useImperativeHandle(ref, () => ({
    setVisible: () => {
      setVisible(true);
      resetFade();
    }
  }));

  const resetFade = () => {
    opacity.value = 1;
    opacity.value = withDelay(delay*1000, 
      withTiming(
        0.0,
        {
          duration: fadeTime * 1000,
          easing: Easing.linear
        },
        (finished) => {if (finished) runOnJS(setVisible)(false);}
      )
    );
  };

  const animatedStyle = useAnimatedStyle(
    () => ({
        opacity: opacity.value
    })
  );

  return (
      visible &&
      <Animated.View style={[
        animatedStyle,
        style
      ]} {...props}>
        {children}
      </Animated.View>
  );
});

export default FadeOutView;
