import requestAxios from "../../utils/requestAxios";

const getBusinesses = async (
  query,
  page,
  queryTarget,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  let response = await requestAxios(
    `/businesses?query=${query}&page=${page}&queryTarget=${queryTarget}`
  );
  if (response.status === 200) {
    callback(response);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get businesses",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getUserBusinesses = async (
  query,
  page,
  queryTarget,
  loadingDispatch,
  snackbarDispatch,
  callback,
  userId
) => {
  let response = await requestAxios(
    `/businesses/user/${userId}?query=${query}&page=${page}&queryTarget=${queryTarget}`
  );
  if (response.status === 200) {
    callback(response);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get businesses",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getBusiness = async (
  businessId,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  let response = await requestAxios(`/businesses/${businessId}`);
  if (response.status === 200) {
    // snackbarDispatch({
    //   type: "SET_PARAMS",
    //   payload: {
    //     message: "Business Fetched",
    //     isOpen: true,
    //     severity: "success",
    //   },
    // });
    callback(response);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get business",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const createBusiness = async (
  data,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/businesses/${userId}`,
    data,
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Business Edited",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to create business",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const editBusiness = async (
  data,
  loadingDispatch,
  snackbarDispatch,
  callback,
  businessId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/businesses/${businessId}`,
    data,
    "PATCH",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Business Edited",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit business",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const verifyBusiness = async (
  loadingDispatch,
  snackbarDispatch,
  callback,
  businessId,
  isVerified
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/businesses/verify/${businessId}`,
    { isVerified },
    "PATCH"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Business updated",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to update business",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const allowBusiness = async (
  loadingDispatch,
  snackbarDispatch,
  callback,
  businessId,
  status
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/businesses/verify/${businessId}`,
    { status },
    "PATCH"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Business updated",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to update business",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const deleteBusiness = async (
  loadingDispatch,
  snackbarDispatch,
  callback,
  businessId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/businesses/${businessId}`, {}, "DELETE");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Business deleted",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to delete business",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const BusinessAPI = {
  getBusinesses,
  getUserBusinesses,
  getBusiness,
  createBusiness,
  verifyBusiness,
  allowBusiness,
  editBusiness,
  deleteBusiness,
};

export default BusinessAPI;
