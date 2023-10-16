const express = require("express");
const paymentController = require("../controllers/payment-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const router = express.Router();

router.patch(
  "/update",
  authenticateMiddleware,
  paymentController.updatePaymentStatus
);

module.exports = router;
