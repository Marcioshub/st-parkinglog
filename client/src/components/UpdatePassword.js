import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function UpdatePassword(props) {
  const [password, setPassword] = React.useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  async function updatePassword() {
    if (password !== "" || password !== undefined) {
      const response = await axios.put("/api/auth/password", { password });
      if (response.data.success) {
        console.log(response.data);
      }
    }

    handleClose();
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new password, after clicking submit your will be
            asked to use the new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Enter Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            // onClick={handleClose}
            color="primary"
            onClick={updatePassword}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
