import { useContext, useEffect, useRef, useState } from "react";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import TagAPI from "../../../shared/apis/TagAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const dashboardController = () => {
  const [businesses, setBusinesses] = useState(null);
  const [users, setUsers] = useState(null);
  const [tags, setTags] = useState(null);
  const [businessPage, setBusinessPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [businessTotalItems, setBusinessTotalItems] = useState(0);
  const [userTotalItems, setUserTotalItems] = useState(0);
  const [businessQuery, setBusinessQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [businessQueryTarget, setBusinessQueryTarget] = useState("Name");
  const [userQueryTarget, setUserQueryTarget] = useState("Name");
  const [businessDialogOpen, setBusinessDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const { loadingDispatch } = useContext(LoadingContext);
  const { snackbarDispatch } = useContext(SnackbarContext);

  useEffect(() => {
    TagAPI.getTags(loadingDispatch, snackbarDispatch, (data) => {
      setTags(data.tags);
    });
  }, []);

  useEffect(() => {
    BusinessAPI.getBusinesses(
      businessQuery,
      businessPage,
      businessQueryTarget.toLowerCase(),
      loadingDispatch,
      snackbarDispatch,
      (data) => {
        setBusinesses(data.businesses);
        setBusinessTotalItems(data.totalItems);
      }
    );
  }, [businessPage, businessQuery, businessQueryTarget]);

  useEffect(() => {
    UserAPI.getUsers(
      userQuery,
      userPage,
      userQueryTarget.toLowerCase(),
      loadingDispatch,
      snackbarDispatch,
      (data) => {
        setUsers(data.users);
        setUserTotalItems(data.totalItems);
      }
    );
  }, [userPage, userQuery, userQueryTarget]);

  const saveTagHandler = (tagId, name) => {
    if (tagId) {
      TagAPI.editTag(
        { name },
        loadingDispatch,
        snackbarDispatch,
        () => {},
        tagId
      );
    } else {
      TagAPI.createTag({ name }, loadingDispatch, snackbarDispatch, (tag) => {
        setTags([...tags, tag]);
      });
    }
  };

  const selectUserHandler = (user) => {
    setSelectedUser(user);
    setUserDialogOpen(true);
  };

  const closeUserHandler = () => {
    setUserDialogOpen(false);
    setSelectedUser(null);
  };

  const selectBusinessHandler = (business) => {
    setSelectedBusiness(business);
    setBusinessDialogOpen(true);
  };

  const closeBusinessHandler = () => {
    setBusinessDialogOpen(false);
    setSelectedBusiness(null);
  };

  const selectTagHandler = (tag) => {
    setSelectedTag(tag);
    setTagDialogOpen(true);
  };

  const closeTagHandler = () => {
    setTagDialogOpen(false);
    setSelectedTag(null);
  };

  return {
    businesses,
    users,
    tags,
    businessPage,
    setBusinessPage,
    userPage,
    setUserPage,
    businessTotalItems,
    userTotalItems,
    businessQuery,
    setBusinessQuery,
    userQuery,
    setUserQuery,
    businessQueryTarget,
    setBusinessQueryTarget,
    userQueryTarget,
    setUserQueryTarget,
    businessDialogOpen,
    userDialogOpen,
    tagDialogOpen,
    setTagDialogOpen,
    selectedBusiness,
    selectBusinessHandler,
    selectedUser,
    selectUserHandler,
    selectedTag,
    selectTagHandler,
    closeUserHandler,
    closeBusinessHandler,
    closeTagHandler,
    saveTagHandler
  };
};
