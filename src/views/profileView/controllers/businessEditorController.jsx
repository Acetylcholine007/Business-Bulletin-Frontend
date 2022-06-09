import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
// import TagAPI from "../../../shared/apis/TagAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const businessEditorController = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: { error: false, value: "" },
    description: { error: false, value: "" },
    contactNo: { error: false, value: "" },
    address: { error: false, value: "" },
  });
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [tags, setTags] = useState([]);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const saveHandler = async () => {};

  return {
    businessInfo,
    setBusinessInfo,
    products,
    setProducts,
    services,
    setServices,
    lat,
    setLat,
    lng,
    setLng,
    tags,
    setTags,
    saveHandler,
    navigate,
  };
};
