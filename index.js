import { getAllProducts } from './services/product.service.js';

// index.js - works for any page
// Load Navbar
fetch('/Shared/Navbar/navbar.html')   // absolute path from root
  .then(res => res.text())
  .then(html => document.getElementById('navbar-container').innerHTML = html)
  .catch(err => console.error("Error loading Navbar:", err));

// Load Footer
fetch('/Shared/Footer/footer.html')   // absolute path from root
  .then(res => res.text())
  .then(html => document.getElementById('footer-container').innerHTML = html)
  .catch(err => console.error("Error loading Footer:", err));

// get elements
let prevCatBtn = document.getElementById('prevCatBtn');
let nextCatBtn = document.getElementById('nextCatBtn');
let slideContainer = document.getElementById('cat-slide-container');
let shopNowBtns = document.querySelectorAll('.shop-btn');
let ourProductTitles = document.getElementById('our-products-titles');
let newArrivalsSlideContainer = document.getElementById('new-arrivals-slide-container');
let nextNewArrivalsBtn = document.getElementById('nextNewArrivalsBtn');
let prevNewArrivalsBtn = document.getElementById('prevNewArrivalsBtn');

// add event listeners
prevCatBtn.addEventListener('click', prevCatSlide);
nextCatBtn.addEventListener('click', nextCatSlide);
shopNowBtns.forEach(btn => {
    btn.addEventListener('click', goToShop);
});
ourProductTitles.addEventListener('click', (e) => {
    if (e.target.id == 'latest') {
        Array.from(ourProductTitles.children).forEach(title => title.style.color = 'black');
        e.target.style.color = 'var(--theme-default)';
        buildProductCards(latestProducts, 'our-products-container');
    }
    if (e.target.id == 'featured') {
        Array.from(ourProductTitles.children).forEach(title => title.style.color = 'black');
        e.target.style.color = 'var(--theme-default)';
        buildProductCards(featuredProducts, 'our-products-container');
    }
    if (e.target.id == 'best-selling') {
        Array.from(ourProductTitles.children).forEach(title => title.style.color = 'black');
        e.target.style.color = 'var(--theme-default)';
        buildProductCards(bestSellingAndNotFeaturedProducts, 'our-products-container');
    }
});
nextNewArrivalsBtn.addEventListener('click', nextNewArrivalsSlide);
prevNewArrivalsBtn.addEventListener('click', prevNewArrivalsSlide);

// cat data
let categories = [
    { name: "Sideboard", image: "assets/images/category-4.png" },
    { name: "Sofa", image: "assets/images/category-6.png" },
    { name: "Arm Chair", image: "assets/images/category-7.png" },
    { name: "Night Stand", image: "assets/images/category-1.png" },
    { name: "Wardrobe", image: "assets/images/category-2.png" },
    { name: "Cupboard", image: "assets/images/category-5.png" },
    { name: "Bed", image: "assets/images/category-3.png" },
];
// slides arrays
let catSlideArr = [categories.slice(0, 6), categories.slice(1, 7)]
// create card 4 each category
function renderCatSlide() {
    slideContainer.innerHTML = '';
    catSlideArr[0].forEach(cat => {
        let catCard = document.createElement('div');
        catCard.className = 'col-4 col-md-2';
        catCard.innerHTML = `
            <div class="card category-card border-0 justify-content-center align-items-center">
                <div class="img-wrapper mt-3">
                        <img src="${cat.image}" class="card-img-top p-2" alt="${cat.name}">
                </div>                
                <div class="card-body text-center">
                    <h5 class="card-title text-capitalize fw-medium fs-6">${cat.name}</h5>
                </div>
            </div>
        `;
        slideContainer.appendChild(catCard);
    });
}
// call it for the first time to render on page load
renderCatSlide();
// slide functions
function nextCatSlide() {
    catSlideArr.push(catSlideArr.shift());
    renderCatSlide();
}
function prevCatSlide() {
    catSlideArr.unshift(catSlideArr.pop());
    renderCatSlide();
}
// auto slide every 3 seconds
setInterval(() => {
    nextCatSlide();
}, 3000);

