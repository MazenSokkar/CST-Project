import { isAuthenticated, getCurrentUser } from "../../shared/js/local-storage-management.js";
import { getOrdersByUserId } from "../../services/orders.service.js";
import { GetProductById } from "../../services/product.service.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (!isAuthenticated()) {
    window.location.href = "../../index.html";
    return;
  }

  const user = getCurrentUser();
  let orders = await getOrdersByUserId(user.Id);

  const orderDetailsContainer = document.querySelector(".order-details");

  if (!orders || orders.length === 0) {
    orderDetailsContainer.innerHTML = "<p class='text-center mt-4 text-muted'>No recent orders found.</p>";
    return;
  }

  // Find the latest timestamp
  const maxTimestamp = Math.max(...orders.map((o) => o.Timestamp || 0));
  const latestOrders = orders.filter((o) => o.Timestamp === maxTimestamp);

  // Collect all items from the latest orders
  let allItems = [];
  let totalOrderAmount = 0;
  latestOrders.forEach((order) => {
    if (order.Items) {
      allItems = allItems.concat(order.Items);
    }
    totalOrderAmount += order.TotalPrice;
  });

  // Display the first matching order ID (or a combined string) in the UI
  const orderIdEl = document.getElementById("order-id");
  const deliveryMessageEl = document.getElementById("delivery-message");

  if (latestOrders.length > 0) {
    if (orderIdEl) {
      if (latestOrders.length > 1) {
        orderIdEl.style.display = "none";
      } else {
        orderIdEl.style.display = "block";
        orderIdEl.textContent = `Order ID: #${latestOrders[0].Id}`;
      }
    }

    if (deliveryMessageEl) {
      if (latestOrders.length === 1) {
        const latestOrder = latestOrders[0];
        const status = latestOrder.Status ? latestOrder.Status.toLowerCase() : "";

        if (status === "canceled" || status === "cancelled") {
          deliveryMessageEl.textContent = "Order canceled";
          deliveryMessageEl.classList.remove("text-muted");
          deliveryMessageEl.classList.add("text-danger");
        } else if (status === "delivered") {
          deliveryMessageEl.textContent = "Order delivered";
          deliveryMessageEl.classList.remove("text-muted");
          deliveryMessageEl.classList.add("text-success");
        } else {
          deliveryMessageEl.textContent = "Your order will be delivered within 3-5 business days.";
        }
      } else {
        // Handle multiple orders status display with grouping
        const pendingOrders = latestOrders.filter((o) => {
          const s = (o.Status || "Pending").toLowerCase();
          return s === "pending" || s === "processing";
        });
        const otherOrders = latestOrders.filter((o) => {
          const s = (o.Status || "Pending").toLowerCase();
          return s !== "pending" && s !== "processing";
        });

        let finalMessages = [];

        // 1. Grouped Pending/Processing
        if (pendingOrders.length > 0) {
          const ids = pendingOrders.map((o) => `#${o.Id}`).join(" - ");
          const msg = pendingOrders.length > 1 ? "These orders will be" : "This order will be";
          finalMessages.push(
            `Order ${ids}: <span class="text-muted">${msg} delivered within 3-5 business days.</span>`,
          );
        }

        // 2. Individual Others (Canceled, Delivered, etc.)
        otherOrders.forEach((o) => {
          const status = o.Status || "Pending";
          let colorClass = "text-muted";
          const lowerStatus = status.toLowerCase();
          if (lowerStatus === "delivered") colorClass = "text-success";
          else if (lowerStatus === "canceled" || lowerStatus === "cancelled") colorClass = "text-danger";

          finalMessages.push(`Order #<strong>${o.Id}</strong>: <span class="${colorClass}">${status}</span>`);
        });

        deliveryMessageEl.innerHTML = finalMessages.join("<br>");
        deliveryMessageEl.classList.remove("text-muted");
        deliveryMessageEl.style.fontWeight = "500";
      }
    }
  }

  // Create the Dribbble-style order summary box
  orderDetailsContainer.innerHTML = `
        <div class="order-summary-box mx-auto">
            <h3 class="summary-title m-0 text-center mb-4">Order Summary</h3>
            <div id="summary-items-list" class="w-100"></div>
            <hr class="summary-divider my-4">
            <div class="summary-total d-flex justify-content-between align-items-center">
                <span class="total-label">Total</span>
                <span class="total-price" id="total-price">$0.00</span>
            </div>
        </div>
    `;

  const itemsListContainer = document.getElementById("summary-items-list");

  for (const item of allItems) {
    let imageUrl = "https://via.placeholder.com/64?text=Item"; // fallback
    let category = "Product Detail";
    try {
      const productData = await GetProductById(item.Id);
      if (productData) {
        let imgVal = productData.ImageUrl || productData.image || productData.Image || item.ImageUrl || item.image;

        if (imgVal) {
          if (Array.isArray(imgVal) && imgVal.length > 0) {
            imgVal = imgVal[0];
          }

          if (typeof imgVal === "string") {
            if (imgVal.startsWith("images/")) {
              imageUrl = "../../assets/" + imgVal;
            } else if (imgVal.startsWith("http") || imgVal.startsWith("data:")) {
              imageUrl = imgVal;
            } else {
              imageUrl = "../../assets/images/" + imgVal;
            }
          }
        }

        if (productData.Category) category = productData.Category;
      }
    } catch (e) {
      console.error("Could not fetch product image", e);
    }

    const itemTotal = (item.Price * item.Quantity).toFixed(2);

    const itemDiv = document.createElement("div");
    itemDiv.className = "summary-item";
    itemDiv.innerHTML = `
            <img src="${imageUrl}" alt="${item.Name}" class="item-thumbnail">
            <div class="item-details">
                <div class="item-title">${item.Name}</div>
                <div class="item-subdesc">Qty: ${item.Quantity} &bull; ${category}</div>
            </div>
            <div class="item-price">$${itemTotal}</div>
        `;
    itemsListContainer.appendChild(itemDiv);
  }

  // Set total price
  const totalPriceEl = document.getElementById("total-price");
  if (totalPriceEl) {
    totalPriceEl.textContent = `$${totalOrderAmount.toFixed(2)}`;
  }

  // Action Buttons
  const buttonsContainer = document.getElementById("action-buttons-container");

  // Clear any existing buttons to prevent duplicates
  buttonsContainer.innerHTML = "";

  // 1) View Order Details / My Orders button
  const viewDetailsBtn = document.createElement("button");
  viewDetailsBtn.className = "btn fw-bold px-4 py-2 custom-btn";

  if (latestOrders.length > 1) {
    viewDetailsBtn.textContent = "My Orders";
    viewDetailsBtn.onclick = () => {
      window.location.href = "../orders/orders.html";
    };
  } else {
    viewDetailsBtn.textContent = "View Order Details";
    viewDetailsBtn.onclick = () => {
      // Navigate to the order-details page and pass the first order's ID in the query string
      if (latestOrders && latestOrders.length > 0) {
        window.location.href = `../orders/order-details.html?id=${latestOrders[0].Id}`;
      } else {
        window.location.href = "../orders/order-details.html";
      }
    };
  }
  buttonsContainer.appendChild(viewDetailsBtn);

  // 2) Continue Shopping button
  const continueBtn = document.createElement("button");
  continueBtn.className = "btn fw-bold px-4 py-2 custom-btn";
  continueBtn.textContent = "Continue Shopping";
  continueBtn.onclick = () => {
    window.location.href = "../../index.html";
  };
  buttonsContainer.appendChild(continueBtn);

  // Apply custom CSS dynamically for the hover effect requested
  const style = document.createElement("style");
  style.innerHTML = `
    .custom-btn {
        background-color: transparent !important;
        color: rgb(138, 89, 61) !important;
        border: 2px solid rgb(138, 89, 61) !important;
        transition: all 0.3s ease !important;
    }
    .custom-btn:hover {
        background-color: rgb(138, 89, 61) !important;
        color: white !important;
    }
  `;
  document.head.appendChild(style);
});
