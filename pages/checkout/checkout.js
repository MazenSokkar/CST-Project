import { getFromLocalStorage, saveToLocalStorage, getAllKeysFromLocalStorage, isAuthenticated, getCurrentUser } from "../../shared/js/local-storage-management.js";
import { showToast } from "../../shared/js/toast.js";
import { addOrder } from "../../../services/orders.service.js";

document.addEventListener("DOMContentLoaded", () => {

    const orderSummary = document.getElementById("orderSummary");
    const subtotalEl = document.getElementById("subtotal");
    const vatEl = document.getElementById("vat");
    const totalEl = document.getElementById("total");
    const placeOrderBtn = document.getElementById("placeOrderBtn");

    const shippingMethodSelect = document.getElementById("shippingMethodSelect");
    const paymentMethodSelect = document.getElementById("paymentMethodSelect");
    const checkoutForm = document.getElementById("checkoutForm");

    function loadCart() {
        if (!isAuthenticated()) return [];
        const user = getCurrentUser();
        const allKeys = getAllKeysFromLocalStorage();
        const cartKey = allKeys.find(k => k.startsWith(`cart_${user.Id}`));
        if (!cartKey) return [];
        return getFromLocalStorage(cartKey) || [];
    }

    function saveCart(cart) {
        const user = getCurrentUser();
        saveToLocalStorage(`cart_${user.Id}`, cart);
    }

    function calculateTotals(cart) {
        let subtotal = 0;
        cart.forEach(item => subtotal += item.product.Price * item.quantity);
        const vatRate = 0.14;
        const vatAmount = subtotal * vatRate;
        const total = subtotal + vatAmount;
        return { subtotal, vatAmount, total };
    }

    function renderOrder() {
        const cart = loadCart();
        orderSummary.innerHTML = "";
        if (cart.length === 0) {
            orderSummary.innerHTML = "<p>Your cart is empty.</p>";
            subtotalEl.textContent = "$0.00";
            vatEl.textContent = "$0.00";
            totalEl.textContent = "$0.00";
            return;
        }

        cart.forEach(item => {
            const div = document.createElement("div");
            div.className = "d-flex justify-content-between mb-2";
            div.innerHTML = `<span>${item.product.Name} x ${item.quantity}</span> <strong>$${(item.product.Price * item.quantity).toFixed(2)}</strong>`;
            orderSummary.appendChild(div);
        });

        const totals = calculateTotals(cart);
        subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
        vatEl.textContent = `$${totals.vatAmount.toFixed(2)}`;
        totalEl.textContent = `$${totals.total.toFixed(2)}`;
    }
    placeOrderBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        if (!checkoutForm.checkValidity()) {
            showToast("Please fill in all required fields.", { title: "Checkout" });
            checkoutForm.reportValidity();
            return;
        }

        const cart = loadCart();
        if (cart.length === 0) {
            showToast("Your cart is empty!", { title: "Cart" });
            return;
        }

        const formData = new FormData(checkoutForm);
        const shippingDetails = {};
        formData.forEach((value, key) => shippingDetails[key] = value);

        const totals = calculateTotals(cart);

        const items = cart.map(item => ({
            Id: item.product.Id,
            Name: item.product.Name,
            Price: item.product.Price,
            Quantity: item.quantity,
            SellerName: item.product.SellerName || "Default Seller"
        }));

        const apiOrder = {
            Items: items,
            DeliveryPrice: 50,
            Vats: totals.vatAmount,
            Saving: 0,
            UserId: getCurrentUser().Id,
            Address: shippingDetails.address,
            PaymentMethod: paymentMethodSelect.value,
            Status: "Pending",
            Timestamp: Date.now()
        };

        try {
            await addOrder(apiOrder);

            saveCart([]);
            renderOrder();
            showToast("Order placed successfully 🎉", { title: "Checkout" });

            setTimeout(() => {
                window.location.href = "/index.html";
            }, 1500);

        } catch (err) {
            console.error(err);
            showToast("Error placing order", { title: "Error" });
        }
    });

    renderOrder();
});