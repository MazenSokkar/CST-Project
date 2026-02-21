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

// add event listeners
prevCatBtn.addEventListener('click', prevCatSlide);
nextCatBtn.addEventListener('click', nextCatSlide);
shopNowBtns.forEach(btn => {
    btn.addEventListener('click', goToShop);
});

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