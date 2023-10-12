const express = require("express");
const orderController = require("../controllers/order-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const router = express.Router();

router.post("/create", authenticateMiddleware, orderController.createOrder);
router.patch("/update", authenticateMiddleware, orderController.updateOrder);

module.exports = router;
