// JS
// console.log("wish page loaded");

let emptyMessage = document.getElementById("emptyMessage");
let wishContainer = document.getElementById("wishContainer");

function loadwish() {
    return JSON.parse(localStorage.getItem("wish")) || [];
}

function savewish(wish) {
    localStorage.setItem("wish", JSON.stringify(wish));
}

function renderwish() {
    let wish = loadwish();

    if (!emptyMessage || !wishContainer) return;

    if (wish.length === 0) {
        emptyMessage.style.display = "block";
        wishContainer.style.display = "none";
    } else {
        emptyMessage.style.display = "none";
        wishContainer.style.display = "block";
    }

    wishContainer.innerHTML = "";

    wish.forEach((item, index) => {
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
                    <p class="mb-0"><strong>Price:</strong> ${item.price}</p>
                </div>

                <div class="col-md-4 text-center">
                    <div class="d-flex justify-content-center gap-2">
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                            Remove 🗑️
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="addToCart(${index})">
                            Add To Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
        `;
        wishContainer.appendChild(card);
    });
}

// Remove item
function removeItem(index) {
    let wish = loadwish();
    wish.splice(index, 1);
    savewish(wish);
    renderwish();
}
function addToCart(index) {
    let wish = loadwish();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = wish[index];

    // check if item already exists in cart
    let existing = cart.find(p => p.id === item.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: item.quantity || 1
        });
      
    }

    // save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // remove from wishlist
    wish.splice(index, 1);
    savewish(wish);
    
    renderwish();

    alert("Added to cart ✅");
    window.location.href = "cart.html";
}
// Add new item (Test)
function addTestItem() {
    let wish = loadwish();
    wish.push({
        id: Date.now(),
        image: "assets/images/1.png", 
        name: "New Test Product",
        model: "Model X",
        quantity: 1,
        price: 250
    });
    savewish(wish);
    renderwish();
}
// renderwish();
// دى عشان الايرور اللى بيطلع لم انقل للكارت
document.addEventListener("DOMContentLoaded", () => {
    renderwish();
});