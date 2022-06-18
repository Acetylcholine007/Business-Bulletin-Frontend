import BusinessAPI from "../../shared/apis/BusinessAPI";
import ProductAPI from "../../shared/apis/ProductAPI";
import ServiceAPI from "../../shared/apis/ServiceAPI";
import UserAPI from "../../shared/apis/UserAPI";
import TagAPI from "../../shared/apis/TagAPI";
import { authActions } from "../slices/AuthSlice";
import { feedbackActions } from "../slices/FeedbackSlice";
import { profileActions } from "../slices/ProfileSlice";

export const fetchBusinesses = (page, userId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.getUserBusinesses("", page, "", userId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        profileActions.setBusinesses({
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

export const fetchTags = () => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await TagAPI.getTags();
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(profileActions.setTags(response.tags));
      dispatch(profileActions.extractSelectedTags());
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

export const changePassword = (password, userId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await UserAPI.changePassword(password, userId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Password changed",
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
  };
};

export const editProfile = (newUser, userId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await UserAPI.editUser(newUser, userId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(authActions.updateInfo(newUser));
      dispatch(profileActions.setUser(newUser));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Profile updated",
          isShowSnackbar: true,
          severity: "success",
        })
      );
    } else {
      dispatch(profileActions.revertNewUser());
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

export const deleteBusiness = (businessId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.deleteBusiness(businessId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(profileActions.removeBusiness(businessId));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Business removed",
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
  };
};

export const createBusiness = (business, navigate) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.createBusiness(business);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(profileActions.setBusiness(null));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Business created",
          isShowSnackbar: true,
          severity: "success",
        })
      );
      navigate("/profile");
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

export const editBusiness = (business, navigate) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await BusinessAPI.editBusiness(business, business._id);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(profileActions.setBusiness(null));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Business edited",
          isShowSnackbar: true,
          severity: "success",
        })
      );
      navigate("/profile");
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

export const creatorSaveProduct = (isNew, product) => {
  return (dispatch) => {
    if (isNew) {
      dispatch(profileActions.addProduct(product));
    } else {
      dispatch(profileActions.editProduct(product));
    }
  };
};

export const creatorSaveService = (isNew, service) => {
  return (dispatch) => {
    if (isNew) {
      dispatch(profileActions.addService(service));
    } else {
      dispatch(profileActions.editService(service));
    }
  };
};

export const editorSaveProduct = (isNew, product) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    let response;
    if (isNew) {
      response = await ProductAPI.createProduct(product);
    } else {
      response = await ProductAPI.editProduct(product, product._id);
    }
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      if (isNew) {
        dispatch(profileActions.addProduct(product));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Product added",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      } else {
        dispatch(
          profileActions.editProduct({ productId: product._id, product })
        );
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Product edited",
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

export const deleteProduct = (isNew, productId) => {
  return async (dispatch) => {
    if (!isNew) {
      dispatch(feedbackActions.setLoading(true));
      const response = await ProductAPI.deleteProduct(productId);
      dispatch(feedbackActions.setLoading(false));
      if (response.status === 200) {
        dispatch(profileActions.removeProduct(productId));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Product removed",
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
    } else {
      dispatch(profileActions.removeProduct(productId));
    }
  };
};

export const editorSaveService = (isNew, service) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    let response;
    if (isNew) {
      response = await ServiceAPI.createService(service);
    } else {
      response = await ServiceAPI.editService(service, service._id);
    }
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      if (isNew) {
        dispatch(profileActions.addService(service));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Service added",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      } else {
        dispatch(
          profileActions.editService({ serviceId: service._id, service })
        );
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Service edited",
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

export const deleteService = (isNew, serviceId) => {
  return async (dispatch) => {
    if (!isNew) {
      dispatch(feedbackActions.setLoading(true));
      const response = await ServiceAPI.deleteService(serviceId);
      dispatch(feedbackActions.setLoading(false));
      if (response.status === 200) {
        dispatch(profileActions.removeService(serviceId));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Service removed",
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
    } else {
      dispatch(profileActions.removeService(serviceId));
    }
  };
};
