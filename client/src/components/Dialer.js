import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import WebIcon from "@material-ui/icons/Web";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/AddBox";
import MySnackbar from "./MySnackbar";
import UpdateEmployee from "./UpdateEmployee";
import AddEmployee from "./AddEmployee";
import UpdatePassword from "./UpdatePassword";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  exampleWrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(5),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

export default function Dialer(props) {
  const classes = useStyles();
  // const [direction, setDirection] = React.useState("up");
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const actions = [
    {
      icon: <WebIcon onClick={() => setOpenPassword(true)} />,
      name: "Update Password",
    },
    {
      icon: <UpdateIcon onClick={() => setOpenUpdate(true)} />,
      name: "Update Employee",
    },
    {
      icon: <AddIcon onClick={() => setOpenAdd(true)} />,
      name: "Add Employee",
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function addEmployee(emp) {
    const response = await axios.post("/api/employee", emp);

    if (response) {
      setMessage("Employee has been added");
      setOpenSnackbar(true);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={"up"}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </div>
      <AddEmployee
        open={openAdd}
        setOpen={setOpenAdd}
        add={addEmployee}
        data={props.data}
        setData={props.setData}
        getData={props.getData}
      />
      <UpdateEmployee
        open={openUpdate}
        setOpen={setOpenUpdate}
        data={props.data}
        setData={props.setData}
        getData={props.getData}
      />
      <UpdatePassword open={openPassword} setOpen={setOpenPassword} />
      <MySnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}
