import React from "react";
import { Grid, Row, Column } from "carbon-components-react";

const HEADER_HEIGHT = 48;

const MyParkingPage = () => {
  return (
    <div style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <Grid>
        <Row>
          <Column sm={{ span: 2, offset: 1 }}>
            <h1 className="title">My Parking</h1>
            <h2>control availibility</h2>
          </Column>
        </Row>
      </Grid>
    </div>
  );
};

export default MyParkingPage;
