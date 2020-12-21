import React from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Container from "@material-ui/core/Container";
import Dialer from "./Dialer";
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function EmployeeTable() {
  const columns = [
    "Name",
    "Email",
    "Phone",
    "Car",
    "Model",
    "Color",
    "License",
    "Department",
    "Id",
  ];

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function getData() {
    setLoading(true);
    const response = await axios.get("/api/employee");
    // console.log(response.data);
    setData([]);
    if (response.data.data.length > 0) {
      for (let i = 0; i < response.data.data.length; i++) {
        setData((prevState) => [
          ...prevState,
          cleanData(response.data.data[i]),
        ]);
      }
    }
    // turn off loading
    setLoading(false);
  }

  async function deleteEmployee(id) {
    const response = await axios.delete(`/api/employee/${id}`);

    if (response) {
      // console.log(`${id} has been deleted`);
      // setMessage("Employee has been deleted");
      // setOpen(true);
    }
  }

  const options = {
    filterType: "checkbox",
    onRowsDelete: function (deleted, current) {
      // console.log("heyhey", deleted);
      for (let i = 0; i < deleted.data.length; i++) {
        // console.log("employe to delete:", data[deleted.data[i].index]);
        deleteEmployee(data[deleted.data[i].index][8]);
        // console.log("emplopyee:::", data[deleted.data[i].index][data.length - 1]);
      }
    },
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

  React.useState(() => {
    getData();
  }, []);

  // console.log("data:", data);

  return (
    <React.Fragment>
      {loading ? (
        <Container maxWidth="lg" style={{ marginTop: 300 }}>
          <MoonLoader
            css={override}
            size={200}
            color={"#4FAAE9"}
            loading={loading}
          />
        </Container>
      ) : (
        <React.Fragment>
          <Container maxWidth="lg" style={{ marginTop: 100 }}>
            <MUIDataTable
              title={"Employee List"}
              data={data}
              columns={columns}
              options={options}
            />
          </Container>
          <Dialer data={data} setData={setData} getData={getData} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
