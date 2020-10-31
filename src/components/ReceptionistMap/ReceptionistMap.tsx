import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  // Popup,
  TileLayer,
  MarkerProps,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import firebase from "firebase/app";
import { Button } from "carbon-components-react";

const HEADER_HEIGHT = 48;
const BREADKCRUMBS_HEIGHT = 100;

interface IMarker extends MarkerProps {
  id: string;
  atLeastOneFreeSpot: boolean;
}

function NewMarker({ setNewPosition, newPosition }: any) {
  useMapEvents({
    click: (e) => {
      console.log(e.latlng.lat, e.latlng.lng);
      setNewPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return newPosition.length ? (
    <Marker position={[newPosition[0], newPosition[1]]} />
  ) : null;
}

const ReceptionistMap = ({
  setCurrentIndex,
  setNewPosition,
  newPosition,
}: any) => {
  const db = firebase.firestore();
  const position: LatLngTuple = [36.7538, 3.0588];

  const [markers, setMarkers] = useState<IMarker[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("markers")
      // .doc("SF")
      .onSnapshot(
        (docSnapshot) => {
          console.log(
            `Received doc snapshot: ${docSnapshot.docs.map((doc) => doc.id)}`
          );
          if (docSnapshot.empty) {
            return;
          }
          const markers: IMarker[] = docSnapshot.docs.map((doc) => ({
            position: [
              doc.data().position.latitude as number,
              doc.data().position.longitude as number,
            ] as LatLngExpression,
            id: doc.id,
            atLeastOneFreeSpot: doc.data().atLeastOneFreeSpot,
          }));
          setMarkers(markers);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}>
      {!!newPosition.length && (
        <Button
          style={{ position: "absolute", zIndex: 499 }}
          onClick={() => {
            setCurrentIndex((index: number) => index + 1);
          }}>
          Validate
        </Button>
      )}
      <MapContainer
        style={{
          width: "100%",
          height: `calc(100vh - ${HEADER_HEIGHT + BREADKCRUMBS_HEIGHT}px`,
          cursor: "crosshair",
        }}
        center={position}
        zoom={13}>
        <NewMarker setNewPosition={setNewPosition} newPosition={newPosition} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker: IMarker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              {marker.atLeastOneFreeSpot ? "arwah tgari" : "full sorry"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ReceptionistMap;
