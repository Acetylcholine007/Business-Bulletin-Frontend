import { useContext, useEffect, useRef, useState } from "react";
import BusinessAPI from "../../../shared/apis/BusinessAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import TagAPI from "../../../shared/apis/TagAPI";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

export const dashboardController = () => {
  const [businesses, setBusinesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [businessPage, setBusinessPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [businessTotalItems, setBusinessTotalItems] = useState(0);
  const [userTotalItems, setUserTotalItems] = useState(0);
  const [businessQuery, setBusinessQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [businessQueryTarget, setBusinessQueryTarget] = useState("Name");
  const [userQueryTarget, setUserQueryTarget] = useState("Name");
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
  };
};
