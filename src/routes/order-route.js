const express = require("express");
const orderController = require("../controllers/order-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.post("/create", authenticateMiddleware, orderController.createOrder);
router.patch(
  "/update",
  authenticateMiddleware,
  orderController.updateOrderStatus
);
router.get(
  "/:userId",
  authenticateMiddleware,
  orderController.getOrderByUserId
);

module.exports = router;
