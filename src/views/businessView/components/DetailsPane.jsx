import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";

const DetailsPane = ({ tabIndex, setTabIndex }) => {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={4}
    >
      <Typography variant="h5">{`Business Name`}</Typography>
      <Typography variant="h6">Business Tagline</Typography>
      <Box sx={{ borderBottom: 1, borderTop: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          variant="fullWidth"
        >
          <Tab label="Products" />
          <Tab label="Services" />
        </Tabs>
      </Box>
      <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
        {tabIndex === 0 && (
          <List>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <ListItem alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <Avatar alt="Product Image" src="url('')" />
                </ListItemAvatar>
                <ListItemText
                  primary="Product Name"
                  secondary={
                    <>
                      <Typography variant="p" color="text.primary">
                        Price: Php 100
                      </Typography>
                      <Typography component={"div"} variant="body2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Fuga voluptatum molestiae animi tempora fugit
                        saepe optio, laborum ipsum atque, dolore beatae maiores
                        aspernatur dolor impedit vitae illum nihil! Esse,
                        pariatur!
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        {tabIndex === 1 && (
          <List>
            {[1, 2, 3].map((item, index) => (
              <ListItem alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <Avatar alt="Product Image" src="url('')" />
                </ListItemAvatar>
                <ListItemText
                  primary="Service Name"
                  secondary={
                    <>
                      <Typography variant="p" color="text.primary">
                        Price: Php 100
                      </Typography>
                      <Typography component={"div"} variant="body2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Fuga voluptatum molestiae animi tempora fugit
                        saepe optio, laborum ipsum atque, dolore beatae maiores
                        aspernatur dolor impedit vitae illum nihil! Esse,
                        pariatur!
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailsPane;
