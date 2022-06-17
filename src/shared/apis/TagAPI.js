import requestAxios from "../../utils/requestAxios";

const getTags = async () => {
  return await requestAxios(`/tags`);
};

const getTag = async (tagId) => {
  return await requestAxios(`/tags/${tagId}`);
};

const createTag = async (data) => {
  return await requestAxios(`/tags`, data, "POST", "application/json");
};

const editTag = async (data, tagId) => {
  return await requestAxios(
    `/tags/${tagId}`,
    data,
    "PATCH",
    "application/json"
  );
};

const deleteTag = async (tagId) => {
  return await requestAxios(`/tags/${tagId}`, {}, "DELETE");
};

const TagAPI = {
  getTags,
  getTag,
  createTag,
  editTag,
  deleteTag,
};

export default TagAPI;
