// index.js - works for any page
import * as LSManager from "../../shared/js/local-storage-management.js";
import { getAllProducts } from "../../services/product.service.js";
import { showToast } from "../../shared/js/toast.js";

// Function to update the cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (!cartCountElement) return;

    const cartItems = LSManager.getCartItems();

    let totalQuantity = 0;

    cartItems.forEach(item => {
        totalQuantity += item.quantity;
    });

    cartCountElement.textContent = totalQuantity;
}

// Function to set the active link in the navbar based on the current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (currentPath === linkPath) {
            link.classList.add("active-link");
        }
    });

    // active for navbar icons (Cart, Wishlist, Profile)
    const iconLinks = document.querySelectorAll(".navbar-icons a");

    iconLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (currentPath === linkPath) {
            link.classList.add("active-icon");
        }
    });
}
// Load Navbar
fetch('/Shared/Navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-container').innerHTML = html;

        // Update cart count on page load
        updateCartCount();

        // Set active link in navbar
        setActiveNavLink();

        // Handle My Orders click if user not logged in
        const myOrdersLink = document.querySelector('a[href="/pages/orders/orders.html"]');

        if (myOrdersLink) {
            myOrdersLink.addEventListener("click", (e) => {
                const currentUser = LSManager.getCurrentUser();

                if (!currentUser) {
                    e.preventDefault(); // prevent normal navigation
                    window.location.href = "/pages/profile/profile.html";
                }
            });
        }

        // get elements
        const searchForm = document.querySelector(".navbar-search");
        const searchInput = searchForm.querySelector("input");

        // create a container for search results
        const resultsContainer = document.createElement("div");
        resultsContainer.classList.add("search-results");
        searchForm.appendChild(resultsContainer);

        // search as you type
        searchInput.addEventListener("input", async () => {
            const query = searchInput.value.trim().toLowerCase();
            resultsContainer.innerHTML = ""; // clear previous results

            if (!query) return;

            const products = await getAllProducts();
            const filteredProducts = products.filter(p => p.Name.toLowerCase().includes(query));

            if (filteredProducts.length === 0) {
                const noResult = document.createElement("div");
                noResult.textContent = "No products found";
                noResult.style.cursor = "default";
                resultsContainer.appendChild(noResult);
                return;
            }

            filteredProducts.forEach(product => {
                const item = document.createElement("div");
                item.textContent = product.Name;
                item.addEventListener("click", () => {
                    window.location.href = `/pages/product-details/product-details.html?id=${product.Id}`;
                });
                resultsContainer.appendChild(item);
            });
        });

        // search on form submit (not really needed with search as you type, but good for accessibility and users who expect it)
        searchForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            const products = await getAllProducts();
            const filteredProducts = products.filter(p => p.Name.toLowerCase().includes(query));

            if (filteredProducts.length > 0) {
                window.location.href = `/pages/product-details/product-details.html?id=${filteredProducts[0].Id}`;
            } else {
                alert("No products found!");
            }
        });
    })
    .catch(err => console.error("Error loading Navbar:", err));

// Load Footer
fetch('/Shared/Footer/footer.html')
    .then(res => res.text())
    .then(html => {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = html;
        }
    })
    .catch(err => console.error("Error loading Footer:", err));

// Listen for cart updates to refresh the cart count in the navbar after the page has loaded
window.addEventListener("cartUpdated", () => {
    updateCartCount();
});

let contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let firstName = document.getElementById("firstName").value.trim();
        let lastName = document.getElementById("lastName").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        if (!firstName || !lastName || !email || !message) {
            showToast("Please fill in all fields", { duration: 3000 });
            return;
        }
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address", { duration: 3000 });
            return;
        }
        let allKeys = LSManager.getAllKeysFromLocalStorage();
        if (allKeys.includes("contacts")) {
            let contacts = LSManager.getFromLocalStorage("contacts") || [];
            contacts.push({ firstName, lastName, email, message });
            LSManager.saveToLocalStorage("contacts", contacts);
        } else {
            LSManager.saveToLocalStorage("contacts", [{ firstName, lastName, email, message }]);
        }
        showToast(`Thank you, ${firstName}! Your message has been sent successfully.`, { duration: 3000 });
        contactForm.reset();
    });
}
