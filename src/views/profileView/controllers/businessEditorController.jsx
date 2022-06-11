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
  const [chosenTags, setChosenTags] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [openLocationPicker, setOpenLocationPicker] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [tags, setTags] = useState([]);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const businessSaveHandler = async () => {};

  const productSavehandler = async () => {};

  const serviceSaveHandler = async () => {};

  return {
    businessInfo,
    setBusinessInfo,
    products,
    setProducts,
    services,
    setServices,
    chosenTags,
    setChosenTags,
    lat,
    setLat,
    lng,
    setLng,
    tags,
    setTags,
    selectedProduct,
    setSelectedProduct,
    selectedService,
    setSelectedService,
    openProductDialog,
    setOpenProductDialog,
    openServiceDialog,
    setOpenServiceDialog,
    openLocationPicker,
    setOpenLocationPicker,
    businessSaveHandler,
    productSavehandler,
    serviceSaveHandler,
    navigate,
  };
};
