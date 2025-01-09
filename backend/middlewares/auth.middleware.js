require("dotenv").config();
const jwt = require("jsonwebtoken");
const employeeService = require("../services/employee.service");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send({
      status: "fail",
      message: "No token provided!",
    });
  }

  const token = authHeader.split(" ")[1];


  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token Verification Error:", err);
      return res.status(401).send({
        status: "fail",
        message: "Unauthorized!",
      });
    }
    req.employee_email = decoded.email;
    req.employee_id = decoded.id;
    next();
  });
};

// A function to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const employee_email = req.employee_email;
  const employee = await employeeService.getEmployeeByEmail(employee_email);
  console.log(employee[0] && employee[0].company_role_name === "Admin");
  if (employee[0] && employee[0].company_role_name === 'Admin') {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      message: "Not an Admin!",
    });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin,
};

module.exports = { authMiddleware };
