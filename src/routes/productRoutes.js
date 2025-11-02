import express from 'express';
import validateRequest from '../middlewares/validateRequest.js';
import {
  createProductValidator,
  updateProductValidator,
  getProductsValidator,
} from '../validators/productValidator.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Routes
router.post('/', createProductValidator, validateRequest, createProduct);
router.get('/', getProductsValidator, validateRequest, getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProductValidator, validateRequest, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
