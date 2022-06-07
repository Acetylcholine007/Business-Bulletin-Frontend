import {
  AccountCircleSharp,
  AlternateEmailSharp,
  LockSharp,
  PhoneSharp,
  Visibility,
  VisibilityOff,
  VisibilityOffSharp,
  VisibilitySharp,
} from "@mui/icons-material";
import {
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
import { registerController } from "../controllers/registerController";

const RegisterPage = () => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    contactNo,
    setContactNo,
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    registerHandler,
    navigate,
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
          <Typography
            variant="h6"
            sx={{ marginBottom: "1.5rem" }}
            align="center"
          >
            Register
          </Typography>
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
    </Container>
  );
};

export default RegisterPage;
