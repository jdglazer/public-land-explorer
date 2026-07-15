import { useUserContext } from "@/hooks/useUserContext";
import { 
  Camera,
  LogManager, 
  OfflineManager,
  Map,
  MapRef,
  PressEvent, 
  PressEventWithFeatures,
  TransformRequestManager,
  LocationManager,
  UserLocation
}
from "@maplibre/maplibre-react-native";
import React, { useEffect, useRef } from "react";
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

  const {getIdToken} = useUserContext();

  // We can't get here until we've passed authchecked which means we'll have at least tried to get a token

  const setBearerToken = async () => {
    let idToken = await getIdToken();

    if (idToken) {
      TransformRequestManager.addHeader({
        id: 'auth',
        name: "Authorization",
        value: "Bearer " + idToken
      });
    }
  };

  const setupLocationManagement = async () => {
    let locPermissions = await LocationManager.requestPermissions();
    console.log("Location permissions: ", locPermissions);
    let position = await LocationManager.getCurrentPosition();
    console.log("Position: ", position);
  }

  useEffect(() => {
    setupLocationManagement();
    setBearerToken();
  }, [])

  return (
    <Map ref={mapRef}
         mapStyle="http://192.168.1.58/styles/basemap/style.json"
         onPress={handleMapPress}>
      <Camera initialViewState={{zoom: 2,  center: [-110.75, 44.5]}} trackUserLocation="default"></Camera>
      <UserLocation/>
    </Map>
  );
};

export default LandsMap;