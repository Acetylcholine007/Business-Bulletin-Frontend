import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LS_USER_DATA } from "../../utils/constants";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [defaultBuoy, setDefaultBuoy] = useState(null);
  const [accountType, setAccountType] = useState(1);
  const history = useHistory();

  const updateLocalUserData = (newFirstName, newLastName, newContactNo) => {
    setFirstname(newFirstName);
    setLastname(newLastName);
    setContactNo(newContactNo);
    localStorage.setItem(
      LS_USER_DATA,
      JSON.stringify({
        userId,
        token,
        firstname: newFirstName,
        lastname: newLastName,
        contactNo: newContactNo,
        defaultBuoy,
        expiration: tokenExpirationDate.toISOString(),
        accountType,
      })
    );
  };

  const login = useCallback(
    (
      uid,
      token,
      firstname,
      lastname,
      contactNo,
      buoy,
      accType,
      expirationDate
    ) => {
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
          userId: uid,
          token,
          firstname,
          lastname,
          contactNo,
          defaultBuoy: buoy,
          expiration: tokenExpirationDate.toISOString(),
          accountType: accType,
        })
      );
      setUserId(uid);
      setLastname(lastname);
      setFirstname(firstname);
      setContactNo(contactNo);
      setDefaultBuoy(buoy);
      setToken(token);
      setAccountType(accType);
      history.push("/");
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
    setDefaultBuoy(null);
    localStorage.removeItem(LS_USER_DATA);
    history.push("/");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      console.log(tokenExpirationDate.getTime());
      console.log(new Date().getTime());
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
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.firstname,
        storedData.lastname,
        storedData.contactNo,
        storedData.defaultBuoy,
        storedData.accountType,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    userId,
    contactNo,
    defaultBuoy,
    lastname,
    firstname,
    accountType,
    updateLocalUserData,
  };
};
