import { CancelSharp, EditSharp, SaveSharp } from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import {
  changePassword,
  deleteBusiness,
  editProfile,
  fetchBusinesses,
} from "../../../store/actions/profileActions";
import { feedbackActions } from "../../../store/slices/FeedbackSlice";
import { profileActions } from "../../../store/slices/ProfileSlice";
import PasswordEditorDialog from "../components/PasswordEditorDialog";

const ProfilePage = () => {
  const { userId, firstname, lastname, address, contactNo } = useSelector(
    (state) => state.auth
  );
  const {
    businesses,
    profileEditMode,
    newUser,
    user,
    page,
    isShowPasswordDialog,
    isShowImageDialog,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    profileActions.setUser({ userId, firstname, lastname, address, contactNo });
    profileActions.setNewUser({
      userId,
      firstname,
      lastname,
      address,
      contactNo,
    });
  }, []);

  useEffect(() => {
    dispatch(fetchBusinesses(page, userId));
  }, []);

  return (
    <Container
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Card sx={{ p: 2 }} elevation={4} align="center">
            <CardHeader
              title={
                <Typography variant="h6" align="left">
                  User Profile
                </Typography>
              }
              action={
                profileEditMode ? (
                  <>
                    <IconButton
                      onClick={() =>
                        dispatch(profileActions.setProfileEditMode(false))
                      }
                    >
                      <CancelSharp />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(profileActions.setProfileEditMode(false));
                        dispatch(editProfile(newUser, userId));
                      }}
                    >
                      <SaveSharp />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() =>
                      dispatch(profileActions.setProfileEditMode(true))
                    }
                  >
                    <EditSharp />
                  </IconButton>
                )
              }
            />
            {!profileEditMode && (
              <>
                <img
                  src={user.profileUri}
                  alt="Profile Photo"
                  style={{
                    height: "12rem",
                    width: "12rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="h6">{`${user.firstname} ${user.lastname}`}</Typography>
                <Typography variant="h6">{`${user.address}`}</Typography>
                <Typography variant="h6">{`${user.contactNo}`}</Typography>
              </>
            )}
            {profileEditMode && (
              <>
                <ButtonBase
                  onClick={() =>
                    dispatch(profileActions.setOpenEditProfile(true))
                  }
                  sx={{
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={newUser.profileUri}
                    alt="Profile Photo"
                    style={{
                      height: "12rem",
                      width: "12rem",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </ButtonBase>
                <TextField
                  disable={true}
                  label="First Name"
                  type="text"
                  variant="filled"
                  onChange={(e) =>
                    dispatch(
                      profileActions.editNewUser({
                        field: "firstname",
                        value: e.target.value,
                      })
                    )
                  }
                  value={newUser.firstname}
                  fullWidth={true}
                  siz="small"
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="Last Name"
                  type="text"
                  variant="filled"
                  onChange={(e) =>
                    dispatch(
                      profileActions.editNewUser({
                        field: "lastname",
                        value: e.target.value,
                      })
                    )
                  }
                  value={newUser.lastname}
                  fullWidth={true}
                  siz="small"
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="Address"
                  type="text"
                  variant="filled"
                  onChange={(e) =>
                    dispatch(
                      profileActions.editNewUser({
                        field: "address",
                        value: e.target.value,
                      })
                    )
                  }
                  value={newUser.address}
                  fullWidth={true}
                  siz="small"
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="Contact No."
                  type="text"
                  variant="filled"
                  onChange={(e) =>
                    dispatch(
                      profileActions.editNewUser({
                        field: "contactNo",
                        value: e.target.value,
                      })
                    )
                  }
                  value={newUser.contactNo}
                  fullWidth={true}
                  siz="small"
                  margin="normal"
                />
              </>
            )}
            <Divider sx={{ margin: 2 }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Button
                variant="contained"
                onClick={() =>
                  dispatch(profileActions.setShowPasswordDialog(true))
                }
              >
                Change Password
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(feedbackActions.setLoading(true));
                  dispatch(
                    profileActions.setBusiness({
                      products: [],
                      services: [],
                      tags: [],
                      credentials: [],
                    })
                  );
                  navigate("/profile/businesses/new");
                }}
              >
                Create New Business
              </Button>
            </Stack>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{ height: "100%", display: { xs: "none", md: "block" } }}
        >
          <List
            disablePadding
            sx={{
              height: "100%",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            {businesses &&
              businesses.map((business, index) => (
                <Card sx={{ marginBottom: 2 }} key={index} elevation={4}>
                  <ListItemButton
                    sx={{
                      display: "block",
                      "&.Mui-selected": {
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: 1,
                      },
                    }}
                    onClick={() => {
                      dispatch(feedbackActions.setLoading(true));
                      dispatch(profileActions.setBusiness(business));
                      navigate(`/profile/businesses/${business._id}/edit`);
                    }}
                  >
                    <Typography variant="h5">{business.name}</Typography>
                    <Divider />
                    <Typography variant="p">{business.description}</Typography>
                    <CardActions
                      disableSpacing
                      sx={{ justifyContent: "flex-end" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteBusiness(business._id));
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </ListItemButton>
                </Card>
              ))}
          </List>
        </Grid>
      </Grid>
      <PasswordEditorDialog
        open={isShowPasswordDialog}
        handleClose={() =>
          dispatch(profileActions.setShowPasswordDialog(false))
        }
        saveHandler={(password) => dispatch(changePassword(password, userId))}
      />
      <ImagePickerDialog
        open={isShowImageDialog}
        handleClose={() => dispatch(profileActions.setShowImageDialog(false))}
        saveHandler={(val) =>
          dispatch(
            profileActions.editNewUser({
              field: "profileUri",
              value: val,
            })
          )
        }
        imageUri={newUser.profileUri}
      />
    </Container>
  );
};

export default ProfilePage;
