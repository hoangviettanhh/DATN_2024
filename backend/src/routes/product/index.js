const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const asyncHandler = require("../../helpers/asyncHandler");
const accessController = require("../../controllers/authController");
const  {authentication,authorization}= require("../../auth/auth.Utils");
// Lấy danh sách sản phẩm
router.get('/products', productController.getAllProducts);

router.get('/categorys', productController.getAllCategory);
// Lấy sản phẩm theo ID
router.get('/products/:id', productController.getProductById);

router.get('/products-hehe', productController.getProductsByCategoryAndPriceRange);

// Thêm sản phẩm mới
router.post('/products', productController.createProduct);

// Cập nhật sản phẩm
router.put('/products/:id', productController.updateProduct);

// Xóa sản phẩm
router.delete('/products/:id', productController.deleteProduct);



module.exports = router;
