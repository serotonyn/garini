import React from "react";
import { Grid, Row, Column, Button } from "carbon-components-react";
import { Link } from "react-router-dom";

const HEADER_HEIGHT = 48;

const ReceptionistPage = () => {
  return (
    <div style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <Grid>
        <Row>
          <Column sm={{ span: 2, offset: 1 }}>
            <h1 className="title">My Parking</h1>
            <div>
              <h2>Seems like you don't have a parking yet.</h2>
              <Link to="/create">
                <Button className="create-parking-button">
                  Create A Parking
                </Button>
              </Link>
            </div>
          </Column>
        </Row>
      </Grid>
    </div>
  );
};

export default ReceptionistPage;
