import requestAxios from "../../utils/requestAxios";

const getUsers = async (
  query,
  page,
  queryTarget,
  loadingDispatch,
  snackbarDispatch,
  callback
) => {
  let response = await requestAxios(
    `/users?query=${query}&page=${page}&queryTarget=${queryTarget}`
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Users Fetched",
        isOpen: true,
        severity: "success",
      },
    });
    callback(response);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get users",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getUser = async (userId, loadingDispatch, snackbarDispatch, callback) => {
  let response = await requestAxios(`/users/${userId}`);
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "User Fetched",
        isOpen: true,
        severity: "success",
      },
    });
    callback(response);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get user",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const editUser = async (
  data,
  loadingDispatch,
  snackbarDispatch,
  callback,
  userId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/users/${userId}`,
    data,
    "PATCH",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Account Edited",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit user",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const changePassword = async (
  password,
  loadingDispatch,
  snackbarDispatch,
  userId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/users/changePassword/${userId}`,
    { password },
    "PATCH",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Password Edited",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit password",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const allowUser = async (userId, loadingDispatch, snackbarDispatch, status) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(
    `/users/allowUser/${userId}`,
    { status },
    "PATCH",
    "application/json"
  );
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "User edited",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit user",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const deleteUser = async (userId, loadingDispatch, snackbarDispatch) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/users/${userId}`, {}, "DELETE");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "User deleted",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to delete user",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const UserAPI = {
  getUsers,
  getUser,
  editUser,
  changePassword,
  allowUser,
  deleteUser,
};

export default UserAPI;
