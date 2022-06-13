import { AddCircleSharp, AddSharp, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import LocationPickerDialog from "../components/LocationPickerDialog";
import ProductEditorDialog from "../components/ProductEditorDialog";
import ServiceEditorDialog from "../components/ServiceEditorDialog";
import { businessCreatorController } from "../controllers/businessCreatorController";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";

const BusinessCreator = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    contactNo,
    setContactNo,
    address,
    setAddress,
    products,
    services,
    chosenTags,
    setChosenTags,
    lat,
    setLat,
    lng,
    setLng,
    tags,
    selectedProduct,
    setSelectedProduct,
    selectedService,
    setSelectedService,
    openProductDialog,
    setOpenProductDialog,
    openServiceDialog,
    setOpenServiceDialog,
    openLocationPicker,
    setOpenLocationPicker,
    openBannerPicker,
    setOpenBannerPicker,
    openLogoPicker,
    setOpenLogoPicker,
    businessSaveHandler,
    logoUri,
    setLogoUri,
    bannerUri,
    setBannerUri,
    saveServiceHandler,
    saveProductHandler,
    removeProductHandler,
    removeServiceHandler,
    credentials,
    setCredentials,
    currentCredential,
    setCurrentCredential,
  } = businessCreatorController();

  return (
    <Container sx={{ height: "100%" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ height: { md: "100%", xs: "initial" } }}
        >
          <Card
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Tooltip title="Change Business Banner">
              <CardActionArea onClick={() => setOpenBannerPicker(true)}>
                <CardMedia component="img" height="200" src={bannerUri} />
              </CardActionArea>
            </Tooltip>
            <Tooltip title="Change Business Logo">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 75,
                  left: 25,
                }}
                onClick={() => setOpenLogoPicker(true)}
              >
                <Avatar
                  src={logoUri}
                  sx={{
                    height: 100,
                    width: 100,
                    border: "2px solid white",
                  }}
                />
              </IconButton>
            </Tooltip>
            <CardContent sx={{ overflowY: "auto", flexGrow: 1 }}>
              <Stack spacing={2}>
                <TextField
                  label="Business Name"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  fullWidth={true}
                  error={false}
                  helperText={false ? "Business name required" : null}
                />
                <TextField
                  multiline
                  maxRows={4}
                  label="Business Description"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  fullWidth={true}
                  error={false}
                  helperText={false ? "Business description required" : null}
                />
                <TextField
                  label="Business Address"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  fullWidth={true}
                  error={false}
                  helperText={false ? "Business address required" : ""}
                />
                <TextField
                  label="Business Contact No."
                  type="text"
                  variant="outlined"
                  onChange={(e) => setContactNo(e.target.value)}
                  value={contactNo}
                  fullWidth={true}
                  error={false}
                  helperText={false ? "Business contact no. required" : null}
                />
                <Autocomplete
                  multiple
                  options={tags}
                  getOptionLabel={(option) => option.name}
                  value={chosenTags}
                  filterSelectedOptions
                  onChange={(e, val) => setChosenTags(val)}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Tags" />
                  )}
                />
                <Button onClick={() => setOpenLocationPicker(true)}>
                  Pick Location on Map
                </Button>
                <TextField
                  label="Credentials URI"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setCurrentCredential(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCredentials((credentials) => [
                        ...credentials,
                        currentCredential,
                      ]);
                      setCurrentCredential("");
                    }
                  }}
                  value={currentCredential}
                  fullWidth={true}
                />
                <List>
                  {credentials.map((uri, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          onClick={() =>
                            setCredentials((credentials) =>
                              credentials.filter((item) => item !== uri)
                            )
                          }
                          edge="end"
                          aria-label="delete"
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar alt="Product Image" src={uri} />
                      </ListItemAvatar>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-evenly" }}>
              <Button variant="contained" onClick={businessSaveHandler}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ height: "100%" }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Card
              sx={{ height: "50%", display: "flex", flexDirection: "column" }}
            >
              <CardHeader
                title="Products"
                action={
                  <IconButton
                    onClick={() => {
                      setOpenProductDialog(true);
                    }}
                  >
                    <AddCircleSharp />
                  </IconButton>
                }
              />
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {products.map((item, index) => (
                  <ListItemButton
                    onClick={() => {
                      setSelectedProduct(item);
                      setOpenProductDialog(true);
                    }}
                  >
                    <ListItem
                      alignItems="flex-start"
                      key={index}
                      secondaryAction={
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProductHandler(item._id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar alt="Product Image" src={item.imagesUri[0]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <>
                            <Typography variant="p" color="text.primary">
                              {`Price: Php ${item.price}`}
                            </Typography>
                            <Typography variant="body2">
                              {item.description}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </ListItemButton>
                ))}
              </List>
            </Card>
            <Card
              sx={{ height: "50%", display: "flex", flexDirection: "column" }}
            >
              <CardHeader
                title="Services"
                action={
                  <IconButton onClick={() => setOpenServiceDialog(true)}>
                    <AddCircleSharp />
                  </IconButton>
                }
              />
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {services.map((item, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      setSelectedService(item);
                      setOpenServiceDialog(true);
                    }}
                  >
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            removeServiceHandler(item._id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar alt="Service Image" src={item.imagesUri[0]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <>
                            <Typography variant="p" color="text.primary">
                              {`Price: Php ${item.price}`}
                            </Typography>
                            <Typography variant="body2">
                              {item.description}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </ListItemButton>
                ))}
              </List>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <ServiceEditorDialog
        open={openServiceDialog}
        handleClose={() => {
          setOpenServiceDialog(false);
          setSelectedService(null);
        }}
        service={selectedService}
        saveHandler={saveServiceHandler}
      />
      <ProductEditorDialog
        open={openProductDialog}
        handleClose={() => {
          setOpenProductDialog(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        saveHandler={saveProductHandler}
      />
      <LocationPickerDialog
        open={openLocationPicker}
        handleClose={() => setOpenLocationPicker(false)}
        saveHandler={() => {}}
      />
      <ImagePickerDialog
        open={openLogoPicker}
        handleClose={() => setOpenLogoPicker(false)}
        saveHandler={setLogoUri}
        imageUri={logoUri}
      />
      <ImagePickerDialog
        open={openBannerPicker}
        handleClose={() => setOpenBannerPicker(false)}
        saveHandler={setBannerUri}
        imageUri={bannerUri}
      />
    </Container>
  );
};

export default BusinessCreator;
