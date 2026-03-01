import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";
import * as LSManager from "../../../shared/js/local-storage-management.js";
import { getOrderById, getOrdersByUserId } from "../../../services/orders.service.js";
import { getCurrentUser } from "../../../shared/js/local-storage-management.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadSidebar("dashboard");

    const user = getCurrentUser();
    if (!user) {
        showNoInvoice();
        return;
    }

    const orders = await getOrdersByUserId(user.Id);

    if (!orders.length) {
        showNoInvoice();
        return;
    }

    //const latestOrder = orders.sort((a, b) => b.Timestamp - a.Timestamp)[0];

    const orderId = new URLSearchParams(window.location.search).get("id");

    const order = await getOrderById(orderId);

    renderInvoice(order);
});

function renderInvoice(order) {
    const tableBody = document.getElementById("invoiceItems");
    const customerInfo = document.getElementById("customerInfo");

    tableBody.innerHTML = "";

    customerInfo.innerHTML = `
        Address : ${order.Address || ""} <br>
        Payment Method : ${order.PaymentMethod || ""}
    `;

    order.Items.forEach(item => {
        const qty = item.Quantity;
        const price = item.Price;
        const total = price * qty;

        const row = `
            <tr>
                <td>${item.Id}</td>
                <td>${item.Name}</td>
                <td>${qty}</td>
                <td>$${price.toFixed(2)}</td>
                <td>14%</td>
                <td>$${total.toFixed(2)}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

    const subtotal = order.Subtotal || 0;
    const vat = order.Vats || 0;
    const total = order.TotalPrice || 0;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("vat").textContent = `$${vat.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// fallback
function showNoInvoice() {
    document.getElementById("invoiceItems").innerHTML =
        `<tr><td colspan="6" class="text-center text-muted">
            Invoice not found
        </td></tr>`;
}

// topbar toggle
const pairs = [
    ["desktopBellBtn", "desktopBellPanel"],
    ["desktopProfileBtn", "desktopProfilePanel"],
    ["mobileBellBtn", "mobileBellPanel"],
    ["mobileProfileBtn", "mobileProfilePanel"],
];

const allPanels = pairs.map(([, pid]) => document.getElementById(pid)).filter(Boolean);

pairs.forEach(([btnId, panelId]) => {
    const btn = document.getElementById(btnId);
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