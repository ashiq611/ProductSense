# Product Management API

A RESTful API for managing products and categories built with Express.js, MongoDB, and Mongoose.

## Features

- ✅ Create products with auto-generated unique product codes
- ✅ Category-based product organization
- ✅ Update product status, description, and discount
- ✅ Filter products by category
- ✅ Search products by name
- ✅ Automatic price calculation with discounts
- ✅ Input validation and error handling
- ✅ Pagination support

## Postman Collection Document
- Published Link : https://documenter.getpostman.com/view/33549775/2sB3WpRLdK

## Database Design

### Entity Relationship Diagram

┌─────────────────────────────────────┐
│ Category │
├─────────────────────────────────────┤
│ _id: ObjectId (PK) │
│ name: String (unique) │
│ description: String │
│ isActive: Boolean │
│ createdAt: Date │
│ updatedAt: Date │
└─────────────────────────────────────┘
│
│ 1
│
│ has many
│
│ N
▼
┌─────────────────────────────────────┐
│ Product │
├─────────────────────────────────────┤
│ _id: ObjectId (PK) │
│ name: String │
│ description: String │
│ price: Number │
│ discount: Number (0-100) │
│ image: String (URL) │
│ status: String (enum) │
│ productCode: String (unique) │
│ category: ObjectId (FK) ───────────►│
│ createdAt: Date │
│ updatedAt: Date │
│ finalPrice: Virtual Field │
└─────────────────────────────────────┘


### Relationships

- **One-to-Many**: One Category can have many Products
- **Foreign Key**: Product.category references Category._id

## Installation

1. Clone the repository
git clone <repository-url>
cd product-management-api


2. Install dependencies
npm install


3. Configure environment variables
Create a `.env` file in the root directory:
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.gtntxtu.mongodb.net/product
NODE_ENV=development


4. Start MongoDB
For local MongoDB
mongod

Or use MongoDB Atlas connection string

5. Run the application
Development mode
npm run dev

Production mode
npm start



## API Endpoints

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/categories` | Create a category |
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create a product |
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |


### Create Category
POST /api/categories
Content-Type: application/json

{
"name": "Electronics",
"description": "Electronic devices and accessories"
}


### Create Product
POST /api/products
Content-Type: application/json

{
"name": "Alpha Sorter",
"description": "High-performance sorting device with advanced algorithms",
"price": 299.99,
"discount": 10,
"image": "https://example.com/image.jpg",
"status": "In Stock",
"category": "64f5a3b2c1d2e3f4a5b6c7d8"
}


### Get Products with Filters
Filter by category
GET /api/products?category=64f5a3b2c1d2e3f4a5b6c7d8

Search by name
GET /api/products?search=Alpha

With pagination
GET /api/products?page=1&limit=10

Combined filters
GET /api/products?category=64f5a3b2c1d2e3f4a5b6c7d8&search=Alpha&page=1&limit=5


### Update Product
PUT /api/products/64f5a3b2c1d2e3f4a5b6c7d9
Content-Type: application/json

{
"status": "Stock Out",
"discount": 15,
"description": "Updated product description"
}


## Product Code Generation Algorithm

The product code is auto-generated using the following rules:

1. Extract the longest strictly increasing substring from the product name (lowercase, consecutive alphabetical order)
2. If multiple equal-length substrings exist, concatenate them
3. Record the starting and ending indices in the original name
4. Generate an MD5 hash of the product name (first 8 characters)
5. Format: `<hash>-<startIndex><substring><endIndex>`

### Example
**Product Name:** "Alpha Sorter"

- Longest increasing substrings: "alp" (from "Alpha") and "ort" (from "Sorter")
- Concatenated: "alport"
- Start index: 0, End index: 8
- Hash: "p48asd4" (example)
- **Generated Code:** `p48asd4-0alport8`

## Error Handling

The API returns consistent error responses:

{
"success": false,
"message": "Error description",
"errors": {
"fieldName": ["Error message 1", "Error message 2"]
}
}

text

## Response Format

Success responses follow this structure:

{
"success": true,
"message": "Operation successful",
"data": { ... },
"count": 10,
"total": 100,
"page": 1,
"totalPages": 10
}

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **express-validator** - Input validation
- **crypto** - Hash generation
- **dotenv** - Environment configuration
- **cors** - Cross-origin resource sharing

## License

MIT