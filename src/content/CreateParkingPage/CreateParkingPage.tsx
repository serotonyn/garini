import {
  Button,
  Loading,
  ProgressIndicator,
  ProgressStep,
  Tile,
  Toggle,
} from "carbon-components-react";
import firebase from "firebase";
import React, { useState } from "react";
import Map from "../../components/Map";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../../App";

const BREADCRUMBS_HEIGHT = 100;

const CreateParkingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPosition, setNewPosition] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToggleSimulateDocsOn, setToggleSimulateDocs] = useState(false);

  const submit = async (userId: string, updateHasReceptionistParking: any) => {
    setIsSubmitting(true);
    const db = firebase.firestore();

    try {
      await db
        .collection("/markers")
        .doc(uuidv4())
        .set({
          userId,
          atLeastOneFreeSpot: false,
          position: new firebase.firestore.GeoPoint(
            newPosition[0],
            newPosition[1]
          ),
          officialReceptionist: isToggleSimulateDocsOn,
        });
      await db
        .collection("/users")
        .doc(userId)
        .set({ hasReceptionistParking: true }, { merge: true });
      updateHasReceptionistParking(true);
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
          {/* TODO: ProgressIndicator responsiveness */}
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
          <h1 className="you-start-here">
            you start here, I'm gonna explain how to create a parking
          </h1>
          <Tile className="tile">
            Ps: You cannot move to previous steps. So just refresh.
          </Tile>
          <Button
            className="button"
            onClick={() => setCurrentIndex((index) => index + 1)}>
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
        <div className="set-hours-container">
          <Button
            className="button"
            onClick={() => setCurrentIndex((index) => index + 1)}>
            Set Work Hours
          </Button>
        </div>
      )}
      {currentIndex === 3 && (
        <div className="set-documents-container">
          <Toggle
            id="toggle-simulate-docs"
            labelText="Simulate Docs Uploaded"
            onToggle={(state: boolean) => setToggleSimulateDocs(!!state)}
          />
          <Button
            className="button"
            onClick={() => setCurrentIndex((index) => index + 1)}>
            Upload document
          </Button>
        </div>
      )}
      {currentIndex === 4 && (
        <Context.Consumer>
          {({ userId, updateHasReceptionistParking }) => {
            return (
              <div className="submit-container">
                <Button
                  className=".button"
                  disabled={isSubmitting}
                  onClick={() => submit(userId!, updateHasReceptionistParking)}>
                  Submit
                </Button>
                {isSubmitting && <Loading />}
              </div>
            );
          }}
        </Context.Consumer>
      )}
    </>
  );
};

export default CreateParkingPage;
