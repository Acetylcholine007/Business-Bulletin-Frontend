import requestAxios from "../../utils/requestAxios";

const getUsers = async (query, page, queryTarget) => {
  return await requestAxios(
    `/users?query=${query}&page=${page}&target=${queryTarget.toLowerCase()}`
  );
};

const getUser = async (userId) => {
  return await requestAxios(`/users/${userId}`);
};

const editUser = async (data, userId) => {
  return await requestAxios(
    `/users/${userId}`,
    data,
    "PATCH",
    "application/json"
  );
};

const changePassword = async (password, userId) => {
  return await requestAxios(
    `/users/changePassword/${userId}`,
    { password },
    "PATCH",
    "application/json"
  );
};

const allowUser = async (userId, status) => {
  return await requestAxios(
    `/users/allowUser/${userId}`,
    { status },
    "PATCH",
    "application/json"
  );
};

const deleteUser = async (userId) => {
  return await requestAxios(`/users/${userId}`, {}, "DELETE");
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
