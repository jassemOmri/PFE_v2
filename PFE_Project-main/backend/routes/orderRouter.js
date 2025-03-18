const express = require("express");
const { getOrders, confirmOrder } = require("../controller/orderController");
const router = express.Router();

router.get("/orders", getOrders);
router.put("/orders/:orderId", confirmOrder);

module.exports = router;
