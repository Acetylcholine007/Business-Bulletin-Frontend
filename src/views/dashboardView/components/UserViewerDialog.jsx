import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Typography } from "@mui/material";

export default function UserViewerDialog({
  open,
  handleClose,
  selectedUser,
  allowHandler,
}) {

  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">User Viewer</DialogTitle>
      {selectedUser && (
        <DialogContent align="center">
          <Avatar
            alt="Profile Image"
            src={selectedUser.profileUri}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5">{`${selectedUser.firstname} ${selectedUser.lastname}`}</Typography>
          <Typography variant="h5">{selectedUser.address}</Typography>
          <Typography variant="h5">{selectedUser.contactNo}</Typography>
        </DialogContent>
      )}
      {selectedUser && (
        <DialogActions>
          <Button
            onClick={() => allowHandler(!selectedUser.status, selectedUser._id)}
            autoFocus
          >
            {`${selectedUser.status ? "BAN" : "ALLOW"}`}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
