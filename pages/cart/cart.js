// JS
// console.log("Cart page loaded");

let emptyMessage = document.getElementById("emptyMessage");
let cartContainer = document.getElementById("cartContainer");

function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    let cart = loadCart();

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
                <img src="${item.image}" width="80" height="80" style="object-fit: cover;">
            </div>

            <div class="col-md-6">
                <p class="mb-1"><strong>Name:</strong> ${item.name}</p>
                <p class="mb-1"><strong>Model:</strong> ${item.model}</p>
                <p class="mb-0"><strong>Price:</strong> $${item.price * item.quantity}</p>
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
                <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                    Remove 🗑️
                </button>
            </div>

        </div>
    </div>
`;
        cartContainer.appendChild(card);
    });

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
    <button class="btn btn-danger btn-sm" onclick="checkout()">Check Out</button>
    </div>
    `;

    cartContainer.appendChild(checkoutbtn);
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

// Add new item (Test)
function addTestItem() {
    let cart = loadCart();
    cart.push({
        id: Date.now(),
        image: "assets/images/1.png", 
        name: "New Test Product",
        model:"Model X",
        quantity: 1,
        price: 250
    });
    saveCart(cart);
    renderCart();
}
// function checkout() {
//     alert("Proceeding to checkout 💳");
// }
renderCart();
