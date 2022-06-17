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
    page: 1,
    totalItems: 0,
    profileEditMode: false,
    isShowPasswordDialog: false,
    isShowImageDialog: false,
    isShowProductDialog: false,
    isShowServiceDialog: false,
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
      state.business.products.push(action.payload);
    },
    editProduct(state, action) {
      state.isShowProductDialog = false;
      const product = state.business.products.find(
        (item) => item._id === action.payload.productId
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
      state.business.services.push(action.payload);
    },
    editService(state, action) {
      state.isShowServiceDialog = false;
      const service = state.business.services.find(
        (item) => item._id === action.payload.serviceId
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
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
