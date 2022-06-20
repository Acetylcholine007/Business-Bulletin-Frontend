import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "business",
  initialState: {
    initialized: false,
    businesses: null,
    mapCenter: {
      lat: 14.830121812143584,
      lng: 120.80162571435547,
    },
    mapZoom: 8,
    isShowMarkerInfo: false,
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
    setMapCenter(state, action) {
      state.mapCenter = action.payload;
    },
    setMapZoom(state, action) {
      state.mapZoom = action.payload;
    },
    setShowMarkerInfo(state, action) {
      state.isShowMarkerInfo = action.payload;
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
