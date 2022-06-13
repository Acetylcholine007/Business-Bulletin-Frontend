import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function ServiceEditorDialog({
  open,
  handleClose,
  service,
  saveHandler,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUri, setImageUri] = useState("");
  const [imagesUri, setImagesUri] = useState([]);

  useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description);
      setPrice(service.price);
      setImagesUri(service.imagesUri);
    } else {
      setName("");
      setDescription("");
      setPrice(0);
      setImagesUri([]);
    }
  }, [open]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Service Editor</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <TextField
            label="Service Name"
            type="text"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth={true}
            error={false}
            helperText={false ? "Service name required" : null}
          />
          <TextField
            label="Service Description"
            type="text"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            fullWidth={true}
            error={false}
            helperText={false ? "Service description required" : null}
          />
          <TextField
            label="Service Price"
            type="number"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            fullWidth={true}
            error={false}
            helperText={false ? "Service price required" : null}
          />
          <TextField
            label="Service Image URI"
            type="text"
            variant="outlined"
            onChange={(e) => setImageUri(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setImagesUri((imagesUri) => [...imagesUri, imageUri]);
                setImageUri("");
              }
            }}
            value={imageUri}
            fullWidth={true}
          />
          <List sx={{ maxHeight: "10rem", overflowY: "auto" }}>
            {imagesUri.map((uri, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    onClick={() =>
                      setImagesUri((imagesUri) =>
                        imagesUri.filter((item) => item !== uri)
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
                  <Avatar alt="Service Image" src={uri} />
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            saveHandler(!!service, {
              _id: service ? service._id : Math.random(),
              name,
              description,
              price,
              imagesUri,
              businessId: service?.business,
            });
            handleClose();
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
