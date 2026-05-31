import { Link } from "expo-router";
import React, { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

/* À faire: ajouter un elément pour le style */
interface ThemedLinkProps {
  children: ReactNode;
  href: any;
  style?: StyleProp<TextStyle>;
  [key: string]: any;
}

const ThemedLink = ({ children, href, style, ...props }: ThemedLinkProps) => {
  return (
    <Link href={href} style={[style]} {...props}>
      {children}
    </Link>
  );
};

export default ThemedLink;
