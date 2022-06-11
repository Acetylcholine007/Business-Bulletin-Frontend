import { AddCircleSharp, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LocationPickerDialog from "../components/LocationPickerDialog";
import ProductEditorDialog from "../components/ProductEditorDialog";
import ServiceEditorDialog from "../components/ServiceEditorDialog";
import { businessEditorController } from "../controllers/businessEditorController";

const BusinessEditor = () => {
  const {
    businessInfo,
    setBusinessInfo,
    products,
    setProducts,
    services,
    setServices,
    chosenTags,
    setChosenTags,
    lat,
    setLat,
    lng,
    setLng,
    tags,
    setTags,
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
    businessSaveHandler,
    productSavehandler,
    serviceSaveHandler,
    navigate,
  } = businessEditorController();

  return (
    <Container sx={{ height: "100%" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ height: { md: "100%", xs: "initial" }, overflowY: "auto" }}
        >
          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Business Name"
                type="text"
                variant="outlined"
                onChange={(e) =>
                  setBusinessInfo((newInfo) => {
                    newInfo.name.value = e.target.value;
                    return newInfo;
                  })
                }
                value={businessInfo.name.value}
                fullWidth={true}
                error={businessInfo.name.error}
                helperText={
                  businessInfo.name.error ? "Business name required" : null
                }
              />
              <TextField
                multiline
                maxRows={4}
                label="Business Description"
                type="text"
                variant="outlined"
                onChange={(e) =>
                  setBusinessInfo((newInfo) => {
                    newInfo.description.value = e.target.value;
                    return newInfo;
                  })
                }
                value={businessInfo.description.value}
                fullWidth={true}
                error={businessInfo.description.error}
                helperText={
                  businessInfo.description.error
                    ? "Business description required"
                    : null
                }
              />
              <TextField
                label="Business Address"
                type="text"
                variant="outlined"
                onChange={(e) =>
                  setBusinessInfo((newInfo) => {
                    newInfo.address.value = e.target.value;
                    return newInfo;
                  })
                }
                value={businessInfo.address.value}
                fullWidth={true}
                error={businessInfo.address.error}
                helperText={
                  businessInfo.address.error ? "Business address required" : ""
                }
              />
              <TextField
                label="Business Contact No."
                type="text"
                variant="outlined"
                onChange={(e) =>
                  setBusinessInfo((newInfo) => {
                    newInfo.contactNo.value = e.target.value;
                    return newInfo;
                  })
                }
                value={businessInfo.contactNo.value}
                fullWidth={true}
                error={businessInfo.contactNo.error}
                helperText={
                  businessInfo.contactNo.error
                    ? "Business contact no. required"
                    : null
                }
              />

              <Autocomplete
                multiple
                options={tags}
                getOptionLabel={(option) => option.name}
                defaultValue={chosenTags}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Tags" />
                )}
              />
              <Button variant="contained" onClick={businessSaveHandler}>
                Save
              </Button>
            </Stack>
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
                  <IconButton onClick={() => {}}>
                    <AddCircleSharp />
                  </IconButton>
                }
              />
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {[1, 2, 3].map((item, index) => (
                  <ListItem
                    alignItems="flex-start"
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    }
                  >
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
                          <Typography variant="body2">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Fuga voluptatum molestiae animi tempora fugit
                            saepe optio, laborum ipsum atque, dolore beatae
                            maiores aspernatur dolor impedit vitae illum nihil!
                            Esse, pariatur!
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
            <Card
              sx={{ height: "50%", display: "flex", flexDirection: "column" }}
            >
              <CardHeader
                title="Services"
                action={
                  <IconButton onClick={() => {}}>
                    <AddCircleSharp />
                  </IconButton>
                }
              />
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {[1, 2, 3].map((item, index) => (
                  <ListItem
                    alignItems="flex-start"
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    }
                  >
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
                          <Typography variant="body2">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Fuga voluptatum molestiae animi tempora fugit
                            saepe optio, laborum ipsum atque, dolore beatae
                            maiores aspernatur dolor impedit vitae illum nihil!
                            Esse, pariatur!
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <ServiceEditorDialog
        open={openProductDialog}
        handleClose={() => setOpenServiceDialog(false)}
        saveHandler={productSavehandler}
      />
      <ProductEditorDialog
        open={openServiceDialog}
        handleClose={() => setOpenProductDialog(false)}
        saveHandler={productSavehandler}
      />
      <LocationPickerDialog
        open={openLocationPicker}
        handleClose={() => setOpenLocationPicker(false)}
        saveHandler={() => {}}
      />
    </Container>
  );
};

export default BusinessEditor;
