import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { businessActions } from "../../../store/slices/BusinessSlice";

function MapPane() {
  const { businesses, selectedIndex, mapCenter, mapZoom, isShowMarkerInfo } =
    useSelector((state) => state.business);
  const dispatch = useDispatch();
  const [mapRef, setMapRef] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.MAP_API,
  });

  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    businesses.forEach((business) => bounds.extend(business.coordinates));
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    setMapRef(map);
    fitBounds(map);
  };

  const markerClickHandler = (event, index, business) => {
    dispatch(businessActions.setSelectedIndex(index));

    dispatch(businessActions.setShowMarkerInfo(true));

    if (mapZoom < 13) {
      dispatch(businessActions.setMapZoom(13));
    }

    dispatch(businessActions.setMapCenter(business.coordinates));
  };

  return isLoaded && businesses ? (
    <GoogleMap
      onLoad={loadHandler}
      onCenterChanged={() => {
        if (mapRef) {
          dispatch(businessActions.setMapCenter(mapRef.getCenter().toJSON()));
        }
      }}
      // center={mapCenter}
      center={businesses[selectedIndex].coordinates}
      zoom={13}
      mapContainerStyle={{ height: "100%", width: "100%" }}
    >
      {businesses.map((business, index) => (
        <Marker
          key={business._id}
          position={business.coordinates}
          onClick={(event) => markerClickHandler(event, index, business)}
        >
          {isShowMarkerInfo && selectedIndex === index && (
            <InfoWindow
              onCloseClick={() =>
                dispatch(businessActions.setShowMarkerInfo(false))
              }
            >
              <Box sx={{ width: "10rem" }}>
                <img
                  src={businesses[selectedIndex].bannerUri}
                  style={{ height: "6rem", width: "100%", objectFit: "cover" }}
                  alt="banner"
                />
                <Typography variant="body1" noWrap>
                  {businesses[selectedIndex].name}
                </Typography>
                <Typography variant="body2" noWrap>
                  {businesses[selectedIndex].address}
                </Typography>
              </Box>
              {/* <div>
                <h3>{businesses[selectedIndex]._id}</h3>
                <div>This is your info window content</div>
              </div> */}
            </InfoWindow>
          )}
        </Marker>
      ))}
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
}

export default MapPane;
