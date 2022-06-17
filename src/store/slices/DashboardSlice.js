import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    initialized: false,
    businesses: null,
    users: null,
    tags: null,
    businessPage: 1,
    userPage: 1,
    businessTotalItems: 0,
    userTotalItems: 0,
    businessQuery: "",
    userQuery: "",
    businessQueryTarget: "Name",
    userQueryTarget: "First name",
    isShowBusinessDialog: false,
    isShowUserDialog: false,
    isShowTagDialog: false,
    selectedBusiness: null,
    selectedUser: null,
    selectedTag: null,
  },
  reducers: {
    initializePage(state, action) {
      state.tags = action.payload.tags;
      state.businesses = action.payload.businesses;
      state.businessTotalItems = action.payload.businessTotalItems;
      state.users = action.payload.users;
      state.userTotalItems = action.payload.userTotalItems;
      state.initialized = true;
    },
    setBusinesses(state, action) {
      state.businesses = action.payload.businesses;
      state.businessTotalItems = action.payload.businessTotalItems;
    },
    setUsers(state, action) {
      state.users = action.payload.users;
      state.userTotalItems = action.payload.userTotalItems;
    },
    setTags(state, action) {
      state.tags = action.payload.tags;
    },
    deleteTag(state, action) {
      state.tags = state.tags.filter((tag) => tag._id !== action.payload);
    },
    editTag(state, action) {
      state.isShowTagDialog = false;
      const tag = state.tags.find((item) => item._id === action.payload.tagId);
      tag.name = action.payload.name;
    },
    addTag(state, action) {
      state.isShowTagDialog = false;
      state.tags.push(action.payload);
    },
    allowBusiness(state, action) {
      state.isShowBusinessDialog = false;
      const business = state.businesses.find(
        (item) => item._id === action.payload.businessId
      );
      business.status = action.payload.status;
    },
    verifyBusiness(state, action) {
      state.isShowBusinessDialog = false;
      const business = state.businesses.find(
        (item) => item._id === action.payload.businessId
      );
      business.isVerified = action.payload.isVerified;
    },
    allowUser(state, action) {
      state.isShowUserDialog = false;
      const user = state.users.find(
        (item) => item._id === action.payload.userId
      );
      user.status = action.payload.status;
    },
    setBusinessPage(state, action) {
      state.businessPage = action.payload;
    },
    setUserPage(state, action) {
      state.userPage = action.payload;
    },
    setBusinessTotalItems(state, action) {
      state.businessTotalItems = action.payload;
    },
    setUserTotalItems(state, action) {
      state.userTotalItems = action.payload;
    },
    setBusinessQuery(state, action) {
      state.businessQuery = action.payload;
    },
    setUserQuery(state, action) {
      state.userQuery = action.payload;
    },
    setBusinessQueryTarget(state, action) {
      state.businessQueryTarget = action.payload;
    },
    setUserQueryTarget(state, action) {
      state.userQueryTarget = action.payload;
    },
    setShowBusinessDialog(state, action) {
      state.isShowBusinessDialog = action.payload;
    },
    setShowUserDialog(state, action) {
      state.isShowUserDialog = action.payload;
    },
    setShowTagDialog(state, action) {
      state.isShowTagDialog = action.payload;
    },
    setSelectedBusiness(state, action) {
      state.selectedBusiness = action.payload.business;
      state.isShowBusinessDialog = action.payload.status;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload.user;
      state.isShowUserDialog = action.payload.status;
    },
    setSelectedTag(state, action) {
      state.selectedTag = action.payload.tag;
      state.isShowTagDialog = action.payload.status;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice;
