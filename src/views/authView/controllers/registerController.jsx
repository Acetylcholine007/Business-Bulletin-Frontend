import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../../shared/apis/AuthAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const registerController = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  const registerHandler = async (event) => {
    event.preventDefault();
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    await AuthAPI.signup(
      { firstname, lastname, contactNo, email, password },
      (isSuccess) => {
        loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
        navigate({ pathname: "/login", state: { toVerify: isSuccess } });
      },
      (message) => {
        loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
        snackbarDispatch({
          type: "SET_PARAMS",
          payload: {
            message: message,
            isOpen: true,
            severity: "error",
          },
        });
      }
    );
  };

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    contactNo,
    setContactNo,
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    registerHandler,
    navigate,
  };
};
