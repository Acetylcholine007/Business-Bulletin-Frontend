import React from "react";
import AppMap from "../../../shared/components/AppMap";
import { useDispatch, useSelector } from "react-redux";
import { businessActions } from "../../../store/slices/BusinessSlice";

const MapPane = () => {
  const { selectedIndex, page, totalItems, businesses } = useSelector(
    (state) => state.business
  );
  const dispatch = useDispatch();

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
