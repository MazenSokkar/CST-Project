// JS
// console.log("Cart page loaded");
import {
    getFromLocalStorage,
    saveToLocalStorage,
    getAllKeysFromLocalStorage,
    isAuthenticated,
    getCurrentUser
} from "../../shared/js/local-storage-management.js";
import { showToast } from "../../shared/js/toast.js";

let emptyMessage = document.getElementById("emptyMessage");
let cartContainer = document.getElementById("cartContainer");

function loadCart() {
    if (!isAuthenticated()) return [];

    let user = getCurrentUser();
    let allKeys = getAllKeysFromLocalStorage();
    let userCartKey = allKeys.find(key => key.startsWith(`cart_${user.Id}`));

    if (!userCartKey) return [];

    return getFromLocalStorage(userCartKey) || [];
}

function saveCart(cart) {
    let user = getCurrentUser();
    let key = `cart_${user.Id}`;
    saveToLocalStorage(key, cart);
}

function renderCart() {
    let cart = loadCart();
    console.log("Cart items:", cart);

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
        cartContainer.style.display = "none";
    } else {
        emptyMessage.style.display = "none";
        cartContainer.style.display = "block";
    }

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let card = document.createElement("div");
        card.className = "card p-3 mb-3";

card.innerHTML = `
    <div class="card p-3 mb-3 border">
        <div class="row align-items-center">

            <div class="col-md-2 text-center">
                <img src="/assets/${item.product.ImageUrl[0]}" width="80" height="80" style="object-fit: cover;">
            </div>

            <div class="col-md-6">
                <p class="mb-1"><strong>Name:</strong> ${item.product.Name}</p>
                <p class="mb-1"><strong>Description:</strong> ${item.product.Description}</p>
                <p class="mb-0"><strong>Price:</strong> $${((item.product.Price) - (item.product.Price * item.product.Discount / 100)) * item.quantity}</p>
            </div>

            <div class="col-md-2 text-center">
                <div class="d-flex justify-content-center align-items-center gap-2">
                     <p class="mb-1"><strong>Quantity:</strong></p>
                    <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQty(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="increaseQty(${index})">+</button>
                </div>
            </div>

            <div class="col-md-2 text-center">
                <button class="btn btn-danger btn-sm p-2 border border-0 rounded-3" style="background-color: #8C593B" onclick="removeItem(${index})">
                    Remove 🗑️
                </button>
            </div>

        </div>
    </div>
`;
        cartContainer.appendChild(card);
    });
        const totals = calculateTotals(cart);

        const summarySection = document.createElement("div");
        summarySection.className = "card p-3 mt-3";

        summarySection.innerHTML = `
        <div class="d-flex justify-content-between">
        <span>Subtotal:</span>
        <strong>$${totals.subtotal.toFixed(2)}</strong>
        </div>

        <div class="d-flex justify-content-between">
        <span>VAT (14%):</span>
        <strong>$${totals.vatAmount.toFixed(2)}</strong>
        </div>

        <hr>

        <div class="d-flex justify-content-between">
        <span class="fw-bold">Total:</span>
        <strong class="text-danger">$${totals.total.toFixed(2)}</strong>
        </div>
       `;

    cartContainer.appendChild(summarySection);

    const couponSection = document.createElement("div");
    couponSection.className = "card p-3 mb-3 border";

    couponSection.innerHTML = `
        <a class="btn btn-link p-0" data-bs-toggle="collapse" href="#couponCollapse" role="button" aria-expanded="false" aria-controls="couponCollapse" style="text-decoration: none;">
            <span class="fw-bold text-dark">Have a coupon? </span>
            <span class="text-danger">Click here to enter your code</span>
        </a>

        <div class="collapse mt-2" id="couponCollapse">
            <div class="card card-body p-2">
                <span class="mb-2">If you have a coupon code, please apply it below</span>
                <input type="text" class="form-control mb-2" placeholder="Enter coupon code" id="couponInput">
                <button class="btn btn-danger btn-sm" onclick="applyCoupon()">Apply</button>
            </div>
        </div>
    `;

    cartContainer.appendChild(couponSection);

    const checkoutbtn = document.createElement("div");
    checkoutbtn.innerHTML = `
    <div class="d-flex justify-content-end mt-2">
    <button class="btn btn-danger btn-sm p-2 border border-0 rounded-3" style="background-color: #8C593B" onclick="checkout()">Check Out</button>
    </div>
    `;

    cartContainer.appendChild(checkoutbtn);
}
// calculate Total
function calculateTotals(cart) {
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += ((item.product.Price) - (item.product.Price * item.product.Discount / 100)) * item.quantity;
    });

    const vatRate = 0.14; // 14%
    const vatAmount = subtotal * vatRate;
    const total = subtotal + vatAmount;

    return { subtotal, vatAmount, total };
}

// Increase quantity
function increaseQty(index) {
    let cart = loadCart();
    cart[index].quantity++;
    saveCart(cart);
    renderCart();
}

// Decrease quantity
function decreaseQty(index) {
    let cart = loadCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart(cart);
        renderCart();
    }
}

// Remove item
function removeItem(index) {
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// check out
function checkout() {
    let cart = loadCart();

    if (cart.length === 0) {
        showToast("Your cart is empty!", {
            title: "Cart",
            icon: "/assets/images/bell-regular-full.svg",
            duration: 3000
        });
        return;
    }

    window.location.href = "/pages/checkout/checkout.html";
}
//ده يخليهم متاحين للـ 
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty; 
window.removeItem = removeItem; 
window.checkout = checkout;
renderCart();
