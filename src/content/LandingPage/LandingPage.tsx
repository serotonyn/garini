import React from "react";
import { Link } from "react-router-dom";
import { Button, Tabs, Tab } from "carbon-components-react";
import { Map16, Login16 } from "@carbon/icons-react";
import MarkerIcon from "../../components/MarkerIcon";

const HEADER_HEIGHT = 48;

const props = {
  tabs: {
    selected: 0,
    role: "navigation",
  },
  tab: {
    role: "presentation",
    tabIndex: 0,
  },
};

const LandingPage = () => {
  return (
    <div className="container">
      <div
        className="banner"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        <h1 className="heading">Find Parking Spots Near You</h1>
        {/* <div className="markers-legend">
          <MarkerIcon
            atLeastOneFreeSpot={false}
            isOfficialReceptionist={false}
            hasPulse={false}
          />
          <br />
          <MarkerIcon
            atLeastOneFreeSpot={false}
            isOfficialReceptionist={false}
            hasPulse={false}
          />
        </div> */}
        <div>
          <Tabs {...props.tabs} aria-label="Tab navigation">
            <Tab {...props.tab} label="Automobilist">
              <div className="tab-content">
                <Link to="/explore">
                  <Button renderIcon={Map16}>Explore</Button>
                </Link>
              </div>
            </Tab>
            <Tab {...props.tab} label="Receptionist">
              <div className="tab-content">
                <Link to="/signup">
                  <Button renderIcon={Login16}>Sign In</Button>
                </Link>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
