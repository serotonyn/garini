import React, { useEffect, useState } from "react";
import { Grid, Row, Column, Button } from "carbon-components-react";
import firebase from "firebase";

const HEADER_HEIGHT = 48;

const MyParkingPage = ({ userId }: { userId: string }) => {
  const [atLeastOneFreeSpot, setAtLeastOneFreeSpot] = useState<boolean | null>(
    null
  );
  useEffect(() => {
    let unsubscribe: any;
    firebase
      .firestore()
      .collection("/markers")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        unsubscribe = querySnapshot.docs[0].ref.onSnapshot((doc) => {
          console.log({ doc: doc.data() });
          setAtLeastOneFreeSpot((doc as any).data().atLeastOneFreeSpot);
        });
      })
      .catch(console.log);
    return () => {
      unsubscribe();
    };
  }, [userId]);

  const toggleAvailibility = () => {
    firebase
      .firestore()
      .collection("/markers")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new Error("Marker not found");
        }
        querySnapshot.docs[0].ref.set(
          { atLeastOneFreeSpot: !atLeastOneFreeSpot },
          { merge: true }
        );
      })
      .catch(console.log);
  };

  return (
    <div style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <Grid>
        <Row>
          <Column sm={{ span: 2, offset: 1 }}>
            <h1 className="title">My Parking</h1>
            <h2>control availibility</h2>

            {atLeastOneFreeSpot !== null &&
              (atLeastOneFreeSpot ? (
                <Button onClick={() => toggleAvailibility()}>
                  Park is full.
                </Button>
              ) : (
                <Button onClick={() => toggleAvailibility()}>
                  A spot has become available.
                </Button>
              ))}
          </Column>
        </Row>
      </Grid>
    </div>
  );
};

export default MyParkingPage;
