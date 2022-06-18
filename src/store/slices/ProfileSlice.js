import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    businesses: null,
    business: null,
    selectedProduct: null,
    selectedService: null,
    user: null,
    newUser: null,
    currentCredential: "",
    tags: null,
    page: 1,
    totalItems: 0,
    profileEditMode: false,
    isShowPasswordDialog: false,
    isShowImageDialog: false,
    isShowProductDialog: false,
    isShowServiceDialog: false,
    isShowLogoDialog: false,
    isShowBannerDialog: false,
    isShowLocationDialog: false,
  },
  reducers: {
    setBusinesses(state, action) {
      state.businesses = action.payload.businesses;
      state.totalItems = action.payload.totalItems;
    },
    setBusiness(state, action) {
      state.business = action.payload;
    },
    editBusiness(state, action) {
      state.business[action.payload.field] = action.payload.value;
    },
    removeBusiness(state, action) {
      state.businesses = state.businesses.filter(
        (business) => business._id !== action.payload
      );
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
    setCurrentCredential(state, action) {
      state.currentCredential = action.payload;
    },
    addCredential(state) {
      state.business.credentials.push(state.currentCredential);
      state.currentCredential = "";
    },
    removeCredential(state, action) {
      state.business.credentials = state.business.credentials.filter(
        (credential) => credential !== action.payload
      );
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    editNewUser(state, action) {
      state.newUser[action.payload.field] = action.payload.value;
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
    },
    revertNewUser(state) {
      state.user = state.newUser;
    },
    addProduct(state, action) {
      state.business.products.push({...action.payload, business: state.business._id});
    },
    editProduct(state, action) {
      console.log(action.payload)
      state.isShowProductDialog = false;
      const product = state.business.products.find(
        (item) => item._id === action.payload._id
      );
      product.name = action.payload.name;
      product.description = action.payload.price;
      product.price = action.payload.price;
      product.imagesUri = action.payload.imagesUri;
    },
    removeProduct(state, action) {
      state.business.products = state.business.products.filter(
        (product) => product._id !== action.payload
      );
    },
    addService(state, action) {
      state.business.services.push({...action.payload, business: state.business._id});
    },
    editService(state, action) {
      state.isShowServiceDialog = false;
      const service = state.business.services.find(
        (item) => item._id === action.payload._id
      );
      service.name = action.payload.name;
      service.description = action.payload.price;
      service.price = action.payload.price;
      service.imagesUri = action.payload.imagesUri;
    },
    removeService(state, action) {
      state.business.services = state.business.services.filter(
        (service) => service._id !== action.payload
      );
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    setProfileEditMode(state, action) {
      state.profileEditMode = action.payload;
    },
    setShowPasswordDialog(state, action) {
      state.isShowPasswordDialog = action.payload;
    },
    setShowImageDialog(state, action) {
      state.isShowImageDialog = action.payload;
    },
    setShowLogoDialog(state, action) {
      state.isShowLogoDialog = action.payload;
    },
    setShowBannerDialog(state, action) {
      state.isShowBannerDialog = action.payload;
    },
    setShowLocationDialog(state, action) {
      state.isShowLocationDialog = action.payload;
    },
    setShowProductDialog(state, action) {
      state.selectedProduct = action.payload.product;
      state.isShowProductDialog = action.payload.status;
    },
    setShowServiceDialog(state, action) {
      state.selectedService = action.payload.service;
      state.isShowServiceDialog = action.payload.status;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
