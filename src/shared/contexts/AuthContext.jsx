import React, { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  accountType: null,
  firstname: null,
  lastname: null,
  contactNo: null,
  defaultBuoy: null,
  updateLocalUserData: null,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