// Our Products Section
// get all products
let allProducts = await getAllProducts();
// get latest 8 products added
let latestProducts = allProducts
    .filter(p => p.CreatedAt && !isNaN(new Date(p.CreatedAt)))
    .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
    .slice(0, 8);
// get first 8 featured products
let featuredProducts = allProducts.filter(p => p.IsFeatured).slice(0, 8);
// get first 8 best selling products
let bestSellingAndNotFeaturedProducts = allProducts.filter(p => p.IsBestSeller && !p.IsFeatured).slice(0, 8);
// product cards builder function
function buildProductCards(products, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-12 col-sm-6 col-md-3';
        // handle rate
        const rate = Math.round(product.Rate) || 0;
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<span class="fa fa-star${i <= rate ? ' checked' : 'text-muted'}"></span>`;
        }
        productCard.innerHTML = `
            <div class="card product-card h-100">
                <div class="product-card-img">
                    <span class="bg-danger p-1 px-2 text-white fw-lighter">${product.Discount}% OFF</span>
                    <span class="p-2 shadow add-to-wishlist-btn"><i class="bi bi-heart"></i></span>
                    <img src="assets/${product.ImageUrl[getRandomInt(0, product.ImageUrl.length - 1)]}" alt="${product.Name}">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-semibold mb-2">${product.Name}</h5>
                    <div class="mb-auto">
                        <div class="mb-2 text-warning">${starsHtml}</div>
                        <span class="fw-bold fs-5">$${product.Price - (product.Price * product.Discount / 100)}</span>
                        <span class="text-decoration-line-through text-muted me-2">$${product.Price}</span>
                    </div>
                    <div class="d-flex flex-wrap flex-xl-nowrap justify-content-between mt-3 gap-2">
                        <button class="btn btn-primary flex-grow-1 add-to-cart-btn" type="button">Add To Cart</button>
                        <button class="btn btn-secondary flex-grow-1 buy-now-btn" type="button">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        // Add hover event listeners to the product card
        let cardElement = productCard.querySelector('.product-card');
        let productCardImg = cardElement.querySelector('.product-card-img');
        let spans = productCardImg.querySelectorAll('span');
        let img = productCardImg.querySelector('img');
        let name = cardElement.querySelector('.card-title');
        cardElement.addEventListener('mouseenter', () => {
            img.src = `assets/images/${getRandomInt(1, 6)}.png`;
            spans.forEach(span => span.style.display = 'block');
        });
        cardElement.addEventListener('mouseleave', () => {
            img.src = `assets/images/${getRandomInt(1, 6)}.png`;
            spans.forEach(span => span.style.display = 'none');
        });
        name.addEventListener('click', () => {
            goToProductDetails(product.Id);
        });
        container.appendChild(productCard);
    });
}
// initially build latest products
buildProductCards(latestProducts, 'our-products-container');

// new arrivals section
// slides arrays
let newArrivalsSlideArr = [latestProducts.slice(0, 4), latestProducts.slice(4, 8)]
// create card 4 each category
function renderNewArrivalsSlide() {
    newArrivalsSlideContainer.innerHTML = '';
    buildProductCards(newArrivalsSlideArr[0], 'new-arrivals-slide-container');
}
// call it for the first time to render on page load
renderNewArrivalsSlide();
// slide functions
function nextNewArrivalsSlide() {
    newArrivalsSlideArr.push(newArrivalsSlideArr.shift());
    renderNewArrivalsSlide();
}
function prevNewArrivalsSlide() {
    newArrivalsSlideArr.unshift(newArrivalsSlideArr.pop());
    renderNewArrivalsSlide();
}
// auto slide every 3 seconds
setInterval(() => {
    nextNewArrivalsSlide();
}, 3000);

// navigation functions
function goToShop() {
    window.location.href = '/pages/shop/shop.html';
}

function goToShopFilteredByCategory(categoryName) {
    window.location.href = `/pages/shop/shop.html?category=${categoryName}`;
}

function goToShopFilteredBySearch(searchQuery) {
    window.location.href = `/pages/shop/shop.html?search=${searchQuery}`;
}

function goToProductDetails(productId) {
    window.location.href = `/pages/product-details/product-details.html?id=${productId}`;
}

// helpers
//get random number between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}