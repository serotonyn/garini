import React from "react";
import {
  MapContainer,
  Marker,
  // Popup,
  TileLayer,
  MarkerProps,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";

const HEADER_HEIGHT = 48;

const markers: MarkerProps[] = [
  {
    position: [36.7538, 3.0588],
  },
];

export default () => {
  const position: LatLngTuple = [36.7538, 3.0588];

  return (
    <MapContainer
      style={{ width: "100%", height: `calc(100vh - ${HEADER_HEIGHT}px` }}
      center={position}
      zoom={13}
      // scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker: MarkerProps) => (
        <Marker position={marker.position}>
          {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
        </Marker>
      ))}
    </MapContainer>
  );
};
