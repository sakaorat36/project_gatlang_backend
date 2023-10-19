const express = require("express");
const productController = require("../controllers/product-controller");
const uploadMiddleware = require("../middleware/upload");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.post(
  "/create",
  authenticate,
  uploadMiddleware.single("image"),
  productController.createProduct
);
router.patch("/update", productController.updateProduct);
router.delete("/delete/:productId", productController.deleteProduct);
router.patch(
  "/update/product-status/:productId",
  productController.updateStatusProductById
);

module.exports = router;
