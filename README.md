# CST E-Commerce Platform

A comprehensive e-commerce web application with customer shopping features and admin management capabilities.

## 🚀 Quick Links

- **[Complete Documentation](PROJECT_DOCUMENTATION.md)** - Full platform documentation

## 📋 Overview

This e-commerce platform provides a complete online shopping experience with:

- Product browsing with advanced filtering
- Shopping cart and wishlist functionality
- Secure checkout process
- Order tracking and management
- Admin dashboard for product, order, and user management
- Customer service system

## 🎯 Features

### For Customers

- ✅ Browse and search products
- ✅ Filter by price, category, size, and color
- ✅ Add products to cart and wishlist
- ✅ Complete checkout with shipping details
- ✅ Track order status
- ✅ Manage profile information
- ✅ Contact customer support

### For Admins/Sellers

- ✅ Comprehensive dashboard with analytics
- ✅ Product management (CRUD operations)
- ✅ Category management
- ✅ Order processing and status updates
- ✅ User account management
- ✅ Customer service ticket handling
- ✅ Invoice generation

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
- **Framework:** Bootstrap 5.3.8
- **Icons:** Bootstrap Icons, Font Awesome
- **Backend:** Firebase Realtime Database
- **Storage:** Local Storage for cart and session management

## 👥 User Roles

1. **Customer** - Browse products, place orders, track purchases
2. **Seller** - Manage products and orders
3. **Admin** - Full platform management access

## 📖 Documentation

### [Complete Documentation](PROJECT_DOCUMENTATION.md)

Comprehensive guide covering:

- Project overview
- All pages reference
- User stories
- Transaction workflows
- Feature descriptions
- Technical notes

### [Quick Start Guide](QUICK_START_GUIDE.md)

Get started quickly with:

- 5-minute setup for customers
- Admin quick start
- Common tasks reference
- Troubleshooting tips

### [User Stories](USER_STORIES.md)

Detailed requirements including:

- Customer user stories (34 stories)
- Admin user stories (26 stories)
- Seller user stories (3 stories)
- Acceptance criteria
- Priority matrix

### [Usage Guide](USAGE_GUIDE.md)

Practical examples and guidelines:

- Step-by-step customer workflows
- Admin task examples
- Code examples
- Best practices
- Common workflows

## 🚀 Getting Started

### For Customers

1. **Register an Account**
   - Navigate to `/pages/auth/register/register.html`
   - Fill in your details and create account

2. **Browse Products**
   - Go to Shop page
   - Use filters to find products
   - Click on products to view details

3. **Make a Purchase**
   - Add items to cart
   - Proceed to checkout
   - Enter shipping information
   - Place order

4. **Track Orders**
   - Visit "My Orders" page
   - View order status and details

### For Admins

1. **Login with Admin Credentials**
   - Use your admin username and password
   - You'll be redirected to the dashboard

2. **Manage Products**
   - Navigate to Product List
   - Add, edit, or delete products
   - Update stock levels

3. **Process Orders**
   - Check Orders List
   - Update order statuses
   - Generate invoices

4. **Manage Users**
   - Access User List
   - Edit user roles
   - Add new users

## 📁 Project Structure

```
CST-Project/
├── index.html              # Homepage
├── pages/
│   ├── shop/              # Product browsing
│   ├── product-details/   # Product information
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── orders/            # Order tracking
│   ├── profile/           # User profile
│   ├── wishlist/          # Saved items
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   └── Areas/Admin/       # Admin pages
│       ├── dashboard.html
│       ├── product-list.html
│       ├── orders-list.html
│       └── user-list.html
├── services/              # API services
├── shared/                # Shared components
│   ├── models/           # Data models
│   ├── navbar/           # Navigation bar
│   ├── footer/           # Footer
│   └── js/               # Utility scripts
└── assets/               # Images and media
```

## 🔑 Key Pages

### Public Pages

