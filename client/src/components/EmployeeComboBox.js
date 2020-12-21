import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function EmployeeComboBox(props) {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    for (let i = 0; i < props.data.length; i++) {
      setOptions((prevState) => [
        ...prevState,
        {
          name: props.data[i][0],
          email: props.data[i][1],
          phone: props.data[i][2],
          car: props.data[i][3],
          model: props.data[i][4],
          color: props.data[i][5],
          license: props.data[i][6],
          department: props.data[i][7],
          id: props.data[i][8],
        },
      ]);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.id}
        //   style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Enter Employee Id" variant="outlined" />
        )}
        onChange={(e, v) => props.setEmployee(v)}
      />
      <br />
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        value={props.employee.name}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            name: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        margin="dense"
        id="email"
        label="Email Address"
        type="text"
        value={props.employee.email}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            email: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        margin="dense"
        id="phone"
        label="Phone"
        type="text"
        value={props.employee.phone}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            phone: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        margin="dense"
        id="car"
        label="Car"
        type="text"
        value={props.employee.car}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            car: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        margin="dense"
        id="model"
        label="Model"
        type="text"
        value={props.employee.model}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            model: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        margin="dense"
        id="color"
        label="Color"
        type="text"
        value={props.employee.color}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            color: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        margin="dense"
        id="license"
        label="License"
        type="text"
        value={props.employee.license}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            license: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        margin="dense"
        id="department"
        label="Department"
        type="text"
        value={props.employee.department}
        onChange={(e) =>
          props.setEmployee({
            ...props.employee,
            department: e.target.value,
          })
        }
        fullWidth
      />
    </React.Fragment>
  );
}
