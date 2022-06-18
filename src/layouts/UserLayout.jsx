import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountCircleOutlined,
  ChevronLeft,
  ChevronRight,
  LogoutSharp,
  Menu,
} from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme, alpha } from "@mui/material/styles";
import UserRoutes, { userRoutes } from "../routes/UserRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { feedbackActions } from "../store/slices/FeedbackSlice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const UserLayout = () => {
  const dispatch = useDispatch();
  const { firstname, lastname } = useSelector((state) => state.auth);
  const feedbackParams = useSelector((state) => state.feedback);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#FAF9F8",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Business Bulletin
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/profile")}
            startIcon={<AccountCircleOutlined />}
          >
            <Typography variant="body2" noWrap>
              {`${firstname} ${lastname}`}
            </Typography>
          </Button>
        </Toolbar>
        {feedbackParams.isLoading && <LinearProgress />}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {userRoutes.map((route) => (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              key={route.title}
            >
              <ListItemButton
                onClick={() => navigate(route.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.3),
                  },
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                  },
                }}
                selected={
                  location.pathname === "/"
                    ? location.pathname.startsWith(route.path)
                    : location.pathname === route.path
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => dispatch(logout(navigate))}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutSharp />
              </ListItemIcon>
              <ListItemText primary="Signout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <UserRoutes />
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
    </Box>
  );
};

export default UserLayout;
