import React from "react";
import { ColorValue } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

interface IconLocationProps {
  iconSize?: number;
  strokeWidth?: number;
  midDot?: boolean;
  color: ColorValue | undefined;
}

const IconLocation = React.memo(({iconSize = 48, strokeWidth = 4, midDot = true, color}: IconLocationProps) => {

    if(iconSize < 12) {
        iconSize = 12;
    } else if ((iconSize % 6) !== 0){
        iconSize = Math.round(iconSize/6)*6;
    }

    return (
      <Svg width={iconSize} 
        height={iconSize}
        strokeLinecap="round"
        stroke={color}
        strokeWidth={strokeWidth}
        viewBox={"0 0 " + iconSize + " " + iconSize}>
        <Circle cx={iconSize/2} cy={iconSize/2} r={iconSize/3} fillOpacity={0}/>
        <Line x1={0} y1={iconSize/2} x2={iconSize/6} y2={iconSize/2}/>
        <Line x1={5*iconSize/6} y1={iconSize/2} x2={iconSize} y2={iconSize/2}/>
        <Line x1={iconSize/2} y1={0} x2={iconSize/2} y2={iconSize/6}/>
        <Line x1={iconSize/2} y1={5*iconSize/6} x2={iconSize/2} y2={iconSize}/>
        {midDot && <Circle cx={iconSize/2} cy={iconSize/2} r={iconSize/12} fillOpacity={1}/>}
      </Svg>
    );
});

export default IconLocation;