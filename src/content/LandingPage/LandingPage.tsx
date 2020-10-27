import { Button, Tabs, Tab } from "carbon-components-react";
import React from "react";
import { Link } from "react-router-dom";

const props = {
  tabs: {
    selected: 0,
    role: "navigation",
  },
  tab: {
    href: "#",
    role: "presentation",
    tabIndex: 0,
  },
};

const LandingPage = () => {
  return (
    <div>
      <div className="banner">
        <h1 className="heading">Find Parking Spots Near You</h1>
        <Tabs {...props.tabs} aria-label="Tab navigation">
          <Tab {...props.tab} label="Automobilist">
            <div className="automobilist">
              <Link to="/explore">
                <Button>Explore</Button>
              </Link>
            </div>
          </Tab>
          <Tab {...props.tab} label="Parkinger">
            <div>
              <div>
                <div>
                  Rapidly build beautiful and accessible experiences. The Carbon
                  kit contains all resources you need to get started.
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default LandingPage;
