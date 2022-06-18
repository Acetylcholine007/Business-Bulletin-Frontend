import { AddCircleSharp, Delete } from "@mui/icons-material";
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
import React, { useEffect } from "react";
import LocationPickerDialog from "../components/LocationPickerDialog";
import ProductEditorDialog from "../components/ProductEditorDialog";
import ServiceEditorDialog from "../components/ServiceEditorDialog";
import { useDispatch, useSelector } from "react-redux";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import { profileActions } from "../../../store/slices/ProfileSlice";
import {
  createBusiness,
  creatorSaveProduct,
  creatorSaveService,
  deleteProduct,
  deleteService,
  editBusiness,
  editorSaveProduct,
  editorSaveService,
  fetchTags,
} from "../../../store/actions/profileActions";
import { useNavigate } from "react-router-dom";
import { feedbackActions } from "../../../store/slices/FeedbackSlice";

const BusinessEditor = ({ isCreator }) => {
  const {
    business,
    tags,
    currentCredential,
    isShowServiceDialog,
    isShowProductDialog,
    isShowLocationDialog,
    isShowLogoDialog,
    isShowBannerDialog,
    selectedProduct,
    selectedService,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(feedbackActions.setLoading(false));
  }, []);

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
              <CardActionArea
                onClick={() =>
                  dispatch(profileActions.setShowBannerDialog(true))
                }
              >
                <CardMedia
                  component="img"
                  height="200"
                  src={business.bannerUri}
                />
              </CardActionArea>
            </Tooltip>
            <Tooltip title="Change Business Logo">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 75,
                  left: 25,
                }}
                onClick={() => dispatch(profileActions.setShowLogoDialog(true))}
              >
                <Avatar
                  src={business.logoUri}
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
                  onChange={(e) =>
                    dispatch(
                      profileActions.editBusiness({
                        field: "name",
                        value: e.target.value,
                      })
                    )
                  }
                  value={business.name}
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
                  onChange={(e) =>
                    dispatch(
                      profileActions.editBusiness({
                        field: "description",
                        value: e.target.value,
                      })
                    )
                  }
                  value={business.description}
                  fullWidth={true}
                  error={false}
                  helperText={false ? "Business description required" : null}
                />
                <TextField
                  label="Business Address"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    dispatch(
                      profileActions.editBusiness({
                        field: "address",
                        value: e.target.value,
                      })
                    )
                  }
                  value={business.address}
                  fullWidth={true}
                  error={false}
                  helperText={false ? "Business address required" : ""}
                />
                <TextField
                  label="Business Contact No."
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    dispatch(
                      profileActions.editBusiness({
                        field: "contactNo",
                        value: e.target.value,
                      })
                    )
                  }
                  value={business.contactNo}
                  fullWidth={true}
                  error={false}
                  helperText={false ? "Business contact no. required" : null}
                />
                <Autocomplete
                  multiple
                  options={tags ? tags : []}
                  getOptionLabel={(option) => option.name}
                  loading={tags === null}
                  value={business.tags}
                  filterSelectedOptions
                  onChange={(e, val) =>
                    dispatch(
                      profileActions.editBusiness({
                        field: "tags",
                        value: val,
                      })
                    )
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Tags" />
                  )}
                />
                <Button
                  onClick={() =>
                    dispatch(profileActions.setShowLocationDialog(true))
                  }
                >
                  Pick Location on Map
                </Button>
                <TextField
                  label="Credentials URI"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    dispatch(
                      profileActions.setCurrentCredential(e.target.value)
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(profileActions.addCredential());
                    }
                  }}
                  value={currentCredential}
                  fullWidth={true}
                />
                <List>
                  {business.credentials.map((uri, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          onClick={() =>
                            dispatch(profileActions.removeCredential(uri))
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
              <Button
                variant="contained"
                onClick={
                  isCreator
                    ? () => dispatch(createBusiness(business, navigate))
                    : () => dispatch(editBusiness(business, navigate))
                }
              >
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
                      dispatch(
                        profileActions.setShowProductDialog({
                          product: null,
                          status: true,
                        })
                      );
                    }}
                  >
                    <AddCircleSharp />
                  </IconButton>
                }
              />
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {business.products.map((item, index) => (
                  <ListItemButton
                    onClick={() => {
                      dispatch(
                        profileActions.setShowProductDialog({
                          product: item,
                          status: true,
                        })
                      );
                    }}
                  >
                    <ListItem
                      alignItems="flex-start"
                      key={index}
                      secondaryAction={
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteProduct(true, item._id));
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
                  <IconButton
                    onClick={() =>
                      dispatch(
                        profileActions.setShowServiceDialog({
                          service: null,
                          status: true,
                        })
                      )
                    }
                  >
                    <AddCircleSharp />
                  </IconButton>
                }
              />
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {business.services.map((item, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      dispatch(
                        profileActions.setShowServiceDialog({
                          service: item,
                          status: true,
                        })
                      );
                    }}
                  >
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteService(true, item._id));
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
        open={isShowServiceDialog}
        handleClose={() => {
          dispatch(
            profileActions.setShowServiceDialog({
              service: null,
              status: false,
            })
          );
        }}
        service={selectedService}
        saveHandler={
          isCreator
            ? (isNew, service) => {
                dispatch(creatorSaveService(isNew, service));
              }
            : (isNew, service) => {
                dispatch(editorSaveService(isNew, service));
              }
        }
      />
      <ProductEditorDialog
        open={isShowProductDialog}
        handleClose={() => {
          dispatch(
            profileActions.setShowProductDialog({
              product: null,
              status: false,
            })
          );
        }}
        product={selectedProduct}
        saveHandler={
          isCreator
            ? (isNew, product) => {
                dispatch(creatorSaveProduct(isNew, product));
              }
            : (isNew, product) => {
                dispatch(editorSaveProduct(isNew, product));
              }
        }
      />
      <LocationPickerDialog
        open={isShowLocationDialog}
        handleClose={() =>
          dispatch(profileActions.setShowLocationDialog(false))
        }
        saveHandler={() => {
          (lat, lng) =>
            dispatch(
              profileActions.editBusiness({
                field: "coordinates",
                value: { lat, lng },
              })
            );
        }}
      />
      <ImagePickerDialog
        open={isShowLogoDialog}
        handleClose={() => dispatch(profileActions.setShowLogoDialog(false))}
        saveHandler={(uri) =>
          dispatch(
            profileActions.editBusiness({ field: "logoUri", value: uri })
          )
        }
        imageUri={business.logoUri}
      />
      <ImagePickerDialog
        open={isShowBannerDialog}
        handleClose={() => dispatch(profileActions.setShowBannerDialog(false))}
        saveHandler={(uri) =>
          dispatch(
            profileActions.editBusiness({ field: "bannerUri", value: uri })
          )
        }
        imageUri={business.bannerUri}
      />
    </Container>
  );
};

export default BusinessEditor;
