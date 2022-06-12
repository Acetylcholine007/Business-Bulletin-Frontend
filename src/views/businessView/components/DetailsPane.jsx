import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";

const DetailsPane = ({ tabIndex, selectedIndex, setTabIndex, businesses }) => {
  if (businesses !== null && businesses.length !== 0) {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        elevation={4}
      >
        <CardMedia
          component="img"
          src={businesses[selectedIndex].bannerUri}
          height="200"
        />
        <Avatar
          src={businesses[selectedIndex].logoUri}
          sx={{
            position: "absolute",
            top: 75,
            left: 25,
            height: 100,
            width: 100,
            border: "2px solid white",
          }}
        />
        <Typography variant="h5">{businesses[selectedIndex].name}</Typography>
        <Typography variant="h6">
          {businesses[selectedIndex].description}
        </Typography>
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
              {businesses[selectedIndex].products.map((product, index) => (
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemAvatar>
                    <Avatar alt="Product Image" src={product.imagesUri[0]} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={
                      <>
                        <Typography variant="p" color="text.primary">
                          {product.price}
                        </Typography>
                        <Typography component={"div"} variant="body2">
                          {product.description}
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
              {businesses[selectedIndex].services.map((service, index) => (
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Product Image"
                      src={`url('${service.imagesUri[0]}')`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={service.name}
                    secondary={
                      <>
                        <Typography variant="p" color="text.primary">
                          {service.price}
                        </Typography>
                        <Typography component={"div"} variant="body2">
                          {service.description}
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
  } else {
    return <CircularProgress />;
  }
};

export default DetailsPane;
