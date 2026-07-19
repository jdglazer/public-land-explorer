import React from "react";
import { ColorValue } from "react-native";
import Svg, { Line } from "react-native-svg";

interface IconPlusOpenMiddleProps {
    iconSize?: number;
    strokeWidth?: number;
    color?: ColorValue | undefined;
}

const IconPlusOpenMiddle = React.memo(({iconSize = 50, strokeWidth = 3, color}: IconPlusOpenMiddleProps) => {
    console.log("Icon rerendered");
    if (iconSize <= 9) {
      iconSize = 10;
    } else if ((iconSize % 2) !== 0) {
      iconSize = Math.round(iconSize/2) * 2;
    }

    return (
      <Svg width={iconSize} height={iconSize} strokeLinecap="round" strokeWidth={strokeWidth} stroke={color} viewBox={"0 0 " + iconSize + " " + iconSize}>
        <Line x1={0} y1={iconSize/2} x2={iconSize/2 - 4} y2={iconSize/2} />
        <Line x1={iconSize/2 + 4} y1={iconSize/2} x2={iconSize} y2={iconSize/2} />
        <Line x1={iconSize/2} y1={iconSize} x2={iconSize/2} y2={iconSize/2 + 4} />
        <Line x1={iconSize/2} y1={0} x2={iconSize/2} y2={iconSize/2 - 4} />
      </Svg>
    );
});

export default IconPlusOpenMiddle;