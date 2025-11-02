import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { generateProductCode } from '../utils/productCodeGenerator.js';

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, discount, image, status, category } = req.body;
    
    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    
    // Generate unique product code
    let productCode = generateProductCode(name);
    
    // Ensure uniqueness by appending timestamp if needed
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      const existingProduct = await Product.findOne({ productCode });
      if (!existingProduct) {
        isUnique = true;
      } else {
        productCode = `${productCode}-${Date.now()}`;
        attempts++;
      }
    }
    
    const product = await Product.create({
      name,
      description,
      price,
      discount: discount || 0,
      image,
      status: status || 'In Stock',
      category,
      productCode,
    });
    
    // Populate category details
    await product.populate('category');
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        ...product.toObject(),
        originalPrice: product.price,
        finalPrice: product.finalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get products with filters
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .populate('category', 'name description')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments(query);
    
    // Format response with pricing
    const formattedProducts = products.map(product => ({
      ...product.toObject(),
      originalPrice: product.price,
      finalPrice: product.finalPrice,
    }));
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: formattedProducts,
    });
  } catch (error) {
    next(error);
  }
};

// Get product by ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name description');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        ...product.toObject(),
        originalPrice: product.price,
        finalPrice: product.finalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const { status, description, discount } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    // Update only allowed fields
    if (status) product.status = status;
    if (description) product.description = description;
    if (discount !== undefined) product.discount = discount;
    
    await product.save();
    await product.populate('category');
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: {
        ...product.toObject(),
        originalPrice: product.price,
        finalPrice: product.finalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
