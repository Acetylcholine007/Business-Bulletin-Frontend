import {
  AccountCircleSharp,
  AlternateEmailSharp,
  LocationOnSharp,
  LockSharp,
  PhoneSharp,
  Visibility,
  VisibilityOff,
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
import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import { signup } from "../../../store/actions/authActions";

const initialState = {
  firstname: "",
  lastname: "",
  contactNo: "",
  address: "",
  password: "",
  email: "",
  profileUri: "",
  isShowPassword: false,
  isShowProfilePicker: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "firstname":
      return { ...state, firstname: action.payload };
    case "lastname":
      return { ...state, lastname: action.payload };
    case "contactNo":
      return { ...state, contactNo: action.payload };
    case "address":
      return { ...state, address: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "profileUri":
      return { ...state, profileUri: action.payload };
    case "showPassword":
      return { ...state, isShowPassword: action.payload };
    case "showProfilePicker":
      return { ...state, isShowProfilePicker: action.payload };
    default:
      return state;
  }
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerState, registerDispatch] = useReducer(reducer, initialState);

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
            onClick={() =>
              registerDispatch({ type: "showProfilePicker", payload: true })
            }
          >
            <Avatar
              alt="Profile Image"
              src={registerState.profileUri}
              sx={{ width: 100, height: 100 }}
            />
          </IconButton>
          <TextField
            id="firstname"
            label="First Name"
            type="text"
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "firstname", payload: e.target.value })
            }
            value={registerState.firstname}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleSharp />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="lastname"
            label="Last Name"
            type="text"
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "lastname", payload: e.target.value })
            }
            value={registerState.lastname}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleSharp />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="contactNo"
            label="Contact No."
            type="number"
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "contactNo", payload: e.target.value })
            }
            value={registerState.contactNo}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneSharp />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="address"
            label="Address"
            type="text"
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "address", payload: e.target.value })
            }
            value={registerState.address}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnSharp />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "email", payload: e.target.value })
            }
            value={registerState.email}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailSharp />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="password"
            label="Password"
            type={registerState.isShowPassword ? "text" : "password"}
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "password", payload: e.target.value })
            }
            value={registerState.password}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockSharp />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      registerDispatch({
                        type: "isShowPassword",
                        payload: !registerState.isShowPassword,
                      })
                    }
                  >
                    {registerState.isShowPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={() =>
              dispatch(
                signup(
                  {
                    firstname: registerState.firstname,
                    lastname: registerState.lastname,
                    contactNo: registerState.contactNo,
                    address: registerState.address,
                    password: registerState.password,
                    email: registerState.email,
                    profileUri: registerState.profileUri,
                  },
                  navigate
                )
              )
            }
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
      <ImagePickerDialog
        open={registerState.isShowProfilePicker}
        handleClose={() =>
          registerDispatch({ type: "showProfilePicker", payload: false })
        }
        saveHandler={(val) =>
          registerDispatch({ type: "profileUri", payload: val })
        }
        imageUri={registerState.profileUri}
      />
    </Container>
  );
};

export default RegisterPage;
