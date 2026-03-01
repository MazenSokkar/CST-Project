import {
    getFromLocalStorage,
    saveToLocalStorage,
    getCurrentUser,
    isAuthenticated,
    addToCart
} from "../../shared/js/local-storage-management.js";

import { GetProductById } from "../../services/product.service.js"; 
import { showToast } from "../../shared/js/toast.js";


let emptyMessage;
let wishContainer;

// إضافة ID للـ wishlist
export function addToWishlist(productId) {
    const user = getCurrentUser();
    const key = `wishlist_${user.Id}`;
    let wishlist = getFromLocalStorage(key) || [];

    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveToLocalStorage(key, wishlist);
        showToast("product added to wishlist successfully");
        renderWishlist(); // تحديث العرض بعد الإضافة
    } else {
        showToast("Product already in wishlist");
    }
}


async function loadWishlist() {
    if (!isAuthenticated()) return [];

    const user = getCurrentUser();
    const key = `wishlist_${user.Id}`;
    const ids = getFromLocalStorage(key) || [];

    const products = [];
    for (const id of ids) {
        try {
            const product = await GetProductById(id);
            products.push(product);
        } catch (err) {
            console.warn(err);
        }
    }

    return products;
}

async function renderWishlist() {
    if (!emptyMessage || !wishContainer) return;

    const wish = await loadWishlist();

    emptyMessage.style.display = wish.length === 0 ? "block" : "none";
    wishContainer.style.display = wish.length === 0 ? "none" : "block";

    wishContainer.innerHTML = "";

    wish.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "card p-3 mb-3";

        card.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-2 text-center">
                    <img src="/assets/${product.ImageUrl ? product.ImageUrl[0] : 'default.png'}" width="80" height="80" style="object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <p class="mb-1"><strong>Name:</strong> ${product.Name}</p>
                    <p class="mb-1"><strong>Description:</strong> ${product.Description}</p>
                    <p class="mb-0"><strong>Price:</strong> $${((product.Price) - (product.Price * product.Discount / 100))}</p>
                </div>
                <div class="col-md-4 text-center">
                    <button class="btn btn-danger btn-sm p-2 border border-0 rounded-3" style="background-color: #8C593B" onclick="removeFromWishlistUI(${index})">Remove 🗑️</button>
                    <button class="btn btn-danger btn-sm p-2 border border-0 rounded-3" style="background-color: #8C593B" onclick="addWishlistItemToCart(${index})">Add To Cart</button>
                </div>
            </div>
        `;
        wishContainer.appendChild(card);
    });
}

// إزالة منتج من wishlist
async function removeFromWishlistUI(index) {
    const user = getCurrentUser();
    const key = `wishlist_${user.Id}`;
    let wishlist = getFromLocalStorage(key) || [];

    wishlist.splice(index, 1);
    saveToLocalStorage(key, wishlist);

    await renderWishlist();
}

// إضافة منتج من wishlist إلى cart
async function addWishlistItemToCart(index) {
    const wish = await loadWishlist();
    const product = wish[index];
    if (!product) return;
    addToCart(product);

    // const cartKey = `cart_${getCurrentUser().Id}`;
    // let cart = getFromLocalStorage(cartKey) || [];
    // const existing = cart.find(p => p.Id === product.Id);
    // if (existing) existing.quantity += 1;
    // else cart.push({ ...product, quantity: 1 });
    // saveToLocalStorage(cartKey, cart);

    await removeFromWishlistUI(index);
}

// جعل الدوال متاحة للزرار
window.removeFromWishlistUI = removeFromWishlistUI;
window.addWishlistItemToCart = addWishlistItemToCart;

document.addEventListener("DOMContentLoaded", () => {
    emptyMessage = document.getElementById("emptyMessage");
    wishContainer = document.getElementById("wishContainer");
    renderWishlist();
});