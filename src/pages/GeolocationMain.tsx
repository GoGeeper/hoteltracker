import Map from "./Geolocation";

export default function GeolocationMain() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Map latitude={37.7577} longitude={-122.4376} zoom={8} />
    </div>
  );
}
