const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/create", productController.createProduct);
router.patch("/update", productController.updateProduct);
router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;
