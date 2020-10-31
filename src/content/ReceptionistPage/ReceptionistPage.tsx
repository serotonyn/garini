import React from "react";
import { Grid, Row, Column, Button } from "carbon-components-react";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  return (
    <Grid>
      <Row>
        <Column></Column>
        <Column>
          <h1 className="title">Receptionist Space</h1>
          <Link to="/create">
            <Button className="create-parking-button">Create A Parking</Button>
          </Link>
        </Column>
        <Column></Column>
      </Row>
    </Grid>
  );
};

export default ExplorePage;
