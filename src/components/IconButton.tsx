import { Pressable, View } from "react-native";
import IconLocation from "./icons/IconLocation";
import IconPlusOpenMiddle from "./icons/IconPlusOpenMiddle";

export type IconTypes = typeof IconLocation | typeof IconPlusOpenMiddle;

interface IconButtonProp {
  onPress: () => void;
}

const IconButton = ({onPress}: IconButtonProp) => {
    return (
      <Pressable onPress={onPress} >
        <View style={{position: "absolute", top: "100%", left: "100%", transform:[{translateX: -46}, {translateY: -70}]}}>
          /* TO DO: children should be one of my icons */
        </View>
      </Pressable>
    );
}

export default IconButton;