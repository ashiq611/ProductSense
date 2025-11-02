import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Product Management API',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      products: '/api/products',
    },
  });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// 404 Handler - Updated for Express v5
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handler (must be last)
app.use(errorHandler);

export default app;
