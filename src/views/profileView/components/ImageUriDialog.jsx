import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function ImageUriDialog({
  open,
  handleClose,
  saveHandler,
  imageUri,
}) {
  const [profileUri, setProfileUri] = useState(imageUri);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setProfileUri("");
  }, [open]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Change Profile Image
      </DialogTitle>
      <DialogContent>
        <TextField
          value={profileUri}
          size="small"
          placeholder="Profile image URL"
          error={error}
          fullWidth
          onChange={(e) => setTag(e.value.target)}
          helperText={error ? "Cannot be empty" : null}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setError(false);
            saveHandler(profileUri);
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
