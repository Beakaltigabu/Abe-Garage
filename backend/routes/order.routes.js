const express = require('express');
const router=express.Router();
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, getOrdersByCustomerId}= require("../controllers/order.controller");
const {authMiddleware}= require("../middlewares/auth.middleware");


router.get('/',
  authMiddleware.verifyToken, authMiddleware.isAdmin,
   getAllOrders );

router.get('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, getOrderById );

router.post('/',
  authMiddleware.verifyToken, authMiddleware.isAdmin,
  createOrder );

router.put('/:id',  authMiddleware.verifyToken, authMiddleware.isAdmin,  updateOrder );

router.delete('/:id',  authMiddleware.verifyToken, authMiddleware.isAdmin, deleteOrder);
router.get("/customer/:customer_id", getOrdersByCustomerId);





module.exports=router;
