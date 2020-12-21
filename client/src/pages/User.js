import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import CssBaseline from "@material-ui/core/CssBaseline";
import EmployeeTable from "../components/EmployeeTable";
import AdminPanel from "../components/AdminPanel";

export default function User() {
  const session = useSelector((state) => state.session);

  return (
    <React.Fragment>
      <CssBaseline />
      <Navigation />
      {session.role === "admin" ? <AdminPanel /> : <EmployeeTable />}
    </React.Fragment>
  );
}
