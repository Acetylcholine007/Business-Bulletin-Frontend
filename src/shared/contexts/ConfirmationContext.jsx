import React, { createContext, useReducer } from "react";

export const ConfirmationContext = createContext();

const ConfirmationContextProvider = ({ children, value }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PARAMS":
        return { ...state, ...action.payload };
      case "CLOSE":
        return { ...state, title: "", message: "", isOpen: false };
      default:
        return state;
    }
  };

  const [snackbarParams, snackbarDispatch] = useReducer(reducer, {
    title: "",
    message: "",
    isOpen: false,
    operation: () => {},
  });

  return (
    <ConfirmationContext.Provider value={{ snackbarParams, snackbarDispatch }}>
      {children}
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationContextProvider;