- **Homepage** (`/index.html`) - Landing page with featured products
- **Shop** (`/pages/shop/shop.html`) - Product catalog
- **Product Details** (`/pages/product-details/product-details.html`) - Individual product
- **About Us** (`/pages/about/about-us.html`) - Company information
- **Contact** (`/pages/contact/contact-us.html`) - Contact form

### Customer Pages (Login Required)

- **Cart** (`/pages/cart/cart.html`) - Shopping cart
- **Checkout** (`/pages/checkout/checkout.html`) - Order checkout
- **My Orders** (`/pages/orders/orders.html`) - Order history
- **Profile** (`/pages/profile/profile.html`) - User profile

### Admin Pages (Admin/Seller Role Required)

- **Dashboard** (`/pages/Areas/Admin/dashboard.html`) - Admin overview
- **Product List** (`/pages/Areas/Admin/product-list.html`) - Product management
- **Orders List** (`/pages/Areas/Admin/orders-list.html`) - Order management
- **User List** (`/pages/Areas/Admin/user-list.html`) - User management
- **Customer Service** (`/pages/Areas/Admin/customer-service.html`) - Support tickets

## 💡 Common Tasks

### How to Browse Products

1. Visit Shop page
2. Use filters: price, category, size, color
3. Search by product name
4. Sort by price or date

### How to Place an Order

1. Add items to cart
2. Click cart icon → "Proceed to Checkout"
3. Enter shipping details
4. Select payment method
5. Click "Place Order"

### How to Add a Product (Admin)

1. Login as Admin
2. Go to Product List
3. Click "Add Product"
4. Fill in details
5. Save product

### How to Process an Order (Admin)

1. Go to Orders List
2. Click on order
3. Update status: Pending → Processing → Shipped → Delivered
4. Generate invoice if needed

## 🔧 Development

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for Firebase and CDN resources)
- Firebase account (for database access)

### Setup

1. Clone the repository
2. Configure Firebase credentials in services files
3. Open `index.html` in a browser
4. No build process required (vanilla JavaScript)

### Firebase Configuration

Update the BASE_URL in service files:

```javascript
const BASE_URL = "your-firebase-database-url";
```

## 📊 Database Structure

### Firebase Collections

- `/users` - User accounts
- `/products` - Product catalog
- `/orders` - Customer orders
- `/categories` - Product categories

### Local Storage

- `cart` - Shopping cart items
- `wishlist` - Saved products
- `isLoggedIn` - Authentication status
- `currentUser` - Current user data

## 🎨 UI Components

- **Navbar** - Responsive navigation with cart/wishlist icons
- **Footer** - Site footer with links
- **Product Cards** - Reusable product display
- **Admin Sidebar** - Admin navigation menu
- **Toast Notifications** - Success/error messages

## 🔒 Security

- Role-based access control
- Client-side authentication (session-based)
- Form validation on all inputs
- Secure password requirements (min 6 characters)
- Protected admin routes

## 📱 Responsive Design

- Mobile-first approach
- Bootstrap 5 responsive grid
- Touch-friendly buttons
- Mobile navigation menu
- Optimized for all screen sizes

## 🐛 Troubleshooting

### Common Issues

**Cart items disappearing:**

- Enable cookies and local storage
- Don't use private/incognito mode

**Can't login:**

- Check username/password (case-sensitive)
- Use "Forgot Password" if needed
- Clear browser cache

**Products not showing:**

- Check product status is "Active"
- Verify stock > 0
- Clear browser cache

**Order status not updating:**

- Wait 24-48 hours for processing
- Contact customer service
- Admin: Check database connection

## 📞 Support

For issues or questions:

- Review documentation files
- Use Contact Us page on website
- Check troubleshooting sections

## 👨‍💻 Contributors

CST Project Team

## 📄 License

All rights reserved.

---

**Last Updated:** March 2, 2026  
**Version:** 1.0

For detailed information, please refer to the documentation files:

- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
- [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)
- [USER_STORIES.md](USER_STORIES.md)
- [USAGE_GUIDE.md](USAGE_GUIDE.md)
