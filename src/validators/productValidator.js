import { body, query } from 'express-validator';

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('discount')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount must be between 0 and 100'),
  
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Product image URL is required')
    .isURL()
    .withMessage('Image must be a valid URL'),
  
  body('status')
    .optional()
    .isIn(['In Stock', 'Stock Out'])
    .withMessage('Status must be either "In Stock" or "Stock Out"'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid category ID'),
];

export const updateProductValidator = [
  body('status')
    .optional()
    .isIn(['In Stock', 'Stock Out'])
    .withMessage('Status must be either "In Stock" or "Stock Out"'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  
  body('discount')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount must be between 0 and 100'),
];

export const getProductsValidator = [
  query('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),
  
  query('search')
    .optional()
    .trim(),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];
