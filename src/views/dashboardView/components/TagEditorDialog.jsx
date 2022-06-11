import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { useState, useRef } from "react";
import { useEffect } from "react";

export default function TagEditorDialog({
  open,
  handleClose,
  saveHandler,
  selectedTag,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [tag, setTag] = useState(selectedTag ? selectedTag.name : "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setTag("");
  }, [open]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {selectedTag ? "Edit Tag" : "New Tag"}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={tag}
          size="small"
          placeholder="Tag Name"
          error={error}
          fullWidth
          onChange={(e) => setTag(e.target.value)}
          helperText={error ? "Cannot be empty" : null}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (tag === "") {
              setError(true);
            } else {
              setError(false);
              saveHandler(false, tag);
              handleClose();
            }
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
