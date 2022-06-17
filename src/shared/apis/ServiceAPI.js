import requestAxios from "../../utils/requestAxios";

const getServices = async (query, page) => {
  return await requestAxios(`/services?query=${query}&page=${page}`);
};

const getService = async (serviceId) => {
  return await requestAxios(`/services/${serviceId}`);
};

const createService = async (data) => {
  return await requestAxios(`/services`, data, "POST", "application/json");
};

const editService = async (data, serviceId) => {
  return await requestAxios(
    `/services/${serviceId}`,
    data,
    "PATCH",
    "application/json"
  );
};

const deleteService = async (serviceId) => {
  return await requestAxios(`/services/${serviceId}`, {}, "DELETE");
};

const ServiceAPI = {
  getServices,
  getService,
  createService,
  editService,
  deleteService,
};

export default ServiceAPI;
