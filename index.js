import { getAllProducts } from './services/product.service.js';
import * as LSManager from './shared/js/local-storage-management.js';

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
let shopNowBtns = document.querySelectorAll('.shop-btn');
let ourProductTitles = document.getElementById('our-products-titles');
let nextNewArrivalsBtn = document.getElementById('nextNewArrivalsBtn');
let prevNewArrivalsBtn = document.getElementById('prevNewArrivalsBtn');
let nextLatestBlogBtn = document.getElementById('nextLatestBlogBtn');
let prevLatestBlogBtn = document.getElementById('prevLatestBlogBtn');

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
nextLatestBlogBtn.addEventListener('click', nextLatestBlogsSlide);
prevLatestBlogBtn.addEventListener('click', prevLatestBlogsSlide);

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
// call it for the first time to render on page load
buildCategoryCards(catSlideArr, 'cat-slide-container');
// slide functions
function nextCatSlide() {
    catSlideArr.push(catSlideArr.shift());
    buildCategoryCards(catSlideArr, 'cat-slide-container');
}
function prevCatSlide() {
    catSlideArr.unshift(catSlideArr.pop());
    buildCategoryCards(catSlideArr, 'cat-slide-container');
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

// initially build latest products
buildProductCards(latestProducts, 'our-products-container');

// new arrivals section
// slides arrays
let newArrivalsSlideArr = [latestProducts.slice(0, 4), latestProducts.slice(4, 8)]
// call it for the first time to render on page load
buildProductCards(newArrivalsSlideArr[0], 'new-arrivals-slide-container');
// slide functions
function nextNewArrivalsSlide() {
    newArrivalsSlideArr.push(newArrivalsSlideArr.shift());
    buildProductCards(newArrivalsSlideArr[0], 'new-arrivals-slide-container');
}
function prevNewArrivalsSlide() {
    newArrivalsSlideArr.unshift(newArrivalsSlideArr.pop());
    buildProductCards(newArrivalsSlideArr[0], 'new-arrivals-slide-container');
}
// auto slide every 3 seconds
setInterval(() => {
    nextNewArrivalsSlide();
}, 3000);

// latest blog section
// cat data
let latestBlogs = [
    { description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates excepturi enim!", image: "assets/images/bg-1.jpg", date: "2023-11-12", commentsNumber: 5 },
    { description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates excepturi enim!", image: "assets/images/bg-2.jpg", date: "2023-11-13", commentsNumber: 3 },
    { description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates excepturi enim!", image: "assets/images/bg-3.jpg", date: "2023-11-14", commentsNumber: 7 },
    { description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates excepturi enim!", image: "assets/images/bg-4.jpg", date: "2023-11-15", commentsNumber: 2 },
    { description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates excepturi enim!", image: "assets/images/bg-6.jpg", date: "2023-11-17", commentsNumber: 4 },
];
// slides arrays
let latestBlogsSlideArr = [latestBlogs.slice(0, 3), latestBlogs.slice(1, 4)]
// call it for the first time to render on page load
buildLatestBlogCards(latestBlogsSlideArr, 'latest-blog-slide-container');
// slide functions
function nextLatestBlogsSlide() {
    latestBlogsSlideArr.push(latestBlogsSlideArr.shift());
    buildLatestBlogCards(latestBlogsSlideArr, 'latest-blog-slide-container');
}
function prevLatestBlogsSlide() {
    latestBlogsSlideArr.unshift(latestBlogsSlideArr.pop());
    buildLatestBlogCards(latestBlogsSlideArr, 'latest-blog-slide-container');
}
// auto slide every 3 seconds
setInterval(() => {
    nextLatestBlogsSlide();
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
        let addToWishlistBtn = cardElement.querySelector('.add-to-wishlist-btn');
        let addToCartBtn = cardElement.querySelector('.add-to-cart-btn');
        let buyNowBtn = cardElement.querySelector('.buy-now-btn');
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
        addToWishlistBtn.addEventListener('click', () => {
            LSManager.addToWishlist(product.Id);
        });
        addToCartBtn.addEventListener('click', () => {
            LSManager.addToCart(product);
        });
        buyNowBtn.addEventListener('click', () => {
            LSManager.buyNow(product);
        });
        container.appendChild(productCard);
    });
}

// build categories cards in categories section
function buildCategoryCards(categories, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    categories[0].forEach(cat => {
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
        container.appendChild(catCard);
    });
}

// build blog cards in latest blog section
function buildLatestBlogCards(blogs, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    blogs[0].forEach(blog => {
        let blogCard = document.createElement('div');
        blogCard.className = 'col-12 col-sm-6 col-md-4 mb-4';
        blogCard.innerHTML = `
            <div class="card">
                <img src="${blog.image}" alt="${blog.description}">
                <div class="card-body">
                    <div class="d-flex justify-content-center flex-wrap">
                        <div class="px-3 py-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg> ${blog.date}</div>
                        <div class="px-3 py-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M115.9 448.9C83.3 408.6 64 358.4 64 304C64 171.5 178.6 64 320 64C461.4 64 576 171.5 576 304C576 436.5 461.4 544 320 544C283.5 544 248.8 536.8 217.4 524L101 573.9C97.3 575.5 93.5 576 89.5 576C75.4 576 64 564.6 64 550.5C64 546.2 65.1 542 67.1 538.3L115.9 448.9zM153.2 418.7C165.4 433.8 167.3 454.8 158 471.9L140 505L198.5 479.9C210.3 474.8 223.7 474.7 235.6 479.6C261.3 490.1 289.8 496 319.9 496C437.7 496 527.9 407.2 527.9 304C527.9 200.8 437.8 112 320 112C202.2 112 112 200.8 112 304C112 346.8 127.1 386.4 153.2 418.7z"/></svg> ${blog.commentsNumber} comments</div>
                    </div>
                    <p class="card-text">${blog.description}</p>
                    <button class="btn btn-primary px-4 py-2" type="button">Read More</button>
                </div>
        </div>
        `;
        container.appendChild(blogCard);
    });
}