import requestAxios from "../../utils/requestAxios";

const getTags = async (loadingDispatch, snackbarDispatch, callback) => {
  let response = await requestAxios(`/tags`);
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Tags Fetched",
        isOpen: true,
        severity: "success",
      },
    });
    callback(response.data);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get tags",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getTag = async (tagId, loadingDispatch, snackbarDispatch, callback) => {
  let response = await requestAxios(`/tags/${tagId}`);
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Tag Fetched",
        isOpen: true,
        severity: "success",
      },
    });
    callback(response.data);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get tag",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const createTag = async (data, loadingDispatch, snackbarDispatch, callback) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/tags/${data}`,
    data,
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Tag created",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to create tag",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const editTag = async (
  data,
  loadingDispatch,
  snackbarDispatch,
  callback,
  tagId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/tags/${tagId}`,
    data,
    "PATCH",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Tag Edited",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit tag",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const deleteTag = async (
  loadingDispatch,
  snackbarDispatch,
  callback,
  tagId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/tags/${tagId}`, {}, "DELETE");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Tag deleted",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to delete tag",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const TagAPI = {
  getTags,
  getTag,
  createTag,
  editTag,
  deleteTag,
};

export default TagAPI;
