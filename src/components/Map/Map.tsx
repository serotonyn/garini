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

const HEADER_HEIGHT = 48;

interface IMarker extends MarkerProps {
  id: string;
  atLeastOneFreeSpot: boolean;
}

export const Map = () => {
  const db = firebase.firestore();
  const position: LatLngTuple = [36.7538, 3.0588];

  const [markers, setMarkers] = useState<IMarker[]>([]);

  console.log(useMapEvents);
  // const map = useMapEvents({
  //   click() {
  //     map.locate();
  //   },
  //   locationfound(e) {
  //     // setPosition(e.latlng)
  //     // map.flyTo(e.latlng, map.getZoom())
  //     console.log(e);
  //   },
  // });

  // useEffect(() => {
  //   async function fetchData() {
  //     const querySnapshot = await db.collection("markers").get();
  //     if (querySnapshot.empty) {
  //       return;
  //     }
  //     const markers: Marker[] = querySnapshot.docs.map((doc) => ({
  //       position: [
  //         doc.data().position.latitude as number,
  //         doc.data().position.longitude as number,
  //       ] as LatLngExpression,
  //       id: doc.id,
  //     }));
  //     setMarkers(markers);
  //   }
  //   fetchData();
  // }, []);

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
      {markers.map((marker: IMarker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            {marker.atLeastOneFreeSpot ? "arwah tgari" : "full sorry"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
