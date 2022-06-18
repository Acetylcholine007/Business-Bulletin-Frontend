import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    accountType: null,
    firstname: null,
    lastname: null,
    contactNo: null,
    address: null,
    profileUri: null,
    tokenExpirationDate: null,
    isShowPasswordResetDialog: false,
    isShowResendVerification: false,
    isShowImagePickerDialog: false,
  },
  reducers: {
    setData(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.accountType = action.payload.accountType;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.contactNo = action.payload.contactNo;
      state.address = action.payload.address;
      state.profileUri = action.payload.profileUri;
      state.tokenExpirationDate = action.payload.tokenExpirationDate;
    },
    updateInfo(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.contactNo = action.payload.contactNo;
      state.address = action.payload.address;
      state.profileUri = action.payload.profileUri;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
