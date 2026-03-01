# E-Commerce Platform - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### For Customers

#### 1️⃣ Create Your Account

1. Go to **Register page**: `/pages/auth/register/register.html`
2. Fill in: Name, Username, Password, Address
3. Click **Sign Up**

#### 2️⃣ Login

1. Go to **Login page**: `/pages/auth/login/login.html`
2. Enter your Username and Password
3. Click **Login**

#### 3️⃣ Shop Products

1. Visit **Shop page** from navigation menu
2. Browse products or use filters:
   - **Price slider**: Adjust min/max price
   - **Categories**: Select product types
   - **Search**: Find specific items
3. Click on product to see details

#### 4️⃣ Add to Cart

1. On product details page
2. Select size/color (if applicable)
3. Choose quantity
4. Click **Add to Cart** 🛒

#### 5️⃣ Checkout & Order

1. Click cart icon in navbar
2. Review items and quantities
3. Click **Proceed to Checkout**
4. Fill shipping information
5. Select payment method (Cash on Delivery)
6. Click **Place Order** ✅

#### 6️⃣ Track Your Order

1. Go to **My Orders** from navbar
2. See all orders with status
3. Click order for details

---

### For Admins/Sellers

#### 1️⃣ Login as Admin

1. Login with Admin/Seller account
2. You'll be redirected to **Admin Dashboard**

#### 2️⃣ Manage Products

**Add New Product:**

1. Go to **Product List** (sidebar)
2. Click **Add Product** button
3. Fill in:
   - Product name
   - Description
   - Price
   - Category
   - Stock quantity
   - Images
4. Click **Save**

**Edit/Delete Product:**

- Click ✏️ edit icon to modify
- Click 🗑️ delete icon to remove

#### 3️⃣ Manage Orders

1. Go to **Orders List** (sidebar)
2. See all customer orders
3. Click order to view details
4. Update status:
   - Pending → Processing → Shipped → Delivered
5. Generate invoice if needed

#### 4️⃣ Manage Users

1. Go to **User List** (sidebar)
2. View all registered users
3. Edit user details or roles
4. Add new users manually

#### 5️⃣ Handle Support

1. Go to **Customer Service** (sidebar)
2. View customer inquiries
3. Respond to messages
4. Update status to "Resolved"

---

## 📋 Quick Reference

### Customer Features

| Feature         | Location        | Action                 |
| --------------- | --------------- | ---------------------- |
| Browse Products | Shop Page       | Filter, sort, search   |
| Product Details | Click product   | View info, add to cart |
| Shopping Cart   | Cart icon       | Manage quantities      |
| Wishlist        | Heart icon      | Save for later         |
| Checkout        | Cart → Checkout | Complete purchase      |
| My Orders       | Navbar menu     | Track orders           |
| Profile         | Profile icon    | Edit account info      |

### Admin Features

| Feature    | Location         | Action            |
| ---------- | ---------------- | ----------------- |
| Dashboard  | Admin Home       | View statistics   |
| Products   | Product List     | Add/Edit/Delete   |
| Categories | Category List    | Manage categories |
| Orders     | Orders List      | Process orders    |
| Users      | User List        | Manage accounts   |
| Support    | Customer Service | Handle inquiries  |
| Invoices   | Order Details    | Generate invoices |

---

## 🎯 Common Tasks

### How to Complete a Purchase (Customer)

```
Shop → Product Details → Add to Cart → Checkout → Place Order
```

### How to Process an Order (Admin)

```
Orders List → Click Order → Update Status → Generate Invoice
```

### How to Add a Product (Admin)

```
Product List → Add Product → Fill Details → Save
```

### How to Track an Order (Customer)

```
Login → My Orders → Click Order → View Status
```

---

## 💡 Pro Tips

### For Customers:

- ✅ Create an account to save your cart and wishlist
- ✅ Add items to wishlist to buy later
- ✅ Check "My Orders" for delivery status
- ✅ Save your address in profile for faster checkout

