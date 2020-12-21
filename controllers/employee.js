const Employee = require("../models/Employee");
require("dotenv").config();

// @desc      Add employee
// @route     POST /api/employee/
// @access    Public
exports.addEmployee = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      car,
      model,
      color,
      license,
      department,
    } = req.body;

    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      phone === "" ||
      phone === undefined ||
      car === "" ||
      car === undefined ||
      model === "" ||
      model === undefined ||
      color === "" ||
      color === undefined ||
      license === "" ||
      license === undefined ||
      department === "" ||
      department === undefined
    ) {
      res.json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    await Employee.create({
      name,
      email,
      phone,
      car,
      model,
      color,
      license,
      department,
      createdBy: req.session.user.userId,
    });

    res.json({
      success: true,
      data: req.body,
    });
  } catch (err) {
    if (err.message.includes("E11000")) {
      // return next(new DuplicateUser("Email already in use").response());
      res.json({
        success: false,
        message: "Email of employee must be unique",
      });
    }
    // res.status(400).json(err.message);
    console.log(err);
    // return next(new GeneralError("Server error").response());
    res.json({
      success: false,
      message: "Server error, please contact admin",
    });
  }
};

// @desc      Get all employees
// @route     GET /api/employee
// @access    Private
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({
      createdBy: req.session.user.userId,
    });

    if (!employees) {
      // return next(new BadRequest("No employees").response());
      res.json({
        success: true,
        data: [],
      });
    } else {
      res.json({
        success: true,
        data: employees,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server error, please contact admin",
    });
  }
};

// @desc      Update single employee
// @route     PUT /api/employee/:id
// @access    Private
exports.updateEmployee = async (req, res, next) => {
  try {
    let employee = await Employee.findById(req.params.id);

    // check if employee exists
    if (!employee) {
      // return next(new BadRequest("No employee found with that ID").response());
      res.json({
        success: false,
        message: "No employee found with that ID",
      });
    }

    // check if call is from owner
    if (req.session.user.userId.toString() !== employee.createdBy.toString()) {
      // return next(new BadRequest("Not authorized to update").response());
      res.json({
        success: false,
        message: "Not authorized to update",
      });
    }

    // check if body data is not empty
    const {
      name,
      email,
      phone,
      car,
      model,
      color,
      license,
      department,
    } = req.body;

    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      phone === "" ||
      phone === undefined ||
      car === "" ||
      car === undefined ||
      model === "" ||
      model === undefined ||
      color === "" ||
      color === undefined ||
      license === "" ||
      license === undefined ||
      department === "" ||
      department === undefined
    ) {
      // return next(new BadRequest("Please dont send in empty data").response());
      res.json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    // remove extra id field
    delete req.body.id;

    // update employee
    employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
    employee.save();

    res.json({
      success: true,
      data: employee,
    });
  } catch (err) {
    console.log(err);
    // return next(new GeneralError("Server error").response());
    res.json({
      success: false,
      message: "Server error... please contact admin",
    });
  }
};

// @desc      Delete single employee
// @route     Delete /api/employee/:id
// @access    Private
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    // check if employee exists
    if (!employee) {
      // return next(new BadRequest("No employee found with that ID").response());
      res.json({
        success: false,
        message: "No employee found with that ID",
      });
    }

    // check if call is from owner
    if (req.session.user.userId.toString() !== employee.createdBy.toString()) {
      // return next(new BadRequest("Not authorized to delete").response());
      res.json({
        success: false,
        message: "Not authorized to delete",
      });
    }

    // update employee
    await employee.remove();

    res.json({
      success: true,
      data: employee,
    });
  } catch (err) {
    console.log(err);
    // return next(new GeneralError("Server error").response());
    res.json({
      success: false,
      message: "Server error... please contact admin",
    });
  }
};
