import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LS_USER_DATA } from "../../utils/constants";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [address, setAddress] = useState(null);
  const [profileUri, setProfileUri] = useState(null);
  const [accountType, setAccountType] = useState(1);
  const navigate = useNavigate();

  const updateLocalUserData = (
    newFirstName,
    newLastName,
    newContactNo,
    newAddress,
    newProfileUri
  ) => {
    setFirstname(newFirstName);
    setLastname(newLastName);
    setContactNo(newContactNo);
    setAddress(newAddress);
    setProfileUri(newProfileUri);
    localStorage.setItem(
      LS_USER_DATA,
      JSON.stringify({
        userId,
        token,
        firstname: newFirstName,
        lastname: newLastName,
        contactNo: newContactNo,
        address: newAddress,
        profileUri: newProfileUri,
        expirationDate: tokenExpirationDate.toISOString(),
        accountType,
      })
    );
  };

  const login = useCallback(
    ({
      userId,
      token,
      firstname,
      lastname,
      contactNo,
      address,
      profileUri,
      accountType,
      expirationDate,
    }) => {
      let TOKEN_EXPIRATION = new Date(new Date().getTime() + 1000 * 60 * 60);
      const tokenExpirationDate = !!expirationDate
        ? expirationDate < new Date()
          ? TOKEN_EXPIRATION
          : expirationDate
        : TOKEN_EXPIRATION;
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        LS_USER_DATA,
        JSON.stringify({
          userId,
          token,
          firstname,
          lastname,
          contactNo,
          address,
          profileUri,
          expirationDate: tokenExpirationDate.toISOString(),
          accountType,
        })
      );
      setUserId(userId);
      setLastname(lastname);
      setFirstname(firstname);
      setContactNo(contactNo);
      setAddress(address);
      setProfileUri(profileUri);
      setToken(token);
      setAccountType(accountType);
      navigate("/");
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setFirstname(null);
    setLastname(null);
    setContactNo(null);
    setAddress(null);
    setProfileUri(null);
    localStorage.removeItem(LS_USER_DATA);
    navigate("/");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LS_USER_DATA));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      login({
        userId: storedData.userId,
        token: storedData.token,
        firstname: storedData.firstname,
        lastname: storedData.lastname,
        contactNo: storedData.contactNo,
        address: storedData.address,
        profileUri: storedData.profileUri,
        accountType: storedData.accountType,
        expirationDate: new Date(storedData.expirationDate),
      });
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    userId,
    contactNo,
    address,
    profileUri,
    lastname,
    firstname,
    accountType,
    updateLocalUserData,
  };
};
