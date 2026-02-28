// orders.js - Handles the Orders page for customers, displaying their order history and details.

import { getCurrentUser } from "../../shared/js/local-storage-management.js";
import { getOrdersByUserId } from "../../services/orders.service.js";

let displayOrders = [];

//init function to check if user is logged in and load orders
async function init() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.replace("../auth/login.html");
    return;
  }

  // Handle roles
  if (currentUser.Role === "Customer") {
    // Load customer orders
    try {
      const myOrders = await getOrdersByUserId(currentUser.Id);

      displayOrders = myOrders.map((order) => ({
        ...order,
        _displayAmount: order.TotalPrice,
      }));

      renderTable();
    } catch (error) {
      console.error("Error loading orders:", error);
      showErrorState();
    }
  } else if (currentUser.Role === "Admin" || currentUser.Role === "Seller") {
    // Redirect admin or seller to dashboard orders list
    window.location.replace("../Areas/Admin/orders-list.html");
    return;
  } else {
    // Unknown role, redirect to homepage
    window.location.replace("../../../../index.html");
    return;
  }
}
const pageSize = 5; // عدد الطلبات لكل صفحة
let currentPage = 1;

//render orders table
function renderTable() {
  const tableBody = document.getElementById("ordersTableBody");
  const emptyState = document.getElementById("emptyState");
  const pagination = document.getElementById("pagination");
  const paginationInfo = document.getElementById("paginationInfo");

  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (displayOrders.length === 0) {
    emptyState.classList.remove("d-none");
    pagination.innerHTML = "";
    paginationInfo.textContent = "";
    return;
  }

  emptyState.classList.add("d-none");

  // حساب الطلبات للصفحة الحالية
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageOrders = displayOrders.slice(start, end);

  pageOrders.forEach((order) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>#${order.Id}</td>
            <td>${order.PaymentMethod || "-"}</td>
            <td>$${order._displayAmount.toFixed(2)}</td>
            <td>${formatDate(order.Timestamp)}</td>
            <td>${getStatusBadge(order.Status)}</td>
            <td>
                <button class="btn btn-sm view-btn" data-id="${order.Id}">
                  <i class="bi bi-eye"></i> View
                </button>
            </td>
            <td></td>
        `;
    tableBody.appendChild(row);
  });

  // Always fill until pageSize (5) to maintain fixed height
  for (let i = pageOrders.length; i < pageSize; i++) {
    const emptyRow = document.createElement("tr");
    emptyRow.classList.add("empty-row-placeholder");
    emptyRow.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;
    tableBody.appendChild(emptyRow);
  }

  attachViewEvents();

  // تحديث pagination info
  const totalPages = Math.ceil(displayOrders.length / pageSize) || 1;
  paginationInfo.textContent = `Showing ${start + 1} - ${Math.min(end, displayOrders.length)} of ${displayOrders.length}`;

  // تحديث pagination controls
  renderPagination(totalPages);
}

// Render pagination controls based on total pages
function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = "page-item";
  const prevA = document.createElement("a");
  prevA.href = "#";
  prevA.className = `page-link ${currentPage === 1 ? "disabled" : ""}`;
  prevA.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
  prevA.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });
  prevLi.appendChild(prevA);
  pagination.appendChild(prevLi);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    const a = document.createElement("a");
    a.href = "#";
    a.className = `page-link ${i === currentPage ? "active" : ""}`;
    a.textContent = i;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderTable();
    });
    li.appendChild(a);
    pagination.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = "page-item";
  const nextA = document.createElement("a");
  nextA.href = "#";
  nextA.className = `page-link ${currentPage === totalPages ? "disabled" : ""}`;
  nextA.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
  nextA.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });
  nextLi.appendChild(nextA);
  pagination.appendChild(nextLi);
}
// Attach click events to view buttons
function attachViewEvents() {
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const orderId = e.currentTarget.dataset.id;
      window.location.href = `./order-details.html?id=${orderId}`;
    });
  });
}

// Get status badge HTML based on order status
function getStatusBadge(status) {
  let badgeClass = "secondary";

  switch (status) {
    case "Pending":
      badgeClass = "warning";
      break;
    case "Processing":
      badgeClass = "primary";
      break;
    case "Shipped":
      badgeClass = "info";
      break;
    case "Delivered":
      badgeClass = "success";
      break;
    case "Cancelled":
      badgeClass = "danger";
      break;
  }

  return `<span class="badge status-badge bg-${badgeClass} rounded-pill px-3 py-2">${status || "Unknown"}</span>`;
}

// Format timestamp to readable date
function formatDate(timestamp) {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Show error state in the table if orders fail to load
function showErrorState() {
  const tableBody = document.getElementById("ordersTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = `
    <tr>
      <td colspan="7" class="text-center text-danger py-4">
        Failed to load orders. Please try again.
      </td>
    </tr>
  `;
}

// Call the init function when the page loads
init();
