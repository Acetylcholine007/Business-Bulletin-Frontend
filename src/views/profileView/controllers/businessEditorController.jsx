import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
import ProductAPI from "../../../shared/apis/ProductAPI";
import ServiceAPI from "../../../shared/apis/ServiceAPI";
import TagAPI from "../../../shared/apis/TagAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const businessEditorController = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [logoUri, setLogoUri] = useState(
    "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/09/kiwi-1296x728-header.jpg?w=1155&h=1528"
  );
  const [bannerUri, setBannerUri] = useState(
    "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/09/kiwi-1296x728-header.jpg?w=1155&h=1528"
  );
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [openLocationPicker, setOpenLocationPicker] = useState(false);
  const [openBannerPicker, setOpenBannerPicker] = useState(false);
  const [openLogoPicker, setOpenLogoPicker] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [tags, setTags] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [currentCredential, setCurrentCredential] = useState("");
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    state: { business },
  } = useLocation();

  useEffect(() => {
    TagAPI.getTags(loadingDispatch, snackbarDispatch, (data) => {
      setTags(data.tags);

      const chosenTagIds = business.tags.map((tag) => tag._id);
      const processedChosenTags = data.tags.filter((item) =>
        chosenTagIds.includes(item._id)
      );
      setChosenTags(processedChosenTags);
    });
  }, []);

  useEffect(() => {
    console.log(business);
    setName(business.name);
    setDescription(business.description);
    setContactNo(business.contactNo);
    setAddress(business.address);
    setLogoUri(business.logoUri);
    setBannerUri(business.bannerUri);
    setProducts(business.products);
    setServices(business.services);
    setLat(business.lat);
    setLng(business.lng);
    setCredentials(business.credentials);
  }, []);

  const businessSaveHandler = async () => {
    BusinessAPI.editBusiness(
      {
        name,
        description,
        contactNo,
        address,
        owner: userId,
        lat,
        lng,
        logoUri,
        bannerUri,
        tags: chosenTags,
        credentials,
      },
      loadingDispatch,
      snackbarDispatch,
      () => {
        navigate("/profile");
      },
      business._id
    );
  };

  const saveProductHandler = (isEdit, product) => {
    if (isEdit) {
      ProductAPI.editProduct(
        product,
        loadingDispatch,
        snackbarDispatch,
        () => {
          setProducts((products) => {
            const targetProduct = products.find(
              (item) => item._id === product._id
            );
            targetProduct.name = product.name;
            targetProduct.description = product.description;
            targetProduct.price = product.price;
            targetProduct.imagesUri = product.imagesUri;
            return products;
          });
        },
        product._id
      );
    } else {
      ProductAPI.createProduct(
        { ...product, businessId: business._id },
        loadingDispatch,
        snackbarDispatch,
        () => {
          setProducts((products) => [...products, product]);
        }
      );
    }
  };

  const removeProductHandler = (productId) => {
    ProductAPI.deleteProduct(
      loadingDispatch,
      snackbarDispatch,
      () => {
        setProducts((products) =>
          products.filter((item) => item._id !== productId)
        );
      },
      productId
    );
  };

  const saveServiceHandler = (isEdit, service) => {
    if (isEdit) {
      console.log(service);
      ServiceAPI.editService(
        service,
        loadingDispatch,
        snackbarDispatch,
        () => {
          setServices((services) => {
            const targetService = services.find(
              (item) => item._id === service._id
            );
            targetService.name = service.name;
            targetService.description = service.description;
            targetService.price = service.price;
            targetService.imagesUri = service.imagesUri;
            return services;
          });
        },
        service._id
      );
    } else {
      ServiceAPI.createService(
        { ...service, businessId: business._id },
        loadingDispatch,
        snackbarDispatch,
        () => {
          setServices((services) => [...services, service]);
        }
      );
    }
  };

  const removeServiceHandler = (serviceId) => {
    ServiceAPI.deleteService(
      loadingDispatch,
      snackbarDispatch,
      () => {
        setServices((services) =>
          services.filter((item) => item._id !== serviceId)
        );
      },
      serviceId
    );
  };

  return {
    name,
    setName,
    description,
    setDescription,
    contactNo,
    setContactNo,
    address,
    setAddress,
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
    openBannerPicker,
    setOpenBannerPicker,
    openLogoPicker,
    setOpenLogoPicker,
    businessSaveHandler,
    saveServiceHandler,
    saveProductHandler,
    removeProductHandler,
    removeServiceHandler,
    logoUri,
    setLogoUri,
    bannerUri,
    setBannerUri,
    credentials,
    setCredentials,
    currentCredential,
    setCurrentCredential,
  };
};
