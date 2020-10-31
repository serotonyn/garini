import {
  Button,
  Loading,
  ProgressIndicator,
  ProgressStep,
  Tile,
} from "carbon-components-react";
import firebase from "firebase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Map from "../../components/ReceptionistMap";
import { v4 as uuidv4 } from "uuid";

const BREADCRUMBS_HEIGHT = 100;

const CreateParkingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPosition, setNewPosition] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  const submit = async () => {
    setIsSubmitting(true);
    const db = firebase.firestore();

    try {
      await db
        .collection("markers")
        .doc(uuidv4())
        .set({
          atLeastOneFreeSpot: false,
          position: new firebase.firestore.GeoPoint(
            newPosition[0],
            newPosition[1]
          ),
        });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        style={{
          height: BREADCRUMBS_HEIGHT,
          display: "flex",
          justifyContent: "center",
        }}>
        {/* TODO: use scss */}
        <div style={{ paddingTop: 38 }}>
          <ProgressIndicator currentIndex={currentIndex}>
            <ProgressStep label="Start" />
            <ProgressStep label="Map" />
            <ProgressStep label="Details" secondaryLabel="Hours" />
            <ProgressStep
              // invalid
              label="Documents"
              secondaryLabel="Official docs"
            />
            <ProgressStep
              // disabled
              label="Fifth step"
            />
          </ProgressIndicator>
        </div>
      </div>
      {currentIndex === 0 && (
        <div
          // {/* TODO: use scss */}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <h1>you start here, I'm gonna explain how to create a parking</h1>
          <Tile>Ps: You cannot move to previous steps. So just refresh.</Tile>
          <Button onClick={() => setCurrentIndex((index) => index + 1)}>
            Next
          </Button>
        </div>
      )}
      {currentIndex === 1 && (
        <div>
          <Map
            setCurrentIndex={setCurrentIndex}
            setNewPosition={setNewPosition}
            newPosition={newPosition}
          />
        </div>
      )}
      {currentIndex === 2 && (
        <div>
          <Button onClick={() => setCurrentIndex((index) => index + 1)}>
            Set Work Hours
          </Button>
        </div>
      )}
      {currentIndex === 3 && (
        <div>
          <Button onClick={() => setCurrentIndex((index) => index + 1)}>
            Upload document
          </Button>
        </div>
      )}
      {currentIndex === 4 && (
        <div>
          <Button disabled={isSubmitting} onClick={submit}>
            Submit
          </Button>
          {isSubmitting && <Loading />}
        </div>
      )}
    </>
  );
};

export default CreateParkingPage;
