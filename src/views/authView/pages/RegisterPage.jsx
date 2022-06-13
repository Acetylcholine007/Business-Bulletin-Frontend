import {
  AccountCircleSharp,
  AlternateEmailSharp,
  LocationOnSharp,
  LockSharp,
  PhoneSharp,
  Visibility,
  VisibilityOff,
  VisibilityOffSharp,
  VisibilitySharp,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import { registerController } from "../controllers/registerController";

const RegisterPage = () => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    contactNo,
    setContactNo,
    address,
    setAddress,
    password,
    setPassword,
    email,
    setEmail,
    profileUri,
    setProfileUri,
    showPassword,
    setShowPassword,
    registerHandler,
    navigate,
    openProfilePicker,
    setOpenProfilePicker,
  } = registerController();

  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      maxWidth="md"
    >
      <Typography variant="h4">Business Bulletin</Typography>
      <Card sx={{ padding: 4 }}>
        <Stack
          component="form"
          spacing={2}
          noValidate
          autoComplete="off"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            onClick={() => {
              setOpenProfilePicker(true);
            }}
          >
            <Avatar
              alt="Profile Image"
              src={profileUri}
              sx={{ width: 100, height: 100 }}
            />
          </IconButton>
          <TextField
            id="firstname"
            label="First Name"
            type="text"
            variant="outlined"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleSharp />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <TextField
            id="lastname"
            label="Last Name"
            type="text"
            variant="outlined"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleSharp />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <TextField
            id="contactNo"
            label="Contact No."
            type="number"
            variant="outlined"
            onChange={(e) => setContactNo(e.target.value)}
            value={contactNo}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneSharp />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <TextField
            id="address"
            label="Address"
            type="text"
            variant="outlined"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnSharp />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailSharp />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockSharp />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={registerHandler}
            fullWidth
          >
            SIGNUP
          </Button>
          <Divider sx={{ width: "100%" }} />
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signin")}
            fullWidth
          >
            Already have an Account?
          </Button>
        </Stack>
      </Card>
      {/* <ImageUriDialog
        open={openProfilePicker}
        handleClose={() => setOpenProfilePicker(false)}
        saveHandler={setProfileUri}
        imageUri={profileUri}
      /> */}
      <ImagePickerDialog 
        open={openProfilePicker}
        handleClose={() => setOpenProfilePicker(false)}
        saveHandler={setProfileUri}
        imageUri={profileUri}
      />
    </Container>
  );
};

export default RegisterPage;
