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
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { userId } = useContext(AuthContext);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    UserAPI.getUser(userId, loadingDispatch, snackbarDispatch, (data) => {
      setUser(data.user);
    });
  }, []);

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

  const changePasswordHandler = async (newPassword) => {
    console.log(newPassword);
  };

  const changeProfileHandler = async (newProfileUri) => {
    console.log(newProfileUri);
  };

  return {
    businesses,
    page,
    setPage,
    totalItems,
    editMode,
    setEditMode,
    user,
    openEditPassword,
    setOpenEditPassword,
    openEditProfile,
    setOpenEditProfile,
    selectedIndex,
    setSelectedIndex,
    navigate,
    changePasswordHandler,
    changeProfileHandler,
  };
};
