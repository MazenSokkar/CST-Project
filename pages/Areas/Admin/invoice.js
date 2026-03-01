import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";
import * as LSManager from "../../../shared/js/local-storage-management.js";
import { getOrderById } from "../../../services/orders.service.js";
const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    await loadSidebar("dashboard");
    if (!orderId) {
        showNoInvoice();
        return;
    }

    const order = await getOrderById(orderId);
    if (!order) {
        showNoInvoice();
        return;
    }

    renderInvoice(order);
});
function renderInvoice(order) {

    const tableBody = document.getElementById("invoiceItems");
    const customerInfo = document.getElementById("customerInfo");

    tableBody.innerHTML = "";
    const details = order.shippingDetails || {};

    customerInfo.innerHTML = `
        ${details.fullName || ""} <br>
        ${details.email || ""} <br>
        ${details.address || ""}
    `;

    order.cart.forEach(item => {

        const product = item.product;
        const qty = item.quantity;
        const price = product.Price;
        const total = price * qty;

        const row = `
            <tr>
                <td>${product.Id}</td>
                <td>${product.Name}</td>
                <td>${qty}</td>
                <td>$${price.toFixed(2)}</td>
                <td>14%</td>
                <td>$${total.toFixed(2)}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

    document.getElementById("subtotal").textContent =
        `$${order.totals.subtotal.toFixed(2)}`;

    document.getElementById("vat").textContent =
        `$${order.totals.vatAmount.toFixed(2)}`;

    document.getElementById("total").textContent =
        `$${order.totals.total.toFixed(2)}`;
}
// Fallback if no order found
function showNoInvoice() {
    document.getElementById("invoiceItems").innerHTML =
        `<tr><td colspan="6" class="text-center text-muted">
            Invoice not found
        </td></tr>`;
}



// topbar panel toggle (bell + profile)
const pairs = [
    ["desktopBellBtn",    "desktopBellPanel"],
    ["desktopProfileBtn", "desktopProfilePanel"],
    ["mobileBellBtn",     "mobileBellPanel"],
    ["mobileProfileBtn",  "mobileProfilePanel"],
];

const allPanels = pairs.map(([, pid]) => document.getElementById(pid)).filter(Boolean);

pairs.forEach(([btnId, panelId]) => {
    const btn   = document.getElementById(btnId);
    const panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains("show");
        allPanels.forEach(p => p.classList.remove("show"));
        if (!isOpen) panel.classList.add("show");
    });
});

document.addEventListener("click", () => {
    allPanels.forEach(p => p.classList.remove("show"));
});

// logout
let btn = document.getElementById("logoutBtn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    LSManager.removeFromLocalStorage("currentUser");
    LSManager.saveToLocalStorage("isLoggedIn", false);
    window.location.href = "/pages/auth/login/login.html";
});
