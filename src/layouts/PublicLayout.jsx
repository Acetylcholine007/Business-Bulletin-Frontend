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
import { useNavigate } from "react-router-dom";
import PublicRoutes from "../routes/PublicRoutes";
import { useSelector, useDispatch } from "react-redux";
import { feedbackActions } from "../store/slices/FeedbackSlice";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const feedbackParams = useSelector((state) => state.feedback);
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
        {feedbackParams.isLoading && <LinearProgress />}
      </AppBar>
      <Toolbar />
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        <PublicRoutes />
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={feedbackParams.isShowSnackbar}
        autoHideDuration={feedbackParams.snackbarDuration}
        onClose={() => dispatch(feedbackActions.closeNotification())}
      >
        <Alert
          onClose={() => dispatch(feedbackActions.closeNotification())}
          severity={feedbackParams.severity}
          variant="filled"
        >
          {feedbackParams.snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PublicLayout;
