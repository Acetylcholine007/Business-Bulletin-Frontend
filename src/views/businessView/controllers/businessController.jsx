import { useContext, useEffect, useRef, useState } from "react";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const businessController = () => {
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [queryTarget, setQueryTarget] = useState("Name");
  const [entity, setEntity] = useState("Business");
  const [displayMode, setDisplayMode] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { loadingDispatch } = useContext(LoadingContext);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const searchBoxRef = useRef();

  useEffect(() => {
    switch (entity) {
      case "business":
        BusinessAPI.getBusinesses(
          loadingDispatch,
          snackbarDispatch,
          { page, query, queryTarget },
          (data) => {
            setBusinesses(data.businesses);
            setTotalItems(data.totalItems);
          }
        );
        break;
      case "product":
        BusinessAPI.getBusinesses(
          loadingDispatch,
          snackbarDispatch,
          { page, query, queryTarget },
          (data) => {
            setBusinesses(data.businesses);
            setTotalItems(data.totalItems);
          }
        );
        break;
      case "service":
        BusinessAPI.getBusinesses(
          loadingDispatch,
          snackbarDispatch,
          { page, query, queryTarget },
          (data) => {
            setBusinesses(data.businesses);
            setTotalItems(data.totalItems);
          }
        );
        break;
      default:
        BusinessAPI.getBusinesses(
          loadingDispatch,
          snackbarDispatch,
          { page, query, queryTarget },
          (data) => {
            setBusinesses(data.businesses);
            setTotalItems(data.totalItems);
          }
        );
    }
  }, [entity, page, query, queryTarget]);

  const changeEntity = (newEntity) => {
    setEntity(newEntity);
    setQueryTarget("Name");
  };

  return {
    businesses,
    page,
    setPage,
    totalItems,
    setQuery,
    queryTarget,
    setQueryTarget,
    entity,
    changeEntity,
    displayMode,
    setDisplayMode,
    selectedIndex,
    setSelectedIndex,
    tabIndex,
    setTabIndex,
    searchBoxRef,
  };
};
