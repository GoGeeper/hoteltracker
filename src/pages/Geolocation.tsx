import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, zoom }) => {
  const [viewport, setViewport] = React.useState<any>({
    latitude,
    longitude,
    zoom,
    width: "100%",
    height: "100%",
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={""}
      onViewportChange={(viewport: any) => setViewport(viewport)}
    >
      <Marker latitude={latitude} longitude={longitude}>
        <div>Marker</div>
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
