import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordEditorDialog({
  open,
  handleClose,
  saveHandler,
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError(false);
    setConfirmPasswordError(false);
    setShowConfirmPassword(false);
    setShowNewPassword(false);
  }, [open]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Change Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          value={newPassword}
          type={showNewPassword ? "text" : "password"}
          size="small"
          placeholder="New Password"
          error={newPasswordError}
          fullWidth
          onChange={(e) => setNewPassword(e.target.value)}
          helperText={newPasswordError ? "Cannot be empty" : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          value={confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          size="small"
          placeholder="Confirm Password"
          error={confirmPasswordError}
          fullWidth
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={confirmPasswordError ? "Cannot be empty" : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (newPassword === "" || confirmPassword === "") {
              setConfirmPasswordError(true);
              setNewPasswordError(true);
            } else {
              saveHandler(newPassword);
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
