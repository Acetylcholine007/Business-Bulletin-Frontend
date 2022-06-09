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
  const { token, login, logout, userId, accountType, firstname, lastname } =
    useAuth();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <LoadingContextProvider>
          <AuthContextProvider
            value={{
              isLoggedIn: !!token,
              token: token,
              userId: userId,
              accountType: accountType,
              firstname: firstname,
              lastname: lastname,
              login: login,
              logout: logout,
            }}
          >
            {/* {!!token && accountType == 1 && <UserLayout />}
            {!!token && accountType == 2 && <AdminLayout />}
            {!token && <PublicLayout />} */}
            <AdminLayout />
          </AuthContextProvider>
        </LoadingContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
