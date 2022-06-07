import {
  Alert,
  AppBar,
  Box,
  Button,
  ButtonBase,
  CssBaseline,
  LinearProgress,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PublicRoutes from "../routes/PublicRoutes";
import { LoadingContext } from "../shared/contexts/LoadingContext";
import { SnackbarContext } from "../shared/contexts/SnackbarContext";

const PublicLayout = () => {
  const { loadingParams } = useContext(LoadingContext);
  const { snackbarParams, snackbarDispatch } = useContext(SnackbarContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FAF9F8",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ButtonBase onClick={() => navigate("/")} sx={{ height: "100%" }}>
            <Typography variant="h5">Business Bulletin</Typography>
          </ButtonBase>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/signin")}
            >
              SIGN IN
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </Button>
          </Stack>
        </Toolbar>
        {loadingParams.isOpen && <LinearProgress />}
      </AppBar>
      <Toolbar />
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        <PublicRoutes />
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarParams.vertical,
          horizontal: snackbarParams.horizontal,
        }}
        open={snackbarParams.isOpen}
        autoHideDuration={snackbarParams.duration}
        onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
      >
        <Alert
          onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
          severity={snackbarParams.severity}
          variant="filled"
        >
          {snackbarParams.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PublicLayout;
