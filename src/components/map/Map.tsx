import { FC, ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Map: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MapContainer
      zoom={5}
      center={[51.505, -0.09]}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      zoomControl={true}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
