import { EditSharp, MoreVertSharp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";
import { profileController } from "../controllers/ProfileController";

const ProfilePage = () => {
  const { selectedIndex, setSelectedIndex } = profileController();

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
          <Card sx={{ p: 2 }} elevation={4}>
            <CardHeader
              title={<Typography variant="h5">{"John Doe"}</Typography>}
              action={
                <IconButton>
                  <MoreVertSharp />
                </IconButton>
              }
            />
            <Divider />
            <Typography variant="h6">Contact Inofrmation</Typography>
            <Typography variant="body1">{"johndoe@gmail.com"}</Typography>
            <Typography variant="body1">{"0921 259 3427"}</Typography>
            <Typography variant="body1">{"Manila, Philippines"}</Typography>
            <Typography variant="body1">{`${5} business profiles`}</Typography>
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
                    <Button size="small" onClick={() => {}}>Edit</Button>
                    <Button size="small" onClick={() => {}}>Delete</Button>
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
