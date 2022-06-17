import requestAxios from "../../utils/requestAxios";

const getBusinesses = async (query, page, queryTarget) => {
  return await requestAxios(
    `/businesses?query=${query}&page=${page}&target=${queryTarget}`
  );
};

const getUserBusinesses = async (query, page, queryTarget, userId) => {
  return await requestAxios(
    `/businesses/user/${userId}?query=${query}&page=${page}&target=${queryTarget}`
  );
};

const getBusiness = async (businessId) => {
  return await requestAxios(`/businesses/${businessId}`);
};

const createBusiness = async (data) => {
  return await requestAxios(`/businesses`, data, "POST", "application/json");
};

const editBusiness = async (data, businessId) => {
  return await requestAxios(
    `/businesses/${businessId}`,
    data,
    "PATCH",
    "application/json"
  );
};

const verifyBusiness = async (businessId, isVerified) => {
  return await requestAxios(
    `/businesses/verifyBusiness/${businessId}`,
    { isVerified },
    "PATCH"
  );
};

const allowBusiness = async (businessId, status) => {
  return await requestAxios(
    `/businesses/allowBusiness/${businessId}`,
    { status },
    "PATCH"
  );
};

const deleteBusiness = async (businessId) => {
  return await requestAxios(`/businesses/${businessId}`, {}, "DELETE");
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
