import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthAPI from "../../../shared/apis/AuthAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const signinController = () => {
  const auth = useContext(AuthContext);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const signinHandler = async (event) => {
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    event.preventDefault();
    const response = await AuthAPI.login(
      email,
      password,
      auth.login,
      (message) => {
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
    if (response.status === 403) {
      console.log("reached");
      setShowResendVerification(true);
    }
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
    history.push("/");
  };

  const verificationHandler = async () => {
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    await AuthAPI.resendConfirmation(
      email,
      (message) => {
        snackbarDispatch({
          type: "SET_PARAMS",
          payload: {
            message: message,
            isOpen: true,
            severity: "info",
          },
        });
      },
      (message) => {
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
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
  };

  const passwordResetHandler = async (email) => {
    handleClose();
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    const response = await AuthAPI.sendResetPassword(
      email,
      () => {
        snackbarDispatch({
          type: "SET_PARAMS",
          payload: {
            message: "Password reset link has been sent into your email.",
            isOpen: true,
            severity: "success",
          },
        });
      },
      (message) => {
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
    if (response.status === 403) {
      console.log("reached");
      setShowResendVerification(true);
    }
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
  };

  const handleOpen = (scrap) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (location.state?.toVerify) {
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: "Open verification email sent to you before logging in.",
          isOpen: true,
          severity: "info",
        },
      });
    }
  }, []);

  return {
    email,
    setEmail,
    password,
    open,
    setOpen,
    showResendVerification,
    setShowResendVerification,
    showPassword,
    setShowPassword,
    setPassword,
    signinHandler,
    verificationHandler,
    passwordResetHandler,
    handleOpen,
    handleClose,
    navigate,
  };
};
