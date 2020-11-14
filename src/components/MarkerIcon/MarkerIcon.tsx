import React from "react";
import { renderToString } from "react-dom/server";

const MarkerIcon = ({
  isOfficialReceptionist,
  atLeastOneFreeSpot,
  hasPulse,
}: {
  isOfficialReceptionist: boolean;
  atLeastOneFreeSpot: boolean;
  hasPulse: boolean;
}) => {
  return (
    <div className="marker-container">
      <div
        className={`pin ${isOfficialReceptionist && "official-receptionist"}`}
        // style={{
        //   background: isOfficialReceptionist ? "#009688" : "#607D8B",
        // }}
      />
      <div
        className={`pin-after ${atLeastOneFreeSpot && "free-spot"}`}
        // style={{
        //   background: atLeastOneFreeSpot ? "#8bc34a" : "#ff5722",
        // }}
      />
      {hasPulse && (
        <>
          <div className="pulse" />
          <div className="pulse-after" />
        </>
      )}
    </div>
  );
};

export const MarkerString = ({
  isOfficialReceptionist,
  atLeastOneFreeSpot,
  hasPulse,
}: {
  isOfficialReceptionist: boolean;
  atLeastOneFreeSpot: boolean;
  hasPulse: boolean;
}) =>
  renderToString(
    MarkerIcon({ isOfficialReceptionist, atLeastOneFreeSpot, hasPulse })
  );

export default MarkerIcon;
