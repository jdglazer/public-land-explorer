import { Map } from "@maplibre/maplibre-react-native";
import React from "react";

const LandsMap = () => {
  return (
    <Map mapStyle="https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json" />
  );
};

export default LandsMap;
