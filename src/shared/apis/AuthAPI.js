import requestAxios from "../../utils/requestAxios";

const login = async (email, password) => {
  return await requestAxios(
    "/auth/login",
    { email, password },
    "POST",
    "application/json"
  );
};

const signup = async (data) => {
  return await requestAxios("/auth/signup", data, "POST", "application/json");
};

const resendConfirmation = async (email) => {
  return await requestAxios(
    "/auth/sendVerification",
    { email },
    "POST",
    "application/json"
  );
};

const sendResetPassword = async (email) => {
  return await requestAxios(
    "/auth/sendResetPassword",
    { email },
    "POST",
    "application/json"
  );
};

const AuthAPI = {
  signup,
  login,
  resendConfirmation,
  sendResetPassword,
};

export default AuthAPI;
