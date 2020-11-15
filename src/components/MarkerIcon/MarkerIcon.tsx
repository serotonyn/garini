import React from "react";
import { renderToString } from "react-dom/server";

const MarkerIcon = ({
  isOfficialReceptionist,
  atLeastOneFreeSpot,
  hasPulse,
  isPinInvisible = false,
  isPinAfterInvisible = false,
}: {
  isOfficialReceptionist: boolean;
  atLeastOneFreeSpot: boolean;
  hasPulse: boolean;
  isPinInvisible?: boolean;
  isPinAfterInvisible?: boolean;
}) => {
  return (
    <div className="marker-container">
      <div
        className={`pin ${
          isOfficialReceptionist ? "official-receptionist" : ""
        } ${isPinInvisible ? "invisible" : ""}`}
      />
      <div
        className={`pin-after ${atLeastOneFreeSpot ? "free-spot" : ""} ${
          isPinAfterInvisible ? "invisible" : ""
        }`}
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
  isPinInvisible = false,
  isPinAfterInvisible = false,
}: {
  isOfficialReceptionist: boolean;
  atLeastOneFreeSpot: boolean;
  hasPulse: boolean;
  isPinInvisible?: boolean;
  isPinAfterInvisible?: boolean;
}) =>
  renderToString(
    MarkerIcon({
      isOfficialReceptionist,
      atLeastOneFreeSpot,
      hasPulse,
      isPinAfterInvisible,
      isPinInvisible,
    })
  );

export default MarkerIcon;
