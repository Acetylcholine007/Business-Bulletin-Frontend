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
import React from "react";
import { profileController } from "../controllers/profileController";

const ProfilePage = () => {
  const { selectedIndex, setSelectedIndex, editMode, setEditMode } =
    profileController();

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
                    <IconButton onClick={() => setEditMode(false)}>
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/1200px-Ambersweet_oranges.jpg"
                  alt="Profile Photo"
                  style={{
                    height: "12rem",
                    width: "12rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="h6">{"John Doe"}</Typography>
                <Typography variant="h6">{"Manila, Philippines"}</Typography>
                <Typography variant="h6">{"0921 259 3427"}</Typography>
              </>
            )}
            {editMode && (
              <>
                <ButtonBase
                  onClick={() => {}}
                  sx={{
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/1200px-Ambersweet_oranges.jpg"
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
                  onChange={(e) => setFirstname(e.target.value)}
                  value={"John"}
                  fullWidth={true}
                  siz="small"
                  sx={{ backgroundColor: "#f1effb" }}
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="First Name"
                  type="text"
                  variant="filled"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={"Doe"}
                  fullWidth={true}
                  siz="small"
                  sx={{ backgroundColor: "#f1effb" }}
                  margin="normal"
                />
                <TextField
                  disable={true}
                  label="First Name"
                  type="text"
                  variant="filled"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={"Manila, Philippines"}
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
                  onChange={(e) => setFirstname(e.target.value)}
                  value={"0921 259 3427"}
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
              <Button variant="contained" onClick={() => {}}>
                Change Password
              </Button>
              <Button variant="contained" onClick={() => {}}>
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
            {[1, 2, 3, 4, 5, 6].map((business, index) => (
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
                  selected={selectedIndex === index}
                  onClick={() => setSelectedIndex(index)}
                >
                  <Typography variant="h5">{`Business ${business}`}</Typography>
                  <Typography variant="h6">Business Tagline</Typography>
                  <Divider />
                  <Typography variant="p">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit obcaecati sit ullam odit consequuntur quia ex fuga
                    accusamus, iure nemo repellendus maiores voluptatem!
                    Molestiae aperiam nemo aliquam, vero expedita facilis!
                  </Typography>
                  <CardActions
                    disableSpacing
                    sx={{ justifyContent: "flex-end" }}
                  >
                    <Button size="small" onClick={() => {}}>
                      Edit
                    </Button>
                    <Button size="small" onClick={() => {}}>
                      Delete
                    </Button>
                  </CardActions>
                </ListItemButton>
              </Card>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
