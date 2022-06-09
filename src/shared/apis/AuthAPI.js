import requestAxios from "../../utils/requestAxios";

const login = async (email, password, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/login",
    { email, password },
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    console.log(response);
    callback(response.data);
  } else {
    errorCallback(response.data.message || "Failed to login");
  }
  return response;
};

const signup = async (data, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/signup",
    data,
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    console.log(response);
    callback(true);
  } else {
    errorCallback(response.data.message || "Failed to signup");
  }
  return response;
};

const resendConfirmation = async (email, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/sendVerification",
    { email },
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    console.log(response);
    callback("Email verification sent.");
  } else {
    errorCallback(response.data.message || "Failed to send verification");
  }
  return response;
};

const sendResetPassword = async (email, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/sendResetPassword",
    { email },
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    callback();
  } else {
    errorCallback(
      response.data.message || "Failed to send password reset link"
    );
  }
  return response;
};

const AuthAPI = {
  signup,
  login,
  resendConfirmation,
  sendResetPassword,
};

export default AuthAPI;
