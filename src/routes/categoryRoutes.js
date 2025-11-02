import express from 'express';
import validateRequest from '../middlewares/validateRequest.js';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
} from '../controllers/categoryController.js';
import { categoryValidator } from '../validators/categoryValidator.js';

const router = express.Router();



// Routes
router.post('/', categoryValidator, validateRequest, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

export default router;
