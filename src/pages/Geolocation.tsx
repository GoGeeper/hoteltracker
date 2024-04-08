import { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

declare global {
  namespace google {
    namespace maps {
      // Add any additional types you need here
    }
  }
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 0,
  lng: 0,
};

export default function MapComponent() {
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD5KIOiO3zE7fZHkD7U2iF4Ci0BAjMIm2Q",
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setMarkerPosition({
      lat: e.latLng?.lat() || 0,
      lng: e.latLng?.lng() || 0,
    });
  };

  return isLoaded ? (
    <div>
      <h2>This is the location we'll show guests on our site.</h2>
      <p>
        Move the map to find the exact location of your property, then click to
        drop the pin.
      </p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            onClick={() => {
              setSelectedMarker(markerPosition);
            }}
          />
        )}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>Your Property Location</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
