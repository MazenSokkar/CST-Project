import { getCurrentUser } from "../../shared/js/local-storage-management.js";
import { getOrdersByUserId } from "../../services/orders.service.js";

async function init() {
  const currentUser = getCurrentUser();

  if (!currentUser || currentUser.Role !== "Customer") {
    window.location.replace("../../index.html");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("id");

  if (!orderId) {
    window.history.back();
    return;
  }

  const orders = await getOrdersByUserId(currentUser.Id);
  const order = orders.find((o) => String(o.Id) === String(orderId));

  if (!order) {
    document.querySelector(".container").innerHTML = `<div class="alert alert-danger">Order not found.</div>`;
    return;
  }

  renderOrder(order);
}

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

function renderOrder(order) {
  document.getElementById("orderId").textContent = `#${order.Id}`;
  document.getElementById("orderDate").textContent = new Date(order.Timestamp).toLocaleDateString("en-GB");

  document.getElementById("orderStatus").innerHTML = getStatusBadge(order.Status);

  document.getElementById("subtotal").textContent = "$" + Math.round(order.Subtotal); 
  document.getElementById("delivery").textContent = "$" + Math.round(order.DeliveryPrice);
  document.getElementById("vat").textContent = "$" + Math.round(order.Vats);
  document.getElementById("total").textContent = "$" + Math.round( order.TotalPrice);

  const tbody = document.getElementById("orderItemsBody");
  tbody.innerHTML = "";

  order.Items.forEach((item) => {
    const total = item.Price * item.Quantity;

    tbody.innerHTML += `
      <tr>
        <td>${item.Name}</td>
        <td>${item.Quantity}</td>
        <td>$${Math.round(item.Price)}</td>
        <td>$${Math.round(total)}</td>
      </tr>
    `;
  });
}

init();
