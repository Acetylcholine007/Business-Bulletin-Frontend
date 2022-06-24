import { Box, CircularProgress, Typography } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedbackActions } from "../../../store/slices/FeedbackSlice";
import { profileActions } from "../../../store/slices/ProfileSlice";

const errorMessageGenerator = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "You've blocked auto acquiring location.";

    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable.";

    case error.TIMEOUT:
      return "The request to get user location timed out.";

    case error.UNKNOWN_ERROR:
      return "An unknown error occurred.";
  }
};

const LocationPickerCard = ({ isNew }) => {
  const { business } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [center, setCenter] = useState({ lat: 14, lng: 120 });
  const [mapRef, setMapRef] = useState(null);
  const [iShowInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    if (isNew)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(
              profileActions.editBusiness({
                field: "coordinates",
                value: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              })
            );
            setCenter({
              field: "coordinates",
              value: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (error) => {
            dispatch(
              feedbackActions.setNotification({
                snackbarMessage: errorMessageGenerator(error),
                isShowSnackbar: true,
                severity: "error",
              })
            );
          }
        );
      } else {
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Browser has no geolocation support",
            isShowSnackbar: true,
            severity: "info",
          })
        );
      }
    else {
      setCenter(business.coordinates);
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.MAP_API,
  });

  const loadHandler = (map) => {
    setMapRef(map);
  };

  const mapClickHandler = (e) => {
    dispatch(
      profileActions.editBusiness({
        field: "coordinates",
        value: e.latLng.toJSON(),
      })
    );
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={loadHandler}
      onClick={mapClickHandler}
      center={center}
      zoom={12}
      mapContainerStyle={{ height: "100%", width: "100%" }}
    >
      <Marker
        position={business.coordinates}
        onClick={() => setShowInfoWindow(true)}
      >
        {iShowInfoWindow && (
          <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
            <Typography variant="body1">{`${business.coordinates.lat}, ${business.coordinates.lng}`}</Typography>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LocationPickerCard;
