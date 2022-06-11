import { useContext, useEffect, useRef, useState } from "react";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
import ProductAPI from "../../../shared/apis/ProductAPI";
import ServiceAPI from "../../../shared/apis/ServiceAPI";
import TagAPI from "../../../shared/apis/TagAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const businessController = () => {
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [queryTarget, setQueryTarget] = useState("Name");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [entity, setEntity] = useState("Business");
  const [displayMode, setDisplayMode] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tagLoading, setTagLoading] = useState(true);
  const { loadingDispatch } = useContext(LoadingContext);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const searchBoxRef = useRef();
  const searchAreaRef = useRef();

  useEffect(() => {
    TagAPI.getTags(setTagLoading, snackbarDispatch, (data) => {
      setTags(data.tags);
    });
  }, []);

  useEffect(() => {
    switch (entity) {
      case "Business":
        BusinessAPI.getBusinesses(
          query,
          page,
          queryTarget.toLowerCase(),
          loadingDispatch,
          snackbarDispatch,
          (data) => {
            setBusinesses(data.businesses);
            setTotalItems(data.totalItems);
          }
        );
        break;
      case "Product":
        ProductAPI.getProducts(
          query,
          page,
          loadingDispatch,
          snackbarDispatch,
          (data) => {
            setProducts(data.products);
            setTotalItems(data.totalItems);
          }
        );
        break;
      case "Service":
        ServiceAPI.getBusinesses(
          query,
          page,
          loadingDispatch,
          snackbarDispatch,
          (data) => {
            setServices(data.services);
            setTotalItems(data.totalItems);
          }
        );
        break;
      default:
        BusinessAPI.getBusinesses(
          query,
          page,
          queryTarget.toLowerCase(),
          loadingDispatch,
          snackbarDispatch,
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
    setPage(1);
  };

  return {
    businesses,
    products,
    services,
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
    searchAreaRef,
    tags,
    selectedTags,
    setSelectedTags,
  };
};
