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
            <div class="row align-items-center">

                <div class="col-md-2 text-center">
                    <img src="${item.image}" width="80" height="80" style="object-fit: cover;">
                </div>

                <div class="col-md-6">
                    <p class="mb-1"><strong>Name:</strong> ${item.name}</p>
                    <p class="mb-1"><strong>Model:</strong> ${item.model}</p>
                    <p class="mb-0"><strong>Price:</strong> $${item.price}</p>
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
        `;

        cartContainer.appendChild(card);
    });
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
        // image: "images/product.jpg", 
        name: "New Test Product",
        model: "Model X",
        quantity: 1,
        price: 250
    });
    saveCart(cart);
    renderCart();
}
renderCart();

//Test --> Adding Item 1
// cart.push({
//   id: 2,
//   image: "images/product.jpg",
//   name: "Second Product",
//   model: "Model 2",
//   quantity: 1,
//   price: 200
// });
// localStorage.setItem("cart", JSON.stringify(cart));

// localStorage.removeItem("cart")
// دا عشان امسح العنصر اللى اسمه item اللى فى local storage 

//localStorage.clear()
// دا عشان امسح كل اللى فى الlocal storage عموما