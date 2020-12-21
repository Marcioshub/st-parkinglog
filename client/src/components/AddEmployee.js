import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [car, setCar] = React.useState("");
  const [model, setModel] = React.useState("");
  const [color, setColor] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [department, setDepartment] = React.useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  function cleanData(emp) {
    return [
      emp.name,
      emp.email,
      emp.phone,
      emp.car,
      emp.model,
      emp.color,
      emp.license,
      emp.department,
      emp._id,
    ];
  }

  async function addEmployee() {
    const response = await axios.post("/api/employee", {
      name,
      email,
      phone,
      car,
      model,
      color,
      license,
      department,
    });

    if (response) {
      props.setData((prevState) => [
        ...prevState,
        cleanData({
          name,
          email,
          phone,
          car,
          model,
          color,
          license,
          department,
        }),
      ]);
      props.getData();
      handleClose();
      //   setMessage("Employee has been added");
      //   setOpen(true);
    }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add an employee, please enter all the information below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="car"
            label="Car"
            type="text"
            onChange={(e) => setCar(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="model"
            label="Model"
            type="text"
            onChange={(e) => setModel(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            onChange={(e) => setColor(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="license"
            label="License"
            type="text"
            onChange={(e) => setLicense(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="department"
            label="Department"
            type="text"
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={addEmployee}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
