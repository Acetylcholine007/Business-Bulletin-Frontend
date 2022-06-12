import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const profileController = () => {
  const auth = useContext(AuthContext);
  const [businesses, setBusinesses] = useState();
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [firstname, setFirstname] = useState(auth.firstname);
  const [lastname, setLastname] = useState(auth.lastname);
  const [contactNo, setContactNo] = useState(auth.contactNo);
  const [address, setAddress] = useState(auth.address);
  const [profileUri, setProfileUri] = useState(auth.profileUri);
  const [newFirstname, setNewFirstname] = useState(auth.firstname);
  const [newLastname, setNewLastname] = useState(auth.lastname);
  const [newContactNo, setNewContactNo] = useState(auth.contactNo);
  const [newAddress, setNewAddress] = useState(auth.address);
  const [newProfileUri, setNewProfileUri] = useState(auth.profileUri);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    UserAPI.getUser(
      auth.userId,
      loadingDispatch,
      snackbarDispatch,
      ({ user }) => {
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setContactNo(user.contactNo);
        setAddress(user.address);
        setProfileUri(user.profileUri);
        setNewFirstname(user.firstname);
        setNewLastname(user.lastname);
        setNewContactNo(user.contactNo);
        setNewAddress(user.address);
        setNewProfileUri(user.profileUri);
      }
    );
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
      auth.userId
    );
  }, []);

  const changePasswordHandler = async (password) => {
    UserAPI.changePassword(
      password,
      loadingDispatch,
      snackbarDispatch,
      auth.userId
    );
  };

  const changeProfileHandler = async (newProfileUri) => {
    setNewProfileUri(newProfileUri);
  };

  const editProfileHandler = async () => {
    UserAPI.editUser(
      {
        firstname: newFirstname,
        lastname: newLastname,
        contactNo: newContactNo,
        address: newAddress,
        profileUri: newProfileUri,
      },
      loadingDispatch,
      snackbarDispatch,
      () => {
        setFirstname(newFirstname);
        setLastname(newLastname);
        setContactNo(newContactNo);
        setAddress(newAddress);
        setProfileUri(newProfileUri);
        auth.updateLocalUserData(
          newFirstname,
          newLastname,
          newContactNo,
          newAddress,
          newProfileUri
        );
      },
      auth.userId
    );
  };

  return {
    businesses,
    page,
    setPage,
    totalItems,
    editMode,
    setEditMode,
    firstname,
    lastname,
    contactNo,
    address,
    profileUri,
    newFirstname,
    newLastname,
    newAddress,
    newContactNo,
    newProfileUri,
    setNewFirstname,
    setNewLastname,
    setNewContactNo,
    setNewAddress,
    openEditPassword,
    setOpenEditPassword,
    openEditProfile,
    setOpenEditProfile,
    selectedIndex,
    setSelectedIndex,
    navigate,
    changePasswordHandler,
    changeProfileHandler,
    editProfileHandler,
  };
};
