import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "business",
  initialState: {
    initialized: false,
    businesses: null,
    tags: null,
    selectedTags: [],
    page: 1,
    totalItems: 0,
    selectedIndex: 0,
    commodityTabIndex: 0,
    presentationTabIndex: 0,
    query: "",
    queryTarget: "Name",
    entity: "Business",
  },
  reducers: {
    initializePage(state, action) {
      state.tags = action.payload.tags;
      state.businesses = action.payload.businesses;
      state.totalItems = action.payload.totalItems;
      state.initialized = true;
    },
    setBusinesses(state, action) {
      state.businesses = action.payload.businesses;
      state.totalItems = action.payload.totalItems;
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
    setSelectedTags(state, action) {
      state.selectedTags = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    setSelectedIndex(state, action) {
      state.selectedIndex = action.payload;
    },
    setCommodityTabIndex(state, action) {
      state.commodityTabIndex = action.payload;
    },
    setPresentationTabIndex(state, action) {
      state.presentationTabIndex = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setQueryTarget(state, action) {
      state.queryTarget = action.payload;
    },
    setEntity(state, action) {
      state.entity = action.payload.entity;
      state.queryTarget = "Name";
      state.page = 1;
    },
  },
});

export const businessActions = businessSlice.actions;

export default businessSlice;
