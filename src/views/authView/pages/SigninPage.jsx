import {
  AlternateEmailSharp,
  LockSharp,
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
import PasswordResetDialog from "../components/PasswordResetDialog";
import { signinController } from "../controllers/signinController";

const SigninPage = () => {
  const {
    open,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleOpen,
    handleClose,
    signinHandler,
    passwordResetHandler,
    verificationHandler,
    showResendVerification,
    navigate
  } = signinController();

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
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Sign in
          </Typography>
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
                    {showPassword ? (
                      <VisibilityOffSharp />
                    ) : (
                      <VisibilitySharp />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={signinHandler}
            fullWidth
          >
            LOGIN
          </Button>
          <Button variant="text" onClick={handleOpen}>
            Forgot Password?
          </Button>
          {showResendVerification && (
            <Button variant="text" onClick={verificationHandler}>
              Resend Email Verification
            </Button>
          )}
          <Divider sx={{ width: "100%" }} />
          <Button
            variant="contained"
            size="large "
            onClick={() => navigate("/register")}
            fullWidth
          >
            Create an Account
          </Button>
        </Stack>
      </Card>
      <PasswordResetDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={passwordResetHandler}
      />
    </Container>
  );
};

export default SigninPage;
