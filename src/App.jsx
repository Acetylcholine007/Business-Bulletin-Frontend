import { createTheme, ThemeProvider } from "@mui/material";
import { amber, green } from "@mui/material/colors";
import { useState } from "react";
import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import UserLayout from "./layouts/UserLayout";
import AuthContextProvider from "./shared/contexts/AuthContext";
import LoadingContextProvider from "./shared/contexts/LoadingContext";
import SnackbarContextProvider from "./shared/contexts/SnackbarContext";
import { useAuth } from "./shared/hooks/useAuth";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: amber,
  },
});

function App() {
  const {
    token,
    login,
    logout,
    updateLocalUserData,
    userId,
    accountType,
    contactNo,
    address,
    profileUri,
    firstname,
    lastname,
  } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <LoadingContextProvider>
          <AuthContextProvider
            value={{
              isLoggedIn: !!token,
              token,
              userId,
              accountType,
              firstname,
              lastname,
              contactNo,
              address,
              profileUri,
              updateLocalUserData,
              login,
              logout,
            }}
          >
            {!!token && accountType == 1 && <UserLayout />}
            {!!token && accountType == 2 && <AdminLayout />}
            {!token && <PublicLayout />}
          </AuthContextProvider>
        </LoadingContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
