import requestAxios from "../../utils/requestAxios";

const getServices = async (
  query,
  page,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  let response = await requestAxios(`/services?query=${query}&page=${page}`);
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Services Fetched",
        isOpen: true,
        severity: "success",
      },
    });
    callback(response.data);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get services",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getService = async (
  serviceId,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  let response = await requestAxios(`/services/${serviceId}`);
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Service Fetched",
        isOpen: true,
        severity: "success",
      },
    });
    callback(response.data);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get service",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const createService = async (
  data,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/services/${data}`,
    data,
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Service created",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to create service",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const editService = async (
  data,
  loadingDispatch,
  snackbarDispatch,
  callback,
  serviceId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/services/${serviceId}`,
    data,
    "PATCH",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Service Edited",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit service",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const deleteService = async (
  loadingDispatch,
  snackbarDispatch,
  callback,
  serviceId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/services/${serviceId}`, {}, "DELETE");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Service deleted",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to delete service",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const ServiceAPI = {
  getServices,
  getService,
  createService,
  editService,
  deleteService,
};

export default ServiceAPI;
