import { GetProductById } from "../../services/product.service.js";
import { addToCart, buyNow } from '../../shared/js/local-storage-management.js';

const container = document.getElementById("productContainer");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
    container.innerHTML = "<h3>Product not found</h3>";
} else {
    loadProduct(productId);
}

async function loadProduct(id) {
    try {
        const product = await GetProductById(id);

        console.log(product);

        const images = product.ImageUrl || [];
        const colors = product.Color || [];

        container.innerHTML = `
        <div class=" product-details">
            <div class="breadcrumb-main">
                <div class="container">
                    <div class="breadcrumb-container">
                        <h2 class="page-title">${product.Name}</h2>
                        <ul class="breadcrumb">
                          <li class="breadcrumb-item">
                            <a href="../../index.html">Home</a>
                          </li>
                          <li class="breadcrumb-item">
                            <a href="#">${product.Name}</a>
                          </li>
                        </ul>
                      </div>
                </div>
            </div>

            <div class="container my-5">
            <div class="row">
                <!-- Left: Images -->
                <div class="col-lg-5 mb-4">
                    <div class="zoom border rounded">
                        <img src="../../assets/${product.ImageUrl[0]}" 
                             class="product-img w-100" 
                             alt="${product.Name}">
                    </div>

                    <div class="px-1 mt-3">
                        <div class="row g-3 px-3">
                            ${images.slice(0, 4).map(img => `
                                <div class="col-3">
                                    <div class="thumbnails-img border rounded">
                                        <img src="../../assets/${img}"
                                             class="w-100 rounded thumbnail-img " 
                                             style="cursor:pointer">
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>

                <!-- Right: Details -->
<div class="col-lg-7">

    <!-- Rating -->
    <div class="d-flex align-items-center mb-2">
        <div class="text-warning me-2">
            ${"★".repeat(Math.floor(product.Rate))}
        </div>
        <span class="text-muted small">(${product.ReviewCount || 30} reviews)</span>
    </div>

    <!-- Title -->
    <h2 class="fw-bold mb-3">${product.Name}</h2>

    <!-- Price -->
    <div class="mb-3">
        <span class="fs-3 fw-bold">
            ${product.Price.toLocaleString()} $
        </span>

        ${product.Discount > 0 ? `
            <span class="text-muted text-decoration-line-through ms-2">
                ${(product.Price + (product.Price * product.Discount / 100)).toLocaleString()} $
            </span>
            <span class="text-danger ms-2">
                ${product.Discount}% Off
            </span>
        ` : ""}
    </div>

    <hr>

    <!-- Meta Info -->
    <div class="product-meta mb-4">
        <div class="d-flex justify-content-between">
            <span class="text-muted">SKU:</span>
            <span>#${product.Id}</span>
        </div>

        <div class="d-flex justify-content-between">
            <span class="text-muted">Availability:</span>
            <span class="text-success">In Stock</span>
        </div>

        <div class="d-flex justify-content-between">
            <span class="text-muted">Category:</span>
            <span>${product.Category}</span>
        </div>

        <div class="d-flex justify-content-between">
            <span class="text-muted">Seller:</span>
            <span>${product.SellerName}</span>
        </div>
    </div>

    <hr>

    <!-- Colors -->
    <h6 class="fw-bold">Color</h6>
    <div class="d-flex gap-2 mb-4">
        ${colors.map(color => `
            <div class="color-circle" style="background:${color}"></div>
        `).join("")}
    </div>

    <!-- Quantity + Buttons -->
    <div class="d-flex align-items-center gap-3 mb-3">
        <div class="qty-box d-flex align-items-center">
            <button onclick="decrease()">-</button>
            <input type="number" id="qty" value="1" min="1">
            <button onclick="increase()">+</button>
        </div>

        <button class="btn add-cart-btn">
            Add to cart
        </button>
    </div>

    <button class="btn buy-now-btn w-100">
        Buy Now
    </button>

</div>
 <section class="mt-50">
                <div class="container">
                    <div class="product-detail-review">
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="nav nav-pills nav-lb-tab" id="myTab" role="tablist">
                                    <!-- nav item -->
                                    <li class="nav-item" role="presentation">
                                        <!-- btn -->
                                        <button class="nav-link active" id="product-tab" data-bs-toggle="tab"
                                            data-bs-target="#product-tab-pane" type="button" role="tab"
                                            aria-controls="product-tab-pane" aria-selected="true">
                                            Product Details
                                        </button>
                                    </li>
                                    <!-- nav item -->
                                    <li class="nav-item" role="presentation">
                                        <!-- btn -->
                                        <button class="nav-link" id="reviews-tab" data-bs-toggle="tab"
                                            data-bs-target="#reviews-tab-pane" type="button" role="tab"
                                            aria-controls="reviews-tab-pane" aria-selected="false" tabindex="-1">
                                            Reviews
                                        </button>
                                    </li>
                                </ul>
                                <!-- tab content -->
                                <div class="tab-content" id="myTabContent">
                                    <!-- tab pane -->
                                    <div class="tab-pane fade show active" id="product-tab-pane" role="tabpanel"
                                        aria-labelledby="product-tab" tabindex="0">
                                        <div class="my-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo assumenda asperiores atque nisi ipsa deleniti similique? Neque esse voluptate ipsa, sunt quas delectus amet vitae dignissimos incidunt nisi asperiores vel placeat cum quidem. Quasi voluptatem, recusandae quod eos deserunt animi libero optio totam labore officiis minus illo nemo maxime, sequi, magni voluptate nostrum aspernatur aperiam amet tempora possimus. Nisi aut, consectetur soluta culpa quos eius nostrum inventore. Officia quaerat cupiditate molestiae nihil. Eos sequi consectetur sapiente officiis sed. Minus, nostrum sequi? Id quaerat explicabo voluptatibus dolorum accusamus quis ipsam animi nostrum similique. Nobis, temporibus possimus laboriosam repellendus in excepturi?</p>
                                            <h4><strong>Unordered List</strong></h4>
                                            <ul class="m-0 ps-3">
                                                <li>Lorem ipsum dolor sit amet.</li>
                                                <li>Lorem ipsum dolor sit amet.</li>
                                                <li>Lorem ipsum dolor sit amet.</li>
                                                <li>Lorem ipsum dolor sit amet.</li>
                                            </ul>
                                            <h4 class="mt-3"><strong>Ordered Lista</strong></h4>
                                            <ol class="m-0 ps-3">
                                                <li>Lorem ipsum dolor sit amet.</li>
                                                <li>Lorem ipsum dolor sit amet.</li>
                                                <li>Lorem ipsum dolor sit amet.</li>
                                                <li>Lorem ipsum dolor sit amet.</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel"
                                        aria-labelledby="reviews-tab" tabindex="0">
                                        <div class="my-4">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-5">
                                                        <div class="d-flex border-bottom pb-2 mb-2">
                                                            <div>
                                                                <h6 class="mb-1">Devid1</h6>
                                                                <p class="small">
                                                                    <span class="text-muted">01 January 2000</span>
                                                                    <span class="verified-badge">Verified</span>
                                                                </p>
                                                                <div class="mb-2">
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                </div>
                                                                <p>
                                                                    Nice Product
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="mb-0">
                                                        <div class="d-flex">
                                                            <div>
                                                                <h6 class="mb-1">Devid2</h6>
                                                                <p class="small">
                                                                    <span class="text-muted">01 January 2000</span>
                                                                    <span class="verified-badge">Verified</span>
                                                                </p>
                                                                <div class="mb-2">
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-fill text-warning"></i>
                                                                    <i class="bi bi-star-half text-warning"></i>
                                                                </div>
                                                                <p>
                                                                    Nice Product
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
 </section>
        `;
        
        // بعد container.innerHTML ...
const addCartBtn = document.querySelector(".add-cart-btn");
const buyNowBtn = document.querySelector(".buy-now-btn");
const qtyInput = document.getElementById("qty");

addCartBtn.addEventListener("click", () => {
    const quantity = parseInt(qtyInput.value);
    addToCart({ ...product, quantity });
});

buyNowBtn.addEventListener("click", () => {
    const quantity = parseInt(qtyInput.value);
    buyNow({ ...product, quantity });
});
        const thumbnails = document.querySelectorAll(".thumbnail-img");
        const mainImage = document.querySelector(".product-img");

        thumbnails.forEach(img => {
            img.addEventListener("click", () => {
                mainImage.src = img.src;
            });
        });

    } catch (error) {
        container.innerHTML = `<h3>${error.message}</h3>`;
    }
}

window.increase = function () {
    const qty = document.getElementById("qty");
    qty.value = parseInt(qty.value) + 1;
};

window.decrease = function () {
    const qty = document.getElementById("qty");
    if (qty.value > 1) {
        qty.value = parseInt(qty.value) - 1;
    }
};
