import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "@/constants/styles/ColorThemes";
import IconPlusOpenMiddle from "./IconPlusOpenMiddle";

interface MapCenterPointProps {
    children?: ReactNode;
    iconSize?: number;
};

const MapCenterPoint = ({children, iconSize = 40}: MapCenterPointProps) => {

  return (
      <>
        <View style={[styles.centerIconContainer, 
            {transform: [{translateX: -iconSize/2}, {translateY:-iconSize/2}]}]
        }>
          <IconPlusOpenMiddle iconSize={iconSize} strokeWidth={2} color={COLORS.text}/>
        </View>
        <View style={styles.topFullWidthContainer}>
          {children}
        </View>
      </>
  );
}

export default MapCenterPoint;

const styles = StyleSheet.create({
  centerIconContainer: {
    padding: 0,
    position: "absolute",
    top:"50%", left:"50%",
    justifyContent: "center",
    alignContent: "center"
  },
  topFullWidthContainer: {
    padding: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: COLORS.primary,
    top:"0%",
    left:"0%",
    justifyContent: "center",
    alignContent: "center"
  }
});