### For Admins:

- ✅ Update order status promptly
- ✅ Keep product stock updated
- ✅ Respond to customer inquiries quickly
- ✅ Check dashboard daily for insights
- ✅ Generate invoices for all orders

---

## 🔑 User Roles

| Role         | Access                            | Typical Users           |
| ------------ | --------------------------------- | ----------------------- |
| **Customer** | Shop, Cart, Orders, Profile       | Regular shoppers        |
| **Seller**   | Admin Dashboard, Products, Orders | Product vendors         |
| **Admin**    | Full Access                       | Platform administrators |

---

## ⚡ Keyboard Shortcuts

- **Search**: Click search bar on Shop page
- **Cart**: Click cart icon in navbar
- **Profile**: Click profile/user icon
- **Logout**: User menu → Logout

---

## 🆘 Need Help?

### Customer Support

- Go to **Contact Us** page
- Fill in contact form
- Submit your inquiry

### Admin Support

- Use **Customer Service** page
- Check documentation
- Contact system administrator

---

## 📱 Mobile Access

All pages are **fully responsive**:

- Mobile-friendly navigation
- Touch-optimized buttons
- Responsive product grid
- Mobile checkout flow

---

## 🔒 Security Tips

- ✅ Use strong passwords (min 6 characters)
- ✅ Don't share your login credentials
- ✅ Logout after using shared devices
- ✅ Keep your profile information updated

---

## 🎨 Page Structure

```
Homepage (index.html)
│
├── Shop (browse products)
│   └── Product Details (view item)
│       ├── Add to Cart
│       └── Add to Wishlist
│
├── Cart (review items)
│   └── Checkout (complete order)
│       └── Order Completion (confirmation)
│
├── My Orders (track purchases)
│   └── Order Details (view specific order)
│
├── Profile (manage account)
│
└── Admin Dashboard (admin only)
    ├── Product List (manage inventory)
    ├── Orders List (process orders)
    ├── User List (manage accounts)
    └── Customer Service (handle support)
```

---

## 📊 Order Status Guide

| Status         | Meaning          | Next Action               |
| -------------- | ---------------- | ------------------------- |
| **Pending**    | Order received   | Wait for processing       |
| **Processing** | Being prepared   | Items being packed        |
| **Shipped**    | Out for delivery | Track shipment            |
| **Delivered**  | Completed        | Enjoy your purchase!      |
| **Cancelled**  | Order cancelled  | Contact support if needed |

---

## 🛠️ Troubleshooting Quick Fixes

| Problem             | Solution                                   |
| ------------------- | ------------------------------------------ |
| Can't login         | Check username/password, try reset         |
| Cart empty          | Check if items were added, refresh page    |
| Order not showing   | Wait a moment, refresh, check login status |
| Page not loading    | Clear cache, try different browser         |
| Admin access denied | Verify your role is Admin/Seller           |

---

## 📞 Quick Links

- **Shop**: `/pages/shop/shop.html`
- **Login**: `/pages/auth/login/login.html`
- **Register**: `/pages/auth/register/register.html`
- **Cart**: `/pages/cart/cart.html`
- **My Orders**: `/pages/orders/orders.html`
- **Admin Dashboard**: `/pages/Areas/Admin/dashboard.html`

---

## ✨ Feature Highlights

### 🛒 Smart Shopping

- Advanced filtering (price, category, size, color)
- Product search
- Sort options (price, date, popularity)
- Wishlist for favorites

### 💳 Easy Checkout

- Simple one-page checkout
- Cash on Delivery payment
- Free online shipping
- Order confirmation

### 📦 Order Tracking

- Real-time status updates
- Order history
- Detailed order information
- Invoice generation

### 👨‍💼 Powerful Admin

- Complete dashboard
- Product management
- Order processing
- User management
- Customer service system

---

**Ready to start?** Open the application and follow the steps above! 🎉

For detailed information, refer to [Complete Documentation](PROJECT_DOCUMENTATION.md).
