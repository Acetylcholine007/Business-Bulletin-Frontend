import BusinessAPI from "../../shared/apis/BusinessAPI";
import TagAPI from "../../shared/apis/TagAPI";
import UserAPI from "../../shared/apis/UserAPI";
import { dashboardActions } from "../slices/DashboardSlice";
import { feedbackActions } from "../slices/FeedbackSlice";

export const initializePage = (query, page, queryTarget) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const getTagTask = TagAPI.getTags();
    const getBusinessTask = BusinessAPI.getBusinesses(
      query,
      page,
      queryTarget,
      "Business"
    );
    const getUserTask = UserAPI.getUsers(query, page, queryTarget);
    const tagResponse = await getTagTask;
    const businessResponse = await getBusinessTask;
    const userResponse = await getUserTask;
    dispatch(feedbackActions.setLoading(false));
    if (
      tagResponse.status === 200 &&
      businessResponse.status === 200 &&
      userResponse.status === 200
    ) {
      dispatch(
        dashboardActions.initializePage({
          tags: tagResponse.tags,
          businesses: businessResponse.businesses,
          businessTotalItems: businessResponse.totalItems,
          users: userResponse.users,
          userTotalItems: userResponse.totalItems,
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Failed to fetch data",
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const fetchBusinesses = (query, page, queryTarget) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.getBusinesses(
      query,
      page,
      queryTarget,
      "Business"
    );
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        dashboardActions.setBusinesses({
          businesses: response.businesses,
          businessTotalItems: response.totalItems,
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const fetchUsers = (query, page, queryTarget) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await UserAPI.getUsers(query, page, queryTarget);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        dashboardActions.setUsers({
          users: response.users,
          userTotalItems: response.totalItems,
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const saveTag = (tagId, name) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    let response;
    if (tagId) {
      response = await TagAPI.editTag({ name }, tagId);
    } else {
      response = await TagAPI.createTag({ name });
    }
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      if (tagId) {
        dispatch(dashboardActions.editTag({ tagId, name }));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Tag edited",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      } else {
        dispatch(dashboardActions.addTag(response.tag));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Tag created",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      }
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const deleteTag = (tagId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await TagAPI.deleteTag(tagId);
    if (response.status === 200) {
      dispatch(dashboardActions.deleteTag(tagId));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Tag deleted",
          isShowSnackbar: true,
          severity: "success",
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
    dispatch(feedbackActions.setLoading(false));
  };
};

export const allowBusiness = (status, businessId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.allowBusiness(businessId, status);
    if (response.status === 200) {
      dispatch(dashboardActions.allowBusiness({ businessId, status }));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Business edited",
          isShowSnackbar: true,
          severity: "success",
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
    dispatch(feedbackActions.setLoading(false));
  };
};

export const verifyBusiness = (isVerified, businessId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.verifyBusiness(businessId, isVerified);
    if (response.status === 200) {
      dispatch(dashboardActions.verifyBusiness({ businessId, isVerified }));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Business edited",
          isShowSnackbar: true,
          severity: "success",
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
    dispatch(feedbackActions.setLoading(false));
  };
};

export const allowUser = (status, userId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await UserAPI.allowUser(userId, status);
    if (response.status === 200) {
      dispatch(dashboardActions.allowUser({ userId, status }));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "User edited",
          isShowSnackbar: true,
          severity: "success",
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
    dispatch(feedbackActions.setLoading(false));
  };
};
