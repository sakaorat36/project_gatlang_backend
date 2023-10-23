const express = require("express");
const orderController = require("../controllers/order-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const uploadMiddleware = require("../middleware/upload");
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.post(
  "/create",
  authenticateMiddleware,
  uploadMiddleware.single("slipURL"),
  orderController.createOrder
);
router.patch(
  "/update/order-status/:orderId",
  authenticateMiddleware,
  orderController.updateOrderStatusById
);
router.get(
  "/:userId",
  authenticateMiddleware,
  orderController.getOrderByUserId
);

module.exports = router;
