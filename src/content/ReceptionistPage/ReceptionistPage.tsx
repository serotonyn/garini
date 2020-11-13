import React from "react";
import { Context } from "../../App";
import MyParking from "../../components/MyParking";
import NoParkingYet from "../../components/NoParkingYet";

const ReceptionistPage = () => {
  return (
    <Context.Consumer>
      {({ hasReceptionistParking }) => {
        return hasReceptionistParking ? <MyParking /> : <NoParkingYet />;
      }}
    </Context.Consumer>
  );
};

export default ReceptionistPage;
