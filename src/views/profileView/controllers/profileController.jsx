import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../../shared/apis/UserAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const profileController = () => {
  const [businesses, setBusinesses] = useState();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const menuHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return {
    businesses,
    user,
    setUser,
    editMode,
    setEditMode,
    anchorEl,
    setAnchorEl,
    open,
    menuHandler,
    handleClose,
    selectedIndex,
    setSelectedIndex,
    navigate,
  };
};
