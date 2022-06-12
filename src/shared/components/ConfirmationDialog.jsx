import { Message } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog({
  open,
  handleClose,
  action,
  title,
  message,
}) {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{Message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={action} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
