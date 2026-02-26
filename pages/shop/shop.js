import { getAllProducts } from "../../services/product.service.js";
import { addToWishlist , removeFromWishlist, addToCart, removeFromCart, buyNow, getWishlistItems, isAuthenticated} from "../../shared/js/local-storage-management.js";
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 9;
let sortBy = "";
let maxProductPrice = 1000;
document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  setupFilters();
  setupSort();
  renderProducts();
  setupPagination();
});
async function loadProducts() {
  try {
    allProducts = await getAllProducts();
    filteredProducts = [...allProducts];
    if (allProducts.length > 0) {
      maxProductPrice = Math.ceil(
        Math.max(...allProducts.map((p) => (p.Discount ? p.Price * (1 - p.Discount / 100) : p.Price))),
      );
      document.getElementById("priceMin").max = maxProductPrice;
      document.getElementById("priceMax").max = maxProductPrice;
      document.getElementById("priceMax").value = maxProductPrice;
      document.getElementById("maxPrice").textContent = maxProductPrice;
      document.getElementById("priceMaxMobile").max = maxProductPrice;
      document.getElementById("priceMaxMobile").value = maxProductPrice;
      document.getElementById("maxPriceMobile").textContent = maxProductPrice;
      document.getElementById("priceMinMobile").max = maxProductPrice;
      updateRangeTrack();
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}
function getProductSize(sizeStr) {
  if (!sizeStr) return null;
  const match = sizeStr.match(/(\d+)cm/);
  if (!match) return null;
  const width = parseInt(match[1]);
  if (width < 100) return "Small";
  if (width <= 150) return "Medium";
  return "Large";
}
function setupFilters() {
  const priceMin = document.getElementById("priceMin");
  if (priceMin) {
    priceMin.addEventListener("input", (e) => {
      if (parseInt(e.target.value) > parseInt(document.getElementById("priceMax").value)) {
        e.target.value = document.getElementById("priceMax").value;
      }
      document.getElementById("minPrice").textContent = e.target.value;
      document.getElementById("priceMinMobile").value = e.target.value;
      document.getElementById("minPriceMobile").textContent = e.target.value;
      applyFilters();
      updateRangeTrack();
    });
  }
  const priceMax = document.getElementById("priceMax");
  if (priceMax) {
    priceMax.addEventListener("input", (e) => {
      if (parseInt(e.target.value) < parseInt(document.getElementById("priceMin").value)) {
        e.target.value = document.getElementById("priceMin").value;
      }
      document.getElementById("maxPrice").textContent = e.target.value;
      document.getElementById("priceMaxMobile").value = e.target.value;
      document.getElementById("maxPriceMobile").textContent = e.target.value;
      applyFilters();
      updateRangeTrack();
    });
  }
  document.querySelectorAll(".color-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      syncCheckboxes(checkbox, "color-filter");
      applyFilters();
    });
  });
  document.querySelectorAll(".size-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      syncCheckboxes(checkbox, "size-filter");
      applyFilters();
    });
  });
  document.querySelectorAll(".rating-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      syncCheckboxes(checkbox, "rating-filter");
      applyFilters();
    });
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    document.querySelectorAll(".color-filter, .size-filter, .rating-filter").forEach((cb) => (cb.checked = false));
    document.getElementById("priceMin").value = 0;
    document.getElementById("priceMax").value = maxProductPrice;
    document.getElementById("minPrice").textContent = 0;
    document.getElementById("maxPrice").textContent = maxProductPrice;
    document.getElementById("priceMinMobile").value = 0;
    document.getElementById("priceMaxMobile").value = maxProductPrice;
    document.getElementById("minPriceMobile").textContent = 0;
    document.getElementById("maxPriceMobile").textContent = maxProductPrice;
    document.getElementById("sortSelect").value = "";
    sortBy = "";
    applyFilters();
    updateRangeTrack();
  });
  document.getElementById("priceMinMobile").addEventListener("input", (e) => {
    document.getElementById("priceMin").value = e.target.value;
    document.getElementById("minPrice").textContent = e.target.value;
    document.getElementById("minPriceMobile").textContent = e.target.value;
    updateRangeTrack();
    applyFilters();
  });
  document.getElementById("priceMaxMobile").addEventListener("input", (e) => {
    document.getElementById("priceMax").value = e.target.value;
    document.getElementById("maxPrice").textContent = e.target.value;
    document.getElementById("maxPriceMobile").textContent = e.target.value;
    updateRangeTrack();
    applyFilters();
  });
  document.getElementById("resetFiltersMobile").addEventListener("click", () => {
    document.querySelectorAll(".color-filter, .size-filter, .rating-filter").forEach((cb) => (cb.checked = false));
    document.getElementById("priceMin").value = 0;
    document.getElementById("priceMax").value = maxProductPrice;
    document.getElementById("minPrice").textContent = 0;
    document.getElementById("maxPrice").textContent = maxProductPrice;
    document.getElementById("priceMinMobile").value = 0;
    document.getElementById("priceMaxMobile").value = maxProductPrice;
    document.getElementById("minPriceMobile").textContent = 0;
    document.getElementById("maxPriceMobile").textContent = maxProductPrice;
    document.getElementById("sortSelect").value = "";
    sortBy = "";
    applyFilters();
    updateRangeTrack();
  });
}
function setupSort() {
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      applyFilters();
    });
  }
}
function applyFilters() {
  const minPrice = parseFloat(document.getElementById("priceMin").value);
  const maxPrice = parseFloat(document.getElementById("priceMax").value);
  const selectedColors = Array.from(document.querySelectorAll(".color-filter:checked")).map((cb) => cb.value);
  const selectedSizes = Array.from(document.querySelectorAll(".size-filter:checked")).map((cb) => cb.value);
  const selectedRatings = Array.from(document.querySelectorAll(".rating-filter:checked")).map((cb) =>
    parseInt(cb.value),
  );
  filteredProducts = allProducts.filter((product) => {
    if (product.Price < minPrice || product.Price > maxPrice) return false;
    if (selectedColors.length > 0 && !selectedColors.some((c) => product.Color.includes(c))) return false;
    if (selectedSizes.length > 0 && !selectedSizes.includes(getProductSize(product.Size))) return false;
    if (selectedRatings.length > 0 && !selectedRatings.includes(Math.round(product.Rate || 0))) return false;
    return true;
  });
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.Price - b.Price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.Price - a.Price);
  }
  currentPage = 1;
  setupPagination();
  renderProducts();
}
function renderProducts() {
  const container = document.getElementById("productsContainer");
  if (!container) return;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageProducts = filteredProducts.slice(start, end);
  if (pageProducts.length === 0) {
    container.innerHTML = '<div class="col-12 text-center py-5"><h4>No products found</h4></div>';
    return;
  }
  container.innerHTML = pageProducts.map((product) => createProductCard(product)).join("");
  setupCardHover();
  pageProducts.forEach((product) => updateCartControl(product.Id, product.Quantity));
  syncWishlistIcons();
  updateWishlistCount();
}
function createProductCard(product) {
  const discountedPrice = product.Discount
    ? (product.Price * (1 - product.Discount / 100)).toFixed(2)
    : product.Price.toFixed(2);
  const stars = renderStars(product.Rate || 0);
  return `
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
            <div class="card product-card h-100" onclick="window.location.href='../product-details/product-details.html?id=${product.Id}'" style="cursor: pointer;">
                <div class="product-card-img">
                    ${product.Discount ? `<span class="bg-danger p-1 px-2 text-white fw-lighter">${product.Discount}% OFF</span>` : ""}
            <span class="p-2 shadow wishlist-btn" onclick="event.stopPropagation(); handleWishlist(${product.Id}, this)"><i class="bi bi-heart"></i></span>
                <img src="../../assets/${product.ImageUrl[getRandomInt(1, 3)]}" alt="${product.Name}" data-hover="../../assets/${product.ImageUrl[getRandomInt(4, 6)]}">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-semibold mb-2">${product.Name}</h5>
                    <div class="mb-auto">
                        <div class="mb-2 text-warning">${stars}</div>
                        <span class="fw-bold fs-5">$${discountedPrice}</span>
                        ${product.Discount ? `<span class="text-decoration-line-through text-muted me-2">$${product.Price.toFixed(2)}</span>` : ""}
                    </div>
                <div class="d-flex flex-column flex-lg-row gap-2 mt-3">
                    <div class="cart-control flex-grow-1" id="cart-control-${product.Id}">
                        <button class="btn btn-primary w-100" onclick="event.stopPropagation(); addToCart(${product.Id}, ${product.Quantity})">Add To Cart</button>
                    </div>
                    <button class="btn btn-secondary flex-grow-1" onclick="event.stopPropagation(); buyNow(${product.Id})">Buy Now</button>
                </div>
                </div>
            </div>
        </div>
    `;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function renderStars(rating) {
  const fullStars = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars += '<span class="fa fa-star checked"></span>';
    } else {
      stars += '<span class="fa fa-star text-muted"></span>';
    }
  }
  return stars;
}
function setupPagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginationEl = document.getElementById("pagination");
  if (!paginationEl) return;
  paginationEl.innerHTML = "";
  if (currentPage > 1) {
    const prevLi = document.createElement("li");
    prevLi.className = "page-item";
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage - 1}); return false;">Previous</a>`;
    paginationEl.appendChild(prevLi);
  }
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i}); return false;">${i}</a>`;
    paginationEl.appendChild(li);
  }
  if (currentPage < totalPages) {
    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage + 1}); return false;">Next</a>`;
    paginationEl.appendChild(nextLi);
  }
}
window.goToPage = function (page) {
  currentPage = page;
  renderProducts();
  setupPagination();
  window.scrollTo({ top: 300, behavior: "smooth" });
};
window.addToCart = function(productId, maxQuantity) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    if (!isLoggedIn || !currentUser) {
        window.location.href = '../auth/login/login.html';
        return;
    }
    const product = allProducts.find(p => p.Id === productId);
    if (!product) return;
    addToCart(product);
    updateCartControl(productId, maxQuantity);
};
window.increaseInCart = function(productId, maxQuantity) {
    const product = allProducts.find(p => p.Id === productId);
    if (!product) return;
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let cart = JSON.parse(localStorage.getItem(`cart_${user?.Id}`)) || [];
    const item = cart.find(i => i.product.Id === productId);
    if (!item) return;
    if (item.quantity >= maxQuantity) {
        alert(`Maximum quantity available is ${maxQuantity}`);
        return;
    }
    addToCart(product);
    updateCartControl(productId, maxQuantity);
};
window.decreaseFromCart = function(productId, maxQuantity) {
    const product = allProducts.find(p => p.Id === productId);
    if (!product) return;
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let cart = JSON.parse(localStorage.getItem(`cart_${user?.Id}`)) || [];
    const item = cart.find(i => i.product.Id === productId);
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem(`cart_${user.Id}`, JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
    } else {
        removeFromCart(productId);
    }
    updateCartControl(productId, maxQuantity);
};
window.updateCartControl = function(productId, maxQuantity) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem(`cart_${user?.Id}`)) || [];
    const item = cart.find(i => i.product.Id === productId);
    const control = document.getElementById(`cart-control-${productId}`);
    if (!control) return;
    if (item) {
        control.innerHTML = `
            <div class="d-flex align-items-center justify-content-center gap-2">
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); decreaseFromCart(${productId}, ${maxQuantity})">-</button>
                <span class="fw-bold">${item.quantity}</span>
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); increaseInCart(${productId}, ${maxQuantity})">+</button>
            </div>
        `;
    } else {
        control.innerHTML = `
            <button class="btn btn-primary w-100" onclick="event.stopPropagation(); addToCart(${productId}, ${maxQuantity})">Add To Cart</button>
        `;
    }
};
window.buyNow = function(productId) {
    const product = allProducts.find(p => p.Id === productId);
    if (!product) return;
    buyNow(product);
};
function setupCardHover() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const img = card.querySelector(".product-card-img img");
    const defaultSrc = img.src;

    card.addEventListener("mouseenter", () => {
      img.src = `../../assets/images/${getRandomInt(4, 6)}.png`;
      card.querySelectorAll(".product-card-img > span").forEach((span) => (span.style.display = "block"));
    });
    card.addEventListener("mouseleave", () => {
      img.src = defaultSrc;
      card.querySelectorAll(".product-card-img > span").forEach((span) => (span.style.display = "none"));
    });
  });
}
function updateRangeTrack() {
  const min = parseInt(document.getElementById("priceMin").value);
  const max = parseInt(document.getElementById("priceMax").value);
  const left = (min / maxProductPrice) * 100;
  const right = 100 - (max / maxProductPrice) * 100;
  const gradient = `linear-gradient(to right, #e9ecef ${left}%, #8A593D ${left}%, #8A593D ${100 - right}%, #e9ecef ${100 - right}%)`;
  document.querySelectorAll(".range-track").forEach((track) => {
    track.style.background = gradient;
  });
}
function syncCheckboxes(changedCheckbox, className) {
  const value = changedCheckbox.value;
  const isChecked = changedCheckbox.checked;
  document.querySelectorAll(`.${className}`).forEach((cb) => {
    if (cb.value === value) {
      cb.checked = isChecked;
    }
  });
}
window.handleWishlist = function(productId, btn) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = '../auth/login/login.html';
        return;
    }
    const icon = btn.querySelector('i');
    if (icon.classList.contains('bi-heart-fill')) {
        removeFromWishlist(productId);
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        btn.style.backgroundColor = '';
        btn.style.color = '';
    } else {
        addToWishlist(productId);
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        btn.style.backgroundColor = 'white';
        btn.style.color = '#8A593D';
    }
    updateWishlistCount();
};

// Sync wishlist heart icons with localStorage on render
function syncWishlistIcons() {
    if (!isAuthenticated()) return;
    const wishlist = getWishlistItems();
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        const match = onclickAttr?.match(/handleWishlist\((\d+)/);
        if (!match) return;
        const productId = parseInt(match[1]);
        const icon = btn.querySelector('i');
        if (wishlist.includes(productId)) {
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
            btn.style.backgroundColor = 'white';
            btn.style.color = '#8A593D';
        } else {
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }
    });
}

// Update wishlist count in navbar
function updateWishlistCount() {
    let badge = document.getElementById('wishlist-count');
    // Dynamically inject the badge if it doesn't exist in the navbar
    if (!badge) {
        const wishlistLink = document.querySelector('.navbar-icons a[href*="wishlist"]');
        if (!wishlistLink) return;
        wishlistLink.style.position = 'relative';
        badge = document.createElement('span');
        badge.id = 'wishlist-count';
        badge.className = 'badge position-absolute top-0 start-100 translate-middle rounded-pill';
        wishlistLink.appendChild(badge);
    }
    if (!isAuthenticated()) {
        badge.textContent = '0';
        return;
    }
    const wishlist = getWishlistItems();
    badge.textContent = wishlist.length;
}