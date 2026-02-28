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

function renderOrder(order) {
  document.getElementById("orderId").textContent = `#${order.Id}`;
  document.getElementById("orderDate").textContent = new Date(order.Timestamp).toLocaleDateString("en-GB");

  document.getElementById("orderStatus").innerHTML = `<span class="badge bg-secondary">${order.Status}</span>`;

  document.getElementById("subtotal").textContent = order.Subtotal.toFixed(2) + " EGP";
  document.getElementById("delivery").textContent = order.DeliveryPrice.toFixed(2) + " EGP";
  document.getElementById("vat").textContent = order.Vats.toFixed(2) + " EGP";
  document.getElementById("total").textContent = order.TotalPrice.toFixed(2) + " EGP";

  const tbody = document.getElementById("orderItemsBody");
  tbody.innerHTML = "";

  order.Items.forEach((item) => {
    const total = item.Price * item.Quantity;

    tbody.innerHTML += `
      <tr>
        <td>${item.Name}</td>
        <td>${item.Quantity}</td>
        <td>${item.Price.toFixed(2)} EGP</td>
        <td>${total.toFixed(2)} EGP</td>
      </tr>
    `;
  });
}

init();
