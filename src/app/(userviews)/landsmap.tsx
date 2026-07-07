import { Map } from "@maplibre/maplibre-react-native";
import React from "react";

const LandsMap = () => {
  return (
    <Map mapStyle="http://192.168.1.58:8080/styles/basemap/style.json" />
  );
};

export default LandsMap;
