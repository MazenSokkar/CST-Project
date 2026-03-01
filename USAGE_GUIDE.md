# E-Commerce Platform - Usage Guidelines & Examples

## Table of Contents

1. [Customer Usage Examples](#customer-usage-examples)
2. [Admin Usage Examples](#admin-usage-examples)
3. [Seller Usage Examples](#seller-usage-examples)
4. [Code Examples](#code-examples)
5. [Best Practices](#best-practices)
6. [Common Workflows](#common-workflows)

---

## Customer Usage Examples

### Example 1: First-Time Purchase

**Scenario:** Sarah wants to buy shoes for the first time on your platform.

#### Step-by-Step Instructions:

**1. Create an Account**

```
1. Open homepage: http://yourwebsite.com/index.html
2. Click "Sign Up" or "Register" in the navigation bar
3. Fill in the registration form:
   - Name: "Sarah Johnson"
   - Username: "sarah.johnson@email.com"
   - Password: "SecurePass123"
   - Address: "123 Main St, New York, NY 10001"
   - Role: "Customer" (default)
4. Click "Sign Up" button
5. You'll be redirected to login page with success message
```

**2. Login to Your Account**

```
1. Enter Username: "sarah.johnson@email.com"
2. Enter Password: "SecurePass123"
3. Click "Login"
4. You'll be redirected to the homepage, now logged in
```

**3. Browse for Shoes**

```
1. Click "Shop" in the navigation menu
2. In the left sidebar (or mobile filter button), select filters:
   - Category: Check "Shoes"
   - Price: Drag slider to $50-$150
   - Size: Select "8"
   - Color: Choose "Black"
3. Products will automatically filter to match your criteria
4. Sort by: "Price: Low to High" to see affordable options first
```

**4. View Product Details**

```
1. Click on a shoe product you like
2. On the product details page, review:
   - Product images (multiple angles)
   - Description and features
   - Price: $89.99
   - Available sizes and colors
   - Customer reviews (if available)
3. Select your size: "8"
4. Select color: "Black"
5. Quantity: "1"
```

**5. Add to Cart**

```
1. Click "Add to Cart" button
2. You'll see:
   - Success notification "Product added to cart"
   - Cart icon in navbar updates to show "1" item
3. Continue shopping or proceed to cart
```

**6. Review Cart**

```
1. Click cart icon in navbar
2. Review your cart:
   - Product: Running Shoes - Black - Size 8
   - Price: $89.99
   - Quantity: 1
   - Subtotal: $89.99
3. Update quantity if needed using +/- buttons
4. Remove items if changed your mind
```

**7. Proceed to Checkout**

```
1. Click "Proceed to Checkout" button
2. On checkout page, shipping form may be pre-filled from registration
3. Verify/update shipping information:
   - Email: sarah.johnson@email.com
   - Phone: +1 (555) 123-4567
   - Address: 123 Main St
   - City: New York
   - State: NY
4. Add order notes (optional): "Please ring doorbell"
```

**8. Complete Order**

```
1. Select Shipping Method: "Online Shipping - Free"
2. Select Payment Method: "Cash on Delivery (COD)"
3. Review Order Summary on right sidebar:
   - Subtotal: $89.99
   - Shipping: Free
   - Total: $89.99
4. Click "Place Order" button
5. Wait for confirmation
```

**9. Order Confirmation**

```
1. You're redirected to Order Completion page
2. Note your Order ID: #12345
3. Expected delivery: 3-5 business days
4. Options:
   - View Order Details
   - Continue Shopping
```

**10. Track Your Order**

```
1. From navbar, click "My Orders"
2. See your order: #12345 - Status: "Pending"
3. Click on order to see full details
4. Check back later to see status updates:
   Pending → Processing → Shipped → Delivered
```

---

### Example 2: Using Wishlist

**Scenario:** Michael wants to save products for later purchase.

#### Instructions:

**1. Browse Products**

```
1. Navigate to Shop page
2. Browse various products
3. Find a product you like but not ready to buy
```

**2. Add to Wishlist**

```
1. Click the heart icon (♡) on product card or details page
2. Heart icon fills in (♥) to show it's saved
3. Success message: "Added to wishlist"
4. Continue browsing and saving more items
```

**3. View Wishlist**

```
1. Click "Wishlist" in navbar (or heart icon)
2. See all your saved items
3. Each item shows:
   - Product image
   - Name and price
   - "Add to Cart" button
   - "Remove" button
```

**4. Move to Cart**

```
1. When ready to purchase, click "Add to Cart" on wishlist item
2. Item moves to cart
3. Option to remove from wishlist after adding to cart
```

---

### Example 3: Managing Profile

**Scenario:** Update your address after moving.

#### Instructions:

**1. Access Profile**

```
1. Click on profile icon/name in navbar
2. Select "My Profile" or "Profile" from dropdown
3. Profile page loads with current information
```

**2. Edit Information**

```
1. Click "Edit Profile" button
2. Form fields become editable
3. Update your address:
   Old: "123 Main St, New York, NY 10001"
   New: "456 Oak Ave, Los Angeles, CA 90001"
4. Optionally update name or other details
5. Click "Save Changes"
6. Success message: "Profile updated successfully"
```

**3. Verify Changes**

```
1. Information updates immediately on profile page
2. Next checkout will use new address by default
```

---

### Example 4: Tracking Order Status

**Scenario:** Check when your order will arrive.

#### Instructions:

**1. Access Orders**

```
1. Login to your account
2. Click "My Orders" in navbar
3. See list of all your orders
```

**2. Find Your Order**

```
1. Locate order by date or order ID
2. Check status column:
   - Pending (orange)
   - Processing (blue)
   - Shipped (purple)
   - Delivered (green)
   - Cancelled (red)
```

**3. View Details**

```
1. Click on the order row
2. Order Details page shows:
   - Current status with visual indicator
   - Estimated delivery date
   - Tracking number (if shipped)
   - Complete item list
   - Shipping address
   - Payment information
```

**4. Check Status Updates**

```
Timeline view (if implemented):
✓ Order Placed - March 1, 2026 10:30 AM
✓ Confirmed - March 1, 2026 11:00 AM
✓ Processing - March 2, 2026 9:00 AM
→ Shipped - Expected March 3, 2026
  Delivered - Expected March 5, 2026
```

---

## Admin Usage Examples

### Example 1: Adding a New Product

**Scenario:** Admin needs to add a new t-shirt product to the catalog.

#### Step-by-Step Instructions:

**1. Login as Admin**

```
1. Go to login page
2. Enter admin credentials
3. You'll be redirected to Admin Dashboard
```

**2. Navigate to Products**

```
1. Look at left sidebar
2. Click "Product List" or "Products"
3. Product List page loads showing all existing products
```

**3. Open Add Product Form**

```
1. Click "Add Product" button (top right or top bar)
2. Product form opens (modal or new page)
```

**4. Fill Product Information**

```
Complete the form with product details:

Product Name: "Premium Cotton T-Shirt"

Description: "High-quality 100% cotton t-shirt with comfortable fit.
Perfect for casual wear. Machine washable."

Price: 29.99

Category: Select "Clothing" from dropdown

Stock Quantity: 100

Available Sizes:
☑ XS
☑ S
☑ M
☑ L
☑ XL
☑ XXL

Available Colors:
☑ White
☑ Black
☑ Navy Blue
☑ Gray

Status: Active (dropdown)

Product Images:
[Upload] - Click to select images
- tshirt-front.jpg
- tshirt-back.jpg
- tshirt-detail.jpg
```

**5. Save Product**

```
1. Review all information
2. Click "Save Product" or "Add Product" button
3. Wait for confirmation
4. Success message: "Product added successfully"
5. Product appears in product list
6. Product is now visible to customers on shop page
```

**6. Verify Product**

```
1. Click on the new product in admin list to view details
2. Verify all information is correct
3. Open shop page in new tab to see customer view
4. Search for product name to find it
```

---

### Example 2: Processing an Order

**Scenario:** New order received, admin needs to process and ship it.

#### Instructions:

**1. Check Dashboard for New Orders**

```
1. Login to admin dashboard
2. On dashboard homepage, see notification:
   "Pending Orders: 5" (badge shows count)
3. Recent orders widget shows newest orders
```

**2. Navigate to Orders List**

```
1. Click "Orders List" in sidebar
2. See all orders in table format
3. Use filter dropdown: Select "Pending" to see unprocessed orders
```

**3. View Order Details**

```
1. Find order #12345 (Sarah Johnson's shoe order)
2. Click on the order row
3. Order Details page shows:

   Order ID: #12345
   Date: March 1, 2026 10:30 AM
   Status: Pending

   Customer Information:
   - Name: Sarah Johnson
   - Email: sarah.johnson@email.com
   - Phone: +1 (555) 123-4567

   Shipping Address:
   123 Main St
   New York, NY 10001

   Items:
   - Running Shoes - Black - Size 8
     Qty: 1 × $89.99 = $89.99

   Payment Method: Cash on Delivery
   Shipping Method: Online Shipping - Free

   Order Notes: "Please ring doorbell"

   Subtotal: $89.99
   Shipping: $0.00
   Total: $89.99
```

**4. Verify Payment and Inventory**

```
1. Check payment method: COD (collect on delivery)
2. Verify inventory:
   - Check if Running Shoes in stock
   - If yes, proceed
   - If no, contact customer about delay
```

**5. Update Status to Processing**

```
1. Find Status dropdown on order details page
2. Change from "Pending" to "Processing"
3. Click "Update Status" or change auto-saves
4. Status badge changes color
5. Customer can now see order is being prepared
```

**6. Prepare Items for Shipment**

```
1. Pull items from inventory:
   - 1 × Running Shoes - Black - Size 8
2. Pack items securely
3. Print packing slip (from order details)
4. Update inventory in product management
```

**7. Update Status to Shipped**

```
1. Once shipped, return to order details
2. Change status to "Shipped"
3. Add tracking number (if field available): "TRACK123456789"
4. Update estimated delivery date: "March 5, 2026"
5. Save changes
6. Customer receives notification (if implemented)
```

**8. Generate Invoice**

```
1. Click "Generate Invoice" button on order details
2. Invoice page opens with professional layout
3. Verify all information:
   - Company details
   - Customer details
   - Itemized list
   - Totals
4. Options:
   - Print invoice
   - Download PDF
   - Email to customer
5. Click "Print" or "Download"
```

**9. Follow Up**

```
1. After expected delivery date, check with courier
2. Update status to "Delivered" once confirmed
3. Order complete
```

---

### Example 3: Managing User Accounts

**Scenario:** Admin needs to promote a customer to seller role.

#### Instructions:

**1. Navigate to User List**

```
1. From admin dashboard sidebar
2. Click "User List" or "Users"
3. User list table loads
```

**2. Search for User**

```
1. Use search bar at top
2. Type user's name: "John Smith"
3. User appears in filtered results
```

**3. View User Information**

```
Current user details:
- ID: 1005
- Name: John Smith
- Username: john.smith@email.com
- Role: Customer
- Address: 789 Elm St, Chicago, IL
- Registration Date: February 15, 2026
```

**4. Edit User**

```
1. Click edit icon (pencil) next to user
2. Edit form opens with pre-filled data
3. Change Role dropdown:
   From: "Customer"
   To: "Seller"
4. Optionally update other information
5. Click "Save Changes"
6. Success message: "User updated successfully"
```

**5. Verify Access Change**

```
1. User can now access admin pages
2. User has seller permissions:
   - Can add/edit products
   - Can view orders
   - Can access dashboard
3. Notify user via email about role change
```

---

### Example 4: Handling Customer Service Inquiry

**Scenario:** Customer sent a message asking about product availability.

#### Instructions:

**1. Access Customer Service**

```
1. From admin sidebar
2. Click "Customer Service"
3. See list of inquiries
4. Notice notification badge: "3 New"
```

**2. View Inquiry**

```
1. Find inquiry from Emma Wilson
2. Status: "New" (highlighted)
3. Subject: "Product Availability Question"
4. Date: March 2, 2026 2:00 PM
5. Click to open
```

**3. Read Message**

```
From: Emma Wilson
Email: emma.w@email.com
Subject: Product Availability Question
Date: March 2, 2026 2:00 PM

Message:
"Hi, I'm interested in the Premium Cotton T-Shirt in size XL
in Red color. I don't see it listed on the product page. Will
it be available soon? Thank you!"
```

**4. Check Product Availability**

```
1. Open Product List in new tab
2. Search for "Premium Cotton T-Shirt"
3. Check available colors: White, Black, Navy Blue, Gray
4. Red is not available
5. Check if Red can be added to inventory
```

**5. Compose Response**

```
1. In the inquiry details page
2. Find "Reply" or "Response" text area
3. Type response:

"Dear Emma,

Thank you for your interest in our Premium Cotton T-Shirt!

Unfortunately, we currently don't have the XL size in Red color.
However, we are expecting a new shipment of Red t-shirts in all
sizes by March 15, 2026.

Would you like me to notify you when it becomes available?
Alternatively, we have the XL size available in Navy Blue,
which is a similar tone.

Please let me know how you'd like to proceed.

Best regards,
Customer Service Team"

4. Click "Send Reply"
```

**6. Update Status**

```
1. Change status dropdown from "New" to "In Progress"
2. Set priority: "Medium"
3. Save changes
4. Customer receives email with response
```

**7. Follow Up**

```
1. When Red t-shirts arrive (March 15)
2.Return to inquiry
3. Send follow-up message:
   "Hi Emma, the Red XL t-shirts are now available!"
4. Update status to "Resolved"
5. Close inquiry
```

---

## Seller Usage Examples

### Example 1: Seller Adding Their Product

**Scenario:** Seller wants to add their own product to sell.

#### Instructions:

**1. Login as Seller**

```
1. Use seller credentials to login
2. Redirected to Admin Dashboard
3. See seller-specific stats (if implemented)
```

**2. Add Product**

```
Same process as Admin (see Example 1 above)
1. Navigate to Product List
2. Click "Add Product"
3. Fill in product details
4. Save product
```

**3. Manage Own Inventory**

```
1. View product list
2. See only own products (if filtered)
3. Edit stock levels
4. Update product information
5. Activate/deactivate listings
```

**4. Monitor Sales**

```
1. Dashboard shows:
   - My Total Sales
   - My Products Sold
   - My Pending Orders
2. View orders containing your products
3. Generate sales reports
```

---

## Code Examples

### Example 1: Adding Item to Cart (JavaScript)

```javascript
// cart.js - Example of adding product to cart

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../shared/js/local-storage-management.js";

function addToCart(product, quantity, size, color) {
  // Get existing cart from local storage
  let cart = getFromLocalStorage("cart") || [];

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(
    (item) =>
      item.id === product.id && item.size === size && item.color === color,
  );

  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: size,
      color: color,
      subtotal: product.price * quantity,
    };
    cart.push(cartItem);
  }

  // Save updated cart to local storage
  saveToLocalStorage("cart", cart);

  // Update cart icon count
  updateCartCount();

  // Show success message
  showToast("Product added to cart!", "success");
}

// Example usage:
const product = {
  id: 101,
  name: "Running Shoes",
  price: 89.99,
  image: "shoe.jpg",
};

addToCart(product, 1, "8", "Black");
```

---

### Example 2: Filtering Products (JavaScript)

```javascript
// shop.js - Example of filtering products

function filterProducts() {
  // Get filter values
  const minPrice = document.getElementById("priceMin").value;
  const maxPrice = document.getElementById("priceMax").value;
  const selectedCategories = getSelectedCheckboxes("category");
  const selectedSizes = getSelectedCheckboxes("size");
  const selectedColors = getSelectedCheckboxes("color");
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();

  // Get all products
  const allProducts = getAllProducts(); // From product service

  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
    // Price filter
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }

    // Size filter
    if (
      selectedSizes.length > 0 &&
      !product.sizes.some((size) => selectedSizes.includes(size))
    ) {
      return false;
    }

    // Color filter
    if (
      selectedColors.length > 0 &&
      !product.colors.some((color) => selectedColors.includes(color))
    ) {
      return false;
    }

    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) {
      return false;
    }

    return true;
  });

  // Display filtered products
  displayProducts(filteredProducts);
}

function getSelectedCheckboxes(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map((cb) => cb.value);
}

// Event listeners for filters
document.getElementById("priceMin").addEventListener("input", filterProducts);
document.getElementById("priceMax").addEventListener("input", filterProducts);
document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", filterProducts);
});
```

---

### Example 3: Order Placement (JavaScript)

```javascript
// checkout.js - Example of placing an order

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../shared/js/local-storage-management.js";
import { AddOrder } from "../../services/orders.service.js";
import { Order } from "../../shared/models/order.model.js";

async function placeOrder(event) {
  event.preventDefault();

  // Get form data
  const form = document.getElementById("checkoutForm");
  const formData = new FormData(form);

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Get cart items
  const cartItems = getFromLocalStorage("cart") || [];

  if (cartItems.length === 0) {
    showToast("Your cart is empty", "error");
    return;
  }

  // Get current user
  const currentUser = getFromLocalStorage("currentUser");

  if (!currentUser) {
    showToast("Please login to place order", "error");
    window.location.href = "/pages/auth/login/login.html";
    return;
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingCost = 0; // Free shipping
  const total = subtotal + shippingCost;

  // Create order object
  const order = new Order(
    null, // ID will be generated
    currentUser.Id,
    cartItems,
    {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      apartment: formData.get("apartment"),
      city: formData.get("city"),
      state: formData.get("state"),
    },
    document.getElementById("paymentMethodSelect").value,
    document.getElementById("shippingMethodSelect").value,
    subtotal,
    shippingCost,
    total,
    "Pending",
    new Date().toISOString(),
    formData.get("notes"),
  );

  try {
    // Save order to database
    const savedOrder = await AddOrder(order);

    if (savedOrder) {
      // Clear cart
      saveToLocalStorage("cart", []);

      // Redirect to order completion page
      window.location.href = `/pages/order-completion/order-completion.html?orderId=${savedOrder.Id}`;
    } else {
      showToast("Failed to place order. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    showToast("An error occurred. Please try again.", "error");
  }
}

// Event listener
document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);
```

---

### Example 4: User Authentication (JavaScript)

```javascript
// login.js - Example authentication

import { getAllUsers } from "../../../services/users.service.js";
import { saveToLocalStorage } from "../../../shared/js/local-storage-management.js";

async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate inputs
  if (!username || !password) {
    showError("Please enter both username and password");
    return;
  }

  try {
    // Get all users from database
    const users = await getAllUsers();

    // Find matching user
    const user = users.find(
      (u) => u.Username === username && u.Password === password,
    );

    if (user) {
      // Save login state
      saveToLocalStorage("isLoggedIn", true);
      saveToLocalStorage("currentUser", user);

      // Redirect based on role
      if (user.Role === "Admin" || user.Role === "Seller") {
        window.location.replace("../../Areas/Admin/dashboard.html");
      } else {
        window.location.replace("../../../index.html");
      }
    } else {
      showError("Invalid username or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    showError("An error occurred. Please try again.");
  }
}

function showError(message) {
  const errorElement = document.getElementById("loginError");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

// Event listener
document.getElementById("loginForm").addEventListener("submit", handleLogin);
```

---

## Best Practices

### For Customers

#### 🛍️ Shopping Best Practices

1. **Create an Account First**
   - Easier checkout process
   - Track order history
   - Save wishlist items
   - Faster reordering

2. **Use Filters Effectively**
   - Start with broad filters (category, price range)
   - Narrow down with specific filters (size, color)
   - Use search for specific items
   - Clear filters to see all options

3. **Review Before Checkout**
   - Double-check quantities
   - Verify sizes and colors
   - Read product descriptions
   - Check return policy

4. **Save Shipping Information**
   - Fill profile with accurate address
   - Include apartment/unit numbers
   - Add phone number for delivery contact
   - Add special delivery instructions in order notes

5. **Track Orders Regularly**
   - Check "My Orders" for updates
   - Note tracking numbers
   - Contact support if delayed
   - Confirm delivery

---

### For Admins

#### 📊 Admin Best Practices

1. **Daily Dashboard Review**

   ```
   Morning Routine:
   - Check pending orders count
   - Review low stock alerts
   - Read new customer inquiries
   - Check recent activity
   ```

2. **Product Management**
   - Keep product information accurate and detailed
   - Use high-quality images (multiple angles)
   - Update stock levels regularly
   - Remove discontinued items
   - Set competitive pricing

3. **Order Processing**

   ```
   Order Workflow:
   1. Check pending orders every 2-4 hours
   2. Update to "Processing" within 24 hours
   3. Ship within 48 hours
   4. Update tracking information immediately
   5. Mark "Delivered" when confirmed
   ```

4. **Customer Service**
   - Respond to inquiries within 24 hours
   - Be professional and helpful
   - Resolve issues quickly
   - Follow up on resolved issues
   - Use templates for common questions

5. **User Management**
   - Regularly review user accounts
   - Remove inactive/spam accounts
   - Verify seller credentials before promotion
   - Monitor admin account access
   - Use strong passwords

6. **Inventory Management**
   - Set low stock alerts (e.g., < 10 items)
   - Reorder popular items promptly
   - Remove products with 0 stock
   - Update seasonal inventory
   - Track best-selling products

---

### For Sellers

#### 💼 Seller Best Practices

1. **Product Listings**
   - Write clear, detailed descriptions
   - Include specifications and materials
   - Use professional product photography
   - Highlight key features
   - Set accurate stock levels

2. **Pricing Strategy**
   - Research competitor pricing
   - Consider shipping costs
   - Offer competitive rates
   - Run periodic promotions
   - Update prices based on demand

3. **Order Fulfillment**
   - Process orders quickly (same day if possible)
   - Package items securely
   - Include packing slips
   - Use reliable shipping
   - Provide tracking information

4. **Customer Communication**
   - Respond to inquiries promptly
   - Provide accurate product information
   - Handle complaints professionally
   - Request feedback
   - Build customer relationships

---

## Common Workflows

### Workflow 1: Complete Purchase (Customer)

```
START
↓
1. Browse products (Shop page)
   - Use filters and search
   - Compare options
↓
2. Select product
   - View details
   - Read description
   - Check availability
↓
3. Add to Cart
   - Select size/color
   - Choose quantity
   - Click "Add to Cart"
↓
4. Review Cart
   - Check items
   - Update quantities
   - Apply discount code (if any)
↓
5. Checkout
   - Login (if not logged in)
   - Enter shipping info
   - Select payment method
↓
6. Place Order
   - Review summary
   - Click "Place Order"
   - Wait for confirmation
↓
7. Track Order
   - Go to "My Orders"
   - Monitor status
   - Wait for delivery
↓
END (Order Delivered)
```

---

### Workflow 2: Process Order (Admin)

```
START (New Order Alert)
↓
1. View Order Details
   - Check customer information
   - Review items ordered
   - Note special instructions
↓
2. Verify Payment
   - Check payment method
   - Confirm payment received (if applicable)
↓
3. Check Inventory
   - Verify all items in stock
   - If out of stock → Contact customer
   - If in stock → Proceed
↓
4. Update Status to "Processing"
   - Click status dropdown
   - Select "Processing"
   - Save change
↓
5. Prepare Items
   - Pull items from warehouse
   - Check quality
   - Package securely
↓
6. Ship Order
   - Contact courier
   - Get tracking number
   - Update status to "Shipped"
   - Add tracking info
↓
7. Monitor Delivery
   - Track shipment
   - Handle any issues
   - Confirm delivery
↓
8. Update Status to "Delivered"
   - Mark order complete
   - Generate invoice (if not done)
   - Close order
↓
END (Order Complete)
```

---

### Workflow 3: Add Product (Admin/Seller)

```
START
↓
1. Navigate to Product List
   - Login as Admin/Seller
   - Go to sidebar
   - Click "Product List"
↓
2. Click "Add Product"
   - Button opens form/modal
↓
3. Fill Product Information
   ├→ Name and Description
   ├→ Price
   ├→ Category
   ├→ Stock quantity
   ├→ Upload images
   ├→ Select sizes
   └→ Select colors
↓
4. Review Information
   - Double-check all fields
   - Ensure images uploaded
   - Verify pricing
↓
5. Save Product
   - Click "Save" button
   - Wait for confirmation
↓
6. Verify Product Created
   - See product in list
   - Click to view details
   - Check customer view (shop page)
↓
END (Product Live)
```

---

### Workflow 4: Handle Customer Inquiry (Admin)

```
START (Inquiry Received)
↓
1. Notification Alert
   - Bell icon shows new message
   - Dashboard shows count
↓
2. Navigate to Customer Service
   - Click "Customer Service" in sidebar
   - See list of inquiries
↓
3. Open Inquiry
   - Sort by date (newest first)
   - Click on new inquiry
   - Read message details
↓
4. Understand Issue
   - Identify customer need
   - Determine required action
   - Research if needed
↓
5. Compose Response
   ├→ Professional greeting
   ├→ Address specific issue
   ├→ Provide solution/information
   └→ Offer further assistance
↓
6. Send Reply
   - Review message
   - Click "Send"
   - Update status to "In Progress"
↓
7. Take Action (if applicable)
   ├→ Update product information
   ├→ Process refund
   ├→ Fix order issue
   └→ Escalate if needed
↓
8. Follow Up
   - Check if issue resolved
   - Send confirmation
   - Update status to "Resolved"
↓
END (Issue Resolved)
```

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: Cart Items Disappearing

**Problem:** Items added to cart are gone after closing browser.

**Solution:**

```
1. Check browser settings:
   - Ensure cookies/local storage enabled
   - Don't use private/incognito mode

2. Check browser compatibility:
   - Use modern browser (Chrome, Firefox, Edge, Safari)
   - Update browser to latest version

3. Clear cache if corrupted:
   - Settings → Privacy → Clear browsing data
   - Check only "Cached images and files"
   - Restart browser
```

---

#### Issue 2: Cannot Login

**Problem:** Login fails with correct credentials.

**Solution:**

```
1. Verify credentials:
   - Username is case-sensitive
   - Check for extra spaces
   - Ensure Caps Lock is off

2. Reset password:
   - Click "Forgot Password"
   - Follow reset instructions

3. Check account status:
   - Account may be deactivated
   - Contact admin for assistance

4. Clear browser cache:
   - Try different browser
   - Clear cookies and cache
```

---

#### Issue 3: Order Status Not Updating

**Problem:** Order stuck on "Pending" status.

**Customer Action:**

```
1. Wait 24-48 hours for initial processing
2. Check "My Orders" regularly
3. If delayed beyond expected time:
   - Contact customer service
   - Provide order ID
   - Request status update
```

**Admin Action:**

```
1. Go to Orders List
2. Find order by ID
3. Check if status update was saved
4. Manually update status:
   - Open order details
   - Change status dropdown
   - Click "Update" or "Save"
5. Verify change persists
```

---

#### Issue 4: Product Not Showing in Shop

**Problem:** Newly added product not visible to customers.

**Admin Solution:**

```
1. Check product status:
   - Go to Product List
   - Find the product
   - Verify Status is "Active" (not "Inactive")

2. Check stock level:
   - Ensure Stock > 0
   - Products with 0 stock may be hidden

3. Verify category:
   - Check category is spelled correctly
   - Category should match existing categories

4. Clear cache:
   - Admin: Hard refresh (Ctrl+ Shift+R)
   - Ask customer to refresh page

5. Check database:
   - Verify product saved correctly
   - Check Firebase console
```

---

## Security Guidelines

### For All Users

1. **Password Security**
   - Use strong passwords (min 8 characters)
   - Mix upper/lowercase, numbers, symbols
   - Don't reuse passwords
   - Change passwords regularly
   - Never share passwords

2. **Account Safety**
   - Logout when using shared devices
   - Don't save passwords on public computers
   - Enable two-factor authentication (if available)
   - Monitor account activity
   - Report suspicious activity

3. **Payment Security**
   - Verify payment method before confirming
   - Keep payment confirmations
   - Check order totals carefully
   - Report unauthorized charges
   - Use secure connections (HTTPS)

### For Admins

1. **Admin Account Protection**
   - Use very strong passwords
   - Limit admin access to trusted users
   - Monitor admin activity logs
   - Regularly review user permissions
   - Change admin passwords monthly

2. **Data Protection**
   - Don't share customer information
   - Secure database access
   - Regular backups
   - Monitor for suspicious orders
   - Comply with privacy regulations

---

## Performance Tips

### For Optimal Experience

1. **Browser Recommendations**
   - Use latest version of Chrome, Firefox, Edge, or Safari
   - Enable JavaScript
   - Allow cookies and local storage
   - Clear cache if experiencing issues

2. **Image Loading**
   - Images load progressively
   - Use good internet connection for best experience
   - Mobile: Enable image loading in browser
   - Consider data usage on mobile

3. **Page Load Times**
   - Initial load may take 2-3 seconds
   - Subsequent pages load faster (cached)
   - Filters apply in real-time
   - Order submission may take 1-2 seconds

---

## Conclusion

This usage guide provides comprehensive examples and guidelines for all user types. Follow these practices to get the most out of the e-commerce platform.

**Need More Help?**

- Review [Complete Documentation](PROJECT_DOCUMENTATION.md)
- Check [Quick Start Guide](QUICK_START_GUIDE.md)
- Read [User Stories](USER_STORIES.md)
- Contact support through Contact Us page

---

_Last Updated: March 2, 2026_  
_Version: 1.0_
