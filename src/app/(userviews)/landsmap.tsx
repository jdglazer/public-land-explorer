import { Camera, LogManager, OfflineManager, Map, MapRef, PressEvent, PressEventWithFeatures} from "@maplibre/maplibre-react-native";
import React, { useRef } from "react";
import { NativeSyntheticEvent } from "react-native";

const LandsMap = () => {
  const mapRef = useRef<MapRef | null>(null);

  const handleMapPress = async (e: NativeSyntheticEvent<PressEvent>
      | NativeSyntheticEvent<PressEventWithFeatures>) => {
    const [xPix, yPix] = e.nativeEvent.point;
    const features = await (mapRef.current?.queryRenderedFeatures([xPix, yPix]));
    console.log("Features at pressed point:", features);
  };

  LogManager.setLogLevel('verbose');
  LogManager.onLog((event) => {
    console.log(`[MapLibre Native Log] ${event.level}: ${event.message}`);
    return true; // Return true to override default logging if needed
  });

  const setAmbientCacheSize = async () => {
      await OfflineManager.setMaximumAmbientCacheSize(0);
  }

  setAmbientCacheSize();
  
  return (
    <Map ref={mapRef}
         mapStyle="http://192.168.1.58/styles/basemap/style.json"
         onPress={handleMapPress}>
      <Camera initialViewState={{zoom: 2,  center: [-110.75, 44.5]}}></Camera>
    </Map>
  );
};

export default LandsMap;