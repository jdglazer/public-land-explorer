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
  ViewStateChangeEvent,
  CameraRef
}
from "@maplibre/maplibre-react-native";
import React, {useEffect, useRef } from "react";
import { StyleSheet, NativeSyntheticEvent, View} from "react-native";
import MapCenterPoint from "@/components/MapCenterPoint";
import PublicLandCard, { PublicLandCardRef } from "@/components/PublicLandCard";
import FadeOutView, { FadeOutViewRef } from "@/components/FadeOutView";

const LandsMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const publicLandCardRef = useRef<PublicLandCardRef>(null);
  const fadeOutRef = useRef<FadeOutViewRef>(null);
  const cameraRef = useRef<CameraRef>(null);

  const handleMapMoveStart = async (e: NativeSyntheticEvent<ViewStateChangeEvent>) => {
    // console.log("Map move finish event fired");
    fadeOutRef?.current?.setVisible();
  }

  const handleMapFullyRendered = async (event: NativeSyntheticEvent<null>) => {
    let position = await LocationManager.getCurrentPosition();
    if (position) {
      cameraRef.current?.easeTo({center: [position.coords.longitude, position.coords.latitude], duration: 1500, zoom: 4});
    }
  }

  const setupLogging = () => {
    LogManager.setLogLevel('verbose');
    LogManager.onLog((event) => {
      console.log(`[MapLibre Native Log] ${event.level}: ${event.message}`);
      return true; // Return true to override default logging if needed
    });
  }

  const setAmbientCacheSize = async () => {
      await OfflineManager.setMaximumAmbientCacheSize(0);
  }


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
    await LocationManager.requestPermissions();
  }

  useEffect(() => {
    setupLogging();
    setAmbientCacheSize();
    setupLocationManagement();
    setBearerToken();
  }, [])

  return (
    <View style={{flex: 1}}>
      <Map ref={mapRef}
          scaleBar={true}
          mapStyle="http://192.168.1.58/styles/basemap/style.json"
          onRegionWillChange={handleMapMoveStart}
          onDidFinishRenderingMapFully={handleMapFullyRendered}>
        <Camera ref={cameraRef}></Camera>
      </Map>
      <FadeOutView ref={fadeOutRef} delay={5} fadeTime={0.2} style={styles.fillOverParent}>
        <MapCenterPoint iconSize={60}>
          <PublicLandCard ref={publicLandCardRef}/>
        </MapCenterPoint>
      </FadeOutView>
    </View>
  );
};

export default LandsMap;

const styles = StyleSheet.create({
  fillOverParent: {
    position: "absolute",
    height: "100%",
    width: "100%",
    pointerEvents: "box-none"
  }
});