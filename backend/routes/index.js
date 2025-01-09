// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();

// Import the install router

const installRouter = require('./install.routes');


//Order Routes
const ordersRoute=require('./order.routes')
router.use('/api/orders', ordersRoute);


// Add the install router to the main router
router.use(installRouter);




// Import the employee router
const employeeRouter = require("./employee.routes");

// Import the employee router
const loginRouter = require("./login.routes");

router.use(loginRouter);




// Add the employee router to the main router
router.use(employeeRouter);

const serviceRouter=require("./service.routes")
router.use(serviceRouter);

// Import the vehicle router
const vehicleRoute= require('./vehicle.routes')
// Add the vehicle router to the main router
router.use(vehicleRoute)

const customerRoutes = require("./customer.routes");


router.use(customerRoutes);


//const customerRoutes = require("./customer.routes");


router.use(customerRoutes);





// Export the router
module.exports = router;
