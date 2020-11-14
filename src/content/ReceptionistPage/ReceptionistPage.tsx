import React from "react";
import { Context } from "../../App";
import MyParking from "../../components/MyParking";
import NoParkingYet from "../../components/NoParkingYet";

const ReceptionistPage = () => {
  return (
    <Context.Consumer>
      {({ hasReceptionistParking, userId }) => {
        return hasReceptionistParking && userId ? (
          <MyParking userId={userId} />
        ) : (
          <NoParkingYet />
        );
      }}
    </Context.Consumer>
  );
};

export default ReceptionistPage;
