import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EmployeeComboBox from "./EmployeeComboBox";

export default function UpdateEmployee(props) {
  const [employee, setEmployee] = React.useState({
    name: "",
    email: "",
    phone: "",
    car: "",
    model: "",
    color: "",
    license: "",
    department: "",
    id: "",
    // id: "",
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  async function updateEmployee() {
    const response = await axios.put(`/api/employee/${employee.id}`, employee);

    if (response) {
      console.log(response.data);
      props.getData();
    }

    handleClose();
    //   setMessage("Employee has been added");
    //   setOpen(true);
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update an employee enter their ID and fill in all information
          </DialogContentText>

          <EmployeeComboBox
            employee={employee}
            setEmployee={setEmployee}
            data={props.data}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={updateEmployee}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
