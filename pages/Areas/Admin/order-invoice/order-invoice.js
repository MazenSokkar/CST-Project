import { loadSidebar } from "../../../../shared/admin-sidebar/sidebar.js";
import { getAllOrders } from "../../../../services/orders.service.js";
import { getAllUsers } from "../../../../services/users.service.js";

await loadSidebar("Orders");

// Get order ID from URL
const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

if (!orderId) {
  window.location.href = "../orders-list/orders-list.html";
}

// Load data
const allOrders = await getAllOrders();
const allUsers = await getAllUsers();

const order = allOrders.find((o) => String(o.Id) === String(orderId));

if (!order) {
  document.querySelector(".container").innerHTML = `
        <div class="alert alert-danger mt-4">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>
            Order not found.
        </div>
    `;
} else {
  renderInvoice(order);
}

function renderInvoice(order) {
  // Invoice No & Date
  document.getElementById("invoiceNo").textContent = `#${order.Id}`;
  document.getElementById("invoiceDate").textContent = order.Timestamp
    ? new Date(order.Timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  // Status Badge
  const badge = document.getElementById("invoiceStatus");
  badge.textContent = order.Status || "Pending";
  badge.className = `badge status-badge status-${(order.Status || "pending").toLowerCase()}`;

  // Customer Info
  const user = allUsers.find((u) => String(u.Id) === String(order.UserId));
  document.getElementById("customerName").textContent = user?.Name || `User #${order.UserId}`;
  document.getElementById("customerAddress").textContent = order.Address || user?.Address || "—";

  // Payment Method
  document.getElementById("paymentMethod").textContent = order.PaymentMethod || "—";

  // Items Table
  const tbody = document.getElementById("invoiceItemsBody");
  tbody.innerHTML = "";

  if (order.Items && Array.isArray(order.Items)) {
    order.Items.forEach((item, index) => {
      const unitPrice = item.Price ?? 0;
      const discount = item.Discount ?? 0;
      const qty = item.Quantity ?? 1;
      const finalPrice = discount > 0 ? unitPrice * (1 - discount / 100) : unitPrice;
      const lineTotal = finalPrice * qty;

      tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td class="fw-semibold">${item.Name || "—"}</td>
                    <td class="text-center">${qty}</td>
                    <td class="text-end">$${unitPrice.toFixed(2)}</td>
                    <td class="text-end">${discount > 0 ? `${discount}%` : "—"}</td>
                    <td class="text-end fw-bold">$${lineTotal.toFixed(2)}</td>
                </tr>
            `;
    });
  }

  // Totals
  document.getElementById("subtotal").textContent = `$${(order.Subtotal ?? 0).toFixed(2)}`;
  document.getElementById("delivery").textContent = `$${(order.DeliveryPrice ?? 0).toFixed(2)}`;
  document.getElementById("vat").textContent = `$${(order.Vats ?? 0).toFixed(2)}`;
  document.getElementById("saving").textContent = `- $${(order.Saving ?? 0).toFixed(2)}`;
  document.getElementById("total").textContent = `$${(order.TotalPrice ?? 0).toFixed(2)}`;
}