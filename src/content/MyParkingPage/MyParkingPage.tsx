import React from "react";
import {
  Grid,
  Row,
  Column,
  Button,
  // SideNav,
  // SideNavItems,
  // SideNavMenu,
  // SideNavMenuItem,
  // SideNavLink,
} from "carbon-components-react";
// import { Fade16 } from "@carbon/icons-react";

const HEADER_HEIGHT = 48;

const MyParkingPage = ({
  hasReceptionistParking,
}: {
  hasReceptionistParking: boolean;
}) => {
  // const hasParking = false;
  return (
    <div style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <Grid>
        <Row>
          {/* <Column ></Column> */}
          <Column sm={{ span: 2, offset: 1 }}>
            <h1 className="title">My Parking</h1>
            {hasReceptionistParking ? (
              <h2>control availibility</h2>
            ) : (
              <div>
                <h2>Seems like you don't have a parking yet.</h2>
                <Button className="create-parking-button">
                  Create A Parking
                </Button>
              </div>
            )}
          </Column>
          {/* <Column></Column> */}
        </Row>
      </Grid>
    </div>
  );
};

export default MyParkingPage;
