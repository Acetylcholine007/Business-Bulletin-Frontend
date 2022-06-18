import BusinessAPI from "../../shared/apis/BusinessAPI";
import TagAPI from "../../shared/apis/TagAPI";
import { businessActions } from "../slices/BusinessSlice";
import { feedbackActions } from "../slices/FeedbackSlice";

export const initializePage = (query, page, queryTarget, entity) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const getTagTask = TagAPI.getTags();
    const getBusinessTask = BusinessAPI.getBusinesses(
      query,
      page,
      queryTarget,
      entity
    );
    const tagResponse = await getTagTask;
    const businessResponse = await getBusinessTask;
    dispatch(feedbackActions.setLoading(false));
    if (tagResponse.status === 200 && businessResponse.status === 200) {
      dispatch(
        businessActions.initializePage({
          tags: tagResponse.tags,
          businesses: businessResponse.businesses,
          totalItems: businessResponse.totalItems,
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

export const fetchBusinesses = (query, page, queryTarget, entity) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.getBusinesses(
      query,
      page,
      queryTarget,
      entity
    );
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        businessActions.setBusinesses({
          businesses: response.businesses,
          totalItems: response.totalItems,
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
