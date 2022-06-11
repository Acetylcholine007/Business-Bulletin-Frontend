import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../../shared/apis/AuthAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const registerController = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profileUri, setProfileUri] = useState(
    "data:image/png;base64,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"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [openProfilePicker, setOpenProfilePicker] = useState(false);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  const registerHandler = async (event) => {
    event.preventDefault();
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    await AuthAPI.signup(
      { firstname, lastname, contactNo, address, email, password, profileUri },
      (isSuccess) => {
        loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
        navigate("/signin", { state: { toVerify: isSuccess } });
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
    address,
    setAddress,
    password,
    setPassword,
    email,
    setEmail,
    profileUri,
    setProfileUri,
    showPassword,
    setShowPassword,
    registerHandler,
    navigate,
    openProfilePicker,
    setOpenProfilePicker,
  };
};
