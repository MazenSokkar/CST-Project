import { showToast } from './toast.js';

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
    let value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function getAllKeysFromLocalStorage() {
    return Object.keys(localStorage);
}

export function isAuthenticated() {
    if (getFromLocalStorage('isLoggedIn') && getFromLocalStorage('currentUser')) {
        return true;
    }
    return false;
}

export function getCurrentUser() {
    return getFromLocalStorage('currentUser');
}

export function addToCart(product) {
    if (isAuthenticated()) {
        let user = getCurrentUser();
        let allKeys = getAllKeysFromLocalStorage();
        let userCartKey = allKeys.find(key => key.startsWith(`cart_${user.Id}`));
        if (!userCartKey) {
            userCartKey = `cart_${user.Id}`;
        }
        let cart = getFromLocalStorage(userCartKey) || [];
        let existingProductIndex = cart.findIndex(item => item.product.Id === product.Id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }
        saveToLocalStorage(userCartKey, cart);
        showToast('Product added to cart.');
    } else {
        showToast('Please log in to add items to your cart.');
    }
}

export function removeFromCart(productId) {
    if (isAuthenticated()) {
        let user = getCurrentUser();
        let allKeys = getAllKeysFromLocalStorage();
        let userCartKey = allKeys.find(key => key.startsWith(`cart_${user.Id}`));
        if (!userCartKey) {
            showToast('Your cart is empty.');
            return;
        }
        let cart = getFromLocalStorage(userCartKey);
        let index = cart.findIndex(item => item.product.Id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            saveToLocalStorage(userCartKey, cart);
            showToast('Product removed from cart.');
        }
    } else {
        showToast('Please log in to remove items from your cart.');
    }
}

export function clearCart() {
    if (isAuthenticated()) {
        let user = getCurrentUser();
        let allKeys = getAllKeysFromLocalStorage();
        let userCartKey = allKeys.find(key => key.startsWith(`cart_${user.Id}`));
        if (userCartKey) {
            removeFromLocalStorage(userCartKey);
        }
    }
}

export function addToWishlist(productId) {
    if (isAuthenticated()) {
        let user = getCurrentUser();
        let allKeys = getAllKeysFromLocalStorage();
        let userWishlistKey = allKeys.find(key => key.startsWith(`wishlist_${user.Id}`));
        if (!userWishlistKey) {
            userWishlistKey = `wishlist_${user.Id}`;
        }
        let wishlist = getFromLocalStorage(userWishlistKey) || [];
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            saveToLocalStorage(userWishlistKey, wishlist);
            showToast('Product added to wishlist.');
        } else if(wishlist.includes(productId)) {
            removeFromWishlist(productId);
            showToast('Product removed from wishlist.');
        }
    } else {
        showToast('Please log in to add items to your wishlist.');
    }
}

export function removeFromWishlist(productId) {
    if (isAuthenticated()) {
        let user = getCurrentUser();
        let allKeys = getAllKeysFromLocalStorage();
        let userWishlistKey = allKeys.find(key => key.startsWith(`wishlist_${user.Id}`));
        let wishlist = userWishlistKey ? getFromLocalStorage(userWishlistKey) : [];
        let index = wishlist.indexOf(productId);
        if (index !== -1) {
            wishlist.splice(index, 1);
            saveToLocalStorage(userWishlistKey, wishlist);
        }
    } else {
        showToast('Please log in to remove items from your wishlist.');
    }
}

export function buyNow(product) {
    if (isAuthenticated()) {
        clearCart();
        addToCart(product);
        window.location.href = 'pages/checkout/checkout.html';
    } else {
        showToast('Please log in to purchase items.');
    }
}