// Import the login service
const { logIn } = require("../services/login.service");
// Import the jsonwebtoken module
async function logInHandler(req, res) {
  try {
    const { employee_email, employee_password } = req.body;

    // Debugging: Log the incoming request body
    

    if (!employee_email || !employee_password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const employee = await logIn(employee_email, employee_password);

    // Debugging: Log the returned employee object
  

    return res.status(200).json({
      status: "success",
      employee: {
        employee_first_name: employee.employee_first_name,
        employee_email: employee.employee_email,
        employee_id: employee.employee_id,
        role: employee.role, // Ensure role is included here
        token: employee.token,
        // Include the token in the response
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
module.exports = {
  logInHandler,
};