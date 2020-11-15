import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  MarkerProps,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, LatLngTuple, divIcon } from "leaflet";
import firebase from "firebase/app";
import { Button } from "carbon-components-react";
import { MarkerString } from "../MarkerIcon";

const HEADER_HEIGHT = 48;
const BREADKCRUMBS_HEIGHT = 100;

interface IMarker extends MarkerProps {
  id: string;
  atLeastOneFreeSpot: boolean;
  officialReceptionist: boolean;
}

function NewMarker({ setNewPosition, newPosition }: any) {
  useMapEvents({
    click: (e) => {
      setNewPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return newPosition.length ? (
    <Marker position={[newPosition[0], newPosition[1]]} />
  ) : null;
}

export const Map = ({
  readonly,
  setCurrentIndex,
  setNewPosition,
  newPosition,
}: any) => {
  const db = firebase.firestore();
  const position: LatLngTuple = [36.7538, 3.0588];

  const [markers, setMarkers] = useState<IMarker[]>([]);

  useEffect(() => {
    const unsubscribe = db.collection("markers").onSnapshot(
      (docSnapshot) => {
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
          officialReceptionist: doc.data().officialReceptionist,
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
      {!readonly && newPosition && !!newPosition.length && (
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
          height: `calc(100vh - ${
            HEADER_HEIGHT + (readonly ? 0 : BREADKCRUMBS_HEIGHT)
          }px`,
        }}
        center={position}
        zoom={13}>
        {!readonly && (
          <NewMarker
            setNewPosition={setNewPosition}
            newPosition={newPosition}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker: IMarker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            /* icon={Icon} */
            icon={divIcon({
              html: MarkerString({
                isOfficialReceptionist: marker.officialReceptionist,
                atLeastOneFreeSpot: marker.atLeastOneFreeSpot,
                hasPulse: true,
              }),
            })}>
            <Popup>
              {marker.atLeastOneFreeSpot ? "arwah tgari" : "full sorry"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
