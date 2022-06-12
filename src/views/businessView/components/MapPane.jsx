import React from "react";
import AppMap from "../../../shared/components/AppMap";

const MapPane = ({
  selectedIndex,
  setSelectedIndex,
  page,
  totalItems,
  businesses,
}) => {
  return (
    <AppMap
      isPicker={false}
      isMarkerShown={true}
      target={{
        lat: 14.830121812143584,
        lng: 120.80162571435547,
      }}
      center={{
        lat: 14.830121812143584,
        lng: 120.80162571435547,
      }}
      // showPatientInfo={showPatientInfo}
      // showAddressInfo={showAddressInfo}
      // setShowAddressInfo={setShowAddressInfo}
      // setShowPatientInfo={setShowPatientInfo}
      onMapClick={(ev) => {}}
    />
  );
};

export default MapPane;
