
import { getFromLocalStorage, getCurrentUser, isAuthenticated } from "../../shared/js/local-storage-management.js";

const invoiceItems = document.getElementById("invoiceItems");
const subtotalEl = document.getElementById("subtotal");
const vatEl = document.getElementById("vat");
const totalEl = document.getElementById("total");
const customerInfoEl = document.getElementById("customerInfo");

function loadLatestOrder() {
    if (!isAuthenticated()) return null;

    const user = getCurrentUser();
    const orders = getFromLocalStorage("orders") || [];
    
    const userOrders = orders.filter(o => o.userId === user.Id);
    if (userOrders.length === 0) return null;

    
    return userOrders[userOrders.length - 1];
}

function calculateTotals(cart) {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.product.Price * item.quantity;
    });
    const vatRate = 0.14; 
    const vatAmount = subtotal * vatRate;
    const total = subtotal + vatAmount;
    return { subtotal, vatAmount, total };
}

function renderInvoice() {
    const order = loadLatestOrder();
    if (!order) {
        invoiceItems.innerHTML = `<tr><td colspan="6">No orders found.</td></tr>`;
        return;
    }

    const shipping = order.shippingDetails || {};
    customerInfoEl.innerHTML = `
        ${shipping["First Name"] || ""} ${shipping["Last Name"] || ""}<br>
        ${shipping["Email Address"] || ""}<br>
        ${shipping["Phone"] || ""}<br>
        ${shipping["Address"] || ""}
    `;

    invoiceItems.innerHTML = "";

    order.cart.forEach((item, index) => {
        const tax = (item.product.Price * item.quantity) * 0.14; 
        const total = (item.product.Price * item.quantity) + tax;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.product.Name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.product.Price).toFixed(2)}</td>
            <td>$${tax.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
        `;
        invoiceItems.appendChild(row);
    });

    const totals = calculateTotals(order.cart);
    subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    vatEl.textContent = `$${totals.vatAmount.toFixed(2)}`;
    totalEl.textContent = `$${totals.total.toFixed(2)}`;
}
document.addEventListener("DOMContentLoaded", renderInvoice);