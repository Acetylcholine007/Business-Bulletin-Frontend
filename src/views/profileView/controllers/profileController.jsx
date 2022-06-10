import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const profileController = () => {
  const [businesses, setBusinesses] = useState();
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const menuHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { userId } = useContext(AuthContext);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    BusinessAPI.getUserBusinesses(
      "",
      page,
      "",
      loadingDispatch,
      snackbarDispatch,
      (data) => {
        setBusinesses(data.businesses);
        setTotalItems(data.totalItems);
      },
      userId
    );
  }, []);

  return {
    businesses,
    page,
    totalItems,
    editMode,
    setEditMode,
    anchorEl,
    setAnchorEl,
    open,
    menuHandler,
    handleClose,
    selectedIndex,
    setSelectedIndex,
    user,
    navigate,
  };
};
