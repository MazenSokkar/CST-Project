import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";
import { getCurrentUser } from "../../../../shared/js/local-storage-management.js";
import { getAllOrders, updateOrder } from "../../../../services/orders.service.js";
import { getAllUsers } from "../../../../services/users.service.js";

await loadSidebar("Order");

// --- State ---
let allOrders = [];
let allUsers = [];
let displayOrders = []; // orders filtered by role
let currentPage = 1;
const rowsPerPage = 5;

const tableBody = document.getElementById("ordersTableBody");
const paginationEl = document.getElementById("pagination");
const paginationInfo = document.getElementById("paginationInfo");
const emptyState = document.getElementById("emptyState");

// --- Init ---
async function init() {
  const currentUser = getCurrentUser();
  allOrders = await getAllOrders();
  allUsers = await getAllUsers();

  // Sort by Id descending (most recent first)
  allOrders.sort((a, b) => (b.Id || 0) - (a.Id || 0));

  if (!currentUser) {
    window.location.replace("../../../../index.html");
    return;
  }

  const role = currentUser.Role; // "Admin" or "Seller"

  // Strict RBAC: Kick out unauthorized users
  if (role !== "Admin" && role !== "Seller") {
    window.location.replace("../../../../index.html");
    return;
  }

  if (role === "Admin") {
    // Admin sees all orders as-is
    displayOrders = allOrders.map((order) => ({
      ...order,
      _displayAmount: order.TotalPrice,
    }));
  } else if (role === "Seller") {
    // Seller sees only orders that contain their products
    const sellerName = currentUser.Name;
    displayOrders = [];

    for (const order of allOrders) {
      if (!order.Items || !Array.isArray(order.Items)) continue;

      const sellerItems = order.Items.filter((item) => item.SellerName === sellerName);

      if (sellerItems.length > 0) {
        // Calculate amount for seller's items only
        const sellerAmount = sellerItems.reduce((sum, item) => {
          const price = item.Discount ? item.Price * (1 - item.Discount / 100) : item.Price;
          return sum + price * (item.Quantity || 1);
        }, 0);

        displayOrders.push({
          ...order,
          _sellerItems: sellerItems,
          _displayAmount: sellerAmount,
        });
      }
    }
  } else {
    // Other roles (Customer etc.) — show nothing
    displayOrders = [];
  }

  renderTable();
}

// --- Render ---
function renderTable() {
  tableBody.innerHTML = "";

  if (displayOrders.length === 0) {
    showEmpty();
    return;
  }

  emptyState.classList.add("d-none");

  const start = (currentPage - 1) * rowsPerPage;
  const paginated = displayOrders.slice(start, start + rowsPerPage);

  paginated.forEach((order) => {
    const user = allUsers.find((u) => String(u.Id) === String(order.UserId));
    const customerName = user?.Name || `User #${order.UserId}`;
    const statusLower = (order.Status || "pending").toLowerCase();
    const amount = (order._displayAmount ?? order.TotalPrice ?? 0).toFixed(2);
    const orderTime = order.Timestamp
      ? new Date(order.Timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

    const row = document.createElement("tr");
    row.dataset.id = order.Id;
    row.innerHTML = `
            <td class="fw-semibold">#${order.Id}</td>
            <td>${customerName}</td>
            <td>${order.PaymentMethod || "—"}</td>
            <td class="fw-bold">$${amount}</td>
            <td>${orderTime}</td>
            <td><span class="badge status-badge status-${statusLower}">${order.Status || "Pending"}</span></td>
            <td>
                <div class="dropdown action-dropdown">
                    <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="fa-solid fa-pen-to-square me-1"></i>Update
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item status-action" data-status="Delivered" href="#">
                            <i class="fa-solid fa-circle-check text-success"></i>Delivered</a></li>
                        <li><a class="dropdown-item status-action" data-status="Cancelled" href="#">
                            <i class="fa-solid fa-circle-xmark text-danger"></i>Cancelled</a></li>
                        <li><a class="dropdown-item status-action" data-status="Processing" href="#">
                            <i class="fa-solid fa-spinner text-primary"></i>Processing</a></li>
                        <li><a class="dropdown-item status-action" data-status="Pending" href="#">
                            <i class="fa-solid fa-clock text-warning"></i>Pending</a></li>
                    </ul>
                </div>
            </td>
            <td>
                <div class="dropdown more-menu">
                    <button class="btn btn-sm" data-bs-toggle="dropdown">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item view-order" href="../Admin/order-details.html?id=${order.Id}">
                            <i class="fa-solid fa-eye text-primary"></i>View</a></li>
                        <li><a class="dropdown-item invoice-order" href="../Admin/invoice.html?id=${order.Id}">
                            <i class="fa-solid fa-file-invoice text-success"></i>Invoice</a></li>
                    </ul>
                </div>
            </td>
        `;
    tableBody.appendChild(row);
  });

  // Always fill until rowsPerPage (5) to maintain fixed height
  for (let i = paginated.length; i < rowsPerPage; i++) {
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
            <td></td>
        `;
    tableBody.appendChild(emptyRow);
  }

  renderPagination();
}

function showEmpty() {
  tableBody.innerHTML = "";
  emptyState.classList.remove("d-none");
  paginationInfo.textContent = "";
  paginationEl.innerHTML = "";
}

// --- Pagination ---
function renderPagination() {
  paginationEl.innerHTML = "";

  const pageCount = Math.ceil(displayOrders.length / rowsPerPage) || 1;
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, displayOrders.length);

  paginationInfo.textContent = `Showing ${start} - ${end} of ${displayOrders.length}`;

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
  paginationEl.appendChild(prevLi);

  // Page numbers
  for (let i = 1; i <= pageCount; i++) {
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
    paginationEl.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = "page-item";
  const nextA = document.createElement("a");
  nextA.href = "#";
  nextA.className = `page-link ${currentPage === pageCount ? "disabled" : ""}`;
  nextA.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
  nextA.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < pageCount) {
      currentPage++;
      renderTable();
    }
  });
  nextLi.appendChild(nextA);
  paginationEl.appendChild(nextLi);
}

// --- Status Update (event delegation) ---
tableBody.addEventListener("click", async (e) => {
  const statusAction = e.target.closest(".status-action");
  if (!statusAction) return;

  e.preventDefault();

  const newStatus = statusAction.dataset.status;
  const row = statusAction.closest("tr");
  const orderId = row.dataset.id;

  // Find the original order (not the display copy)
  const order = allOrders.find((o) => String(o.Id) === String(orderId));
  if (!order) return;

  // Update order status
  order.Status = newStatus;
  const success = await updateOrder(order);

  if (success) {
    // Also update the display copy
    const displayOrder = displayOrders.find((o) => String(o.Id) === String(orderId));
    if (displayOrder) displayOrder.Status = newStatus;

    // Re-render just the status badge and keep the page
    const badge = row.querySelector(".status-badge");
    badge.textContent = newStatus;
    badge.className = `badge status-badge status-${newStatus.toLowerCase()}`;
  } else {
    alert("Failed to update order status. Please try again.");
  }
});

// --- Start ---
init();
