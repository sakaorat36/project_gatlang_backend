const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();

router.post("/create", productController.createProduct);
router.patch("/update", productController.updateProduct);
router.delete("/delete/:productId", productController.deleteProduct);
router.get("/products", productController.getAllProducts);

module.exports = router;
