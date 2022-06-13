import {
  CancelSharp,
  EditSharp,
  MoreVertSharp,
  SaveSharp,
  VerifiedSharp,
} from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardHeader,
  Chip,
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
import React, { useState } from "react";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import PasswordEditorDialog from "../components/PasswordEditorDialog";
import { profileController } from "../controllers/profileController";

const ProfilePage = () => {
  const {
    businesses,
    page,
    setPage,
    totalItems,
    editMode,
    setEditMode,
    firstname,
    lastname,
    contactNo,
    address,
    profileUri,
    newFirstname,
    newLastname,
    newAddress,
    newContactNo,
    newProfileUri,
    setNewFirstname,
    setNewLastname,
    setNewContactNo,
    setNewAddress,
    openEditPassword,
    setOpenEditPassword,
    openEditProfile,
    setOpenEditProfile,
    selectedIndex,
    setSelectedIndex,
    navigate,
    changePasswordHandler,
    changeProfileHandler,
    editProfileHandler,
    deleteBusinessHandler,
  } = profileController();

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
                editMode ? (
                  <>
                    <IconButton onClick={() => setEditMode(false)}>
                      <CancelSharp />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setEditMode(false);
                        editProfileHandler();
                      }}
                    >
                      <SaveSharp />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => setEditMode(true)}>
                    <EditSharp />
                  </IconButton>
                )
              }
            />
            {!editMode && (
              <>
                <img
                  src={profileUri}
                  alt="Profile Photo"
                  style={{
                    height: "12rem",
                    width: "12rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="h6">{`${firstname} ${lastname}`}</Typography>
                <Typography variant="h6">{`${address}`}</Typography>
                <Typography variant="h6">{`${contactNo}`}</Typography>
              </>
            )}
            {editMode && (
              <>
                <ButtonBase
                  onClick={() => setOpenEditProfile(true)}
                  sx={{
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={newProfileUri}
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
                  onChange={(e) => setNewFirstname(e.target.value)}
                  value={newFirstname}
                  fullWidth={true}
                  siz="small"
                  sx={{ backgroundColor: "#f1effb" }}
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="Last Name"
                  type="text"
                  variant="filled"
                  onChange={(e) => setNewLastname(e.target.value)}
                  value={newLastname}
                  fullWidth={true}
                  siz="small"
                  sx={{ backgroundColor: "#f1effb" }}
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="Address"
                  type="text"
                  variant="filled"
                  onChange={(e) => setNewAddress(e.target.value)}
                  value={newAddress}
                  fullWidth={true}
                  siz="small"
                  sx={{ backgroundColor: "#f1effb" }}
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="Contact No."
                  type="text"
                  variant="filled"
                  onChange={(e) => setNewContactNo(e.target.value)}
                  value={newContactNo}
                  fullWidth={true}
                  siz="small"
                  sx={{ backgroundColor: "#f1effb" }}
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
                onClick={() => setOpenEditPassword(true)}
              >
                Change Password
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/profile/businesses/new")}
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
                    onClick={() =>
                      navigate(`/profile/businesses/${business._id}/edit`, {
                        state: { business },
                      })
                    }
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
                          deleteBusinessHandler(business._id);
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
        open={openEditPassword}
        handleClose={() => setOpenEditPassword(false)}
        saveHandler={changePasswordHandler}
      />
      <ImagePickerDialog
        open={openEditProfile}
        handleClose={() => setOpenEditProfile(false)}
        saveHandler={changeProfileHandler}
        imageUri={newProfileUri}
      />
    </Container>
  );
};

export default ProfilePage;
