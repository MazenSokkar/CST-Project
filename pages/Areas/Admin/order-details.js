import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";
import * as LSManager from "../../../shared/js/local-storage-management.js";
import * as OrderService from "../../../services/orders.service.js";
import * as UserService from "../../../services/users.service.js";

await loadSidebar("Orders");

// Get order ID from URL
const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

if (!orderId) {
    window.location.href = "orders-list.html";
}

// Load data
const allOrders = await OrderService.getAllOrders();
const allUsers  = await UserService.getAllUsers();

const order = allOrders.find(o => String(o.Id) === String(orderId));

if (!order) {
    document.querySelector(".container").innerHTML = `
        <div class="alert alert-danger mt-4">Order not found.</div>
    `;
} else {
    renderOrderDetails(order);
}

function renderOrderDetails(order) {
    // Order ID & Timestamp
    document.getElementById("orderId").textContent = `#${order.Id}`;
    document.getElementById("orderTimestamp").textContent = new Date(order.Timestamp).toLocaleDateString();

    // Status Badge
    const badge = document.getElementById("orderStatusBadge");
    badge.textContent = order.Status;
    badge.className = `badge status-badge status-${order.Status?.toLowerCase()}`;

    // Customer
    const user = allUsers.find(u => String(u.Id) === String(order.UserId));
    document.getElementById("customerName").textContent = user?.Name || `User #${order.UserId}`;

    // Summary Total
    document.getElementById("summaryTotalRight").textContent = `$${order.TotalPrice?.toFixed(2) ?? "0.00"}`;

    // Order Items
    const tbody = document.getElementById("orderItemsBody");
    tbody.innerHTML = "";

    order.Items.forEach(product => {
        const finalPrice = product.Discount
            ? (product.Price * (1 - product.Discount / 100)).toFixed(2)
            : product.Price?.toFixed(2);

        const imgSrc = product.ImageUrl?.[0]
            ? `../../../assets/${product.ImageUrl[0]}`
            : "../../../assets/images/1.png";

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <img src="${imgSrc}" alt="${product.Name}" class="product-img">
                        <span class="fw-semibold">${product.Name}</span>
                    </div>
                </td>
                <td>${product.Quantity ?? "—"}</td>
                <td>
                    ${product.Discount
                        ? `<span class="text-decoration-line-through text-muted me-1">$${product.Price?.toFixed(2)}</span>
                           <span class="fw-bold text-success">$${finalPrice}</span>`
                        : `<span class="fw-bold">$${finalPrice}</span>`
                    }
                </td>
                <td>${product.SellerName || "—"}</td>
            </tr>
        `;
    });

    // Cart Totals
    document.getElementById("summarySubtotal").textContent = order.Subtotal?.toFixed(2)      ?? "0.00";
    document.getElementById("summaryDelivery").textContent = order.DeliveryPrice?.toFixed(2)  ?? "0.00";
    document.getElementById("summaryVat").textContent      = order.Vats?.toFixed(2)           ?? "0.00";
    document.getElementById("summarySaving").textContent   = order.Saving?.toFixed(2)         ?? "0.00";
    document.getElementById("summaryTotal").textContent    = order.TotalPrice?.toFixed(2)     ?? "0.00";
}