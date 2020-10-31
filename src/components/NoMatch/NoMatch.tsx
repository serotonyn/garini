import { Button } from "carbon-components-react";
import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <h3>404</h3>
      <Link to="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
};

export default NoMatch;
