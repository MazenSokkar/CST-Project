import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";
import { getAllProducts, deleteProduct, UpdateProduct, addProduct } from "../../../services/product.service.js";

await loadSidebar("Products");

const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");
const paginationInfo = document.getElementById("paginationInfo");

const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const addModal = new bootstrap.Modal(document.getElementById("addProductModal"));
const addProductBtn = document.getElementById("addProductBtn");

addProductBtn.addEventListener("click", () => {
    ["addName","addPrice","addQuantity","addCategory","addColor","addSellerName","addDiscount","addRate","addDescription"]
    .forEach(id => document.getElementById(id).value = "");
    
    ["errorName","errorPrice","errorQuantity","errorCategory","errorColor","errorSellerName","errorDiscount","errorRate","errorDescription"]
    .forEach(id => document.getElementById(id).innerText = "");

    addModal.show();
});

let products = [];
let filteredProducts = [];
let currentPage = 1;
const rowsPerPage = 5;
let selectedProductId = null;
let categoriesFromDB = [];

async function loadProducts() {
    products = await getAllProducts();
    filteredProducts = [...products];

    const map = {};
    products.forEach(p => map[p.Category] = true);
    categoriesFromDB = Object.keys(map);

    renderTable();
}

function renderTable() {
    tableBody.innerHTML = "";
    const start = (currentPage - 1) * rowsPerPage;
    const paginated = filteredProducts.slice(start, start + rowsPerPage);

    paginated.forEach(product => {
        tableBody.innerHTML += `
            <tr data-id="${product.Id}">
                <td>#${product.Id}</td>
                <td>${product.Name}</td>
                <td>${product.Price} EGP</td>
                <td>${product.Category}</td>
                <td>${product.Quantity}</td>
                <td>${product.Rate}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary edit-btn">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    renderPagination();
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    filteredProducts = products.filter(p =>
        p.Name.toLowerCase().includes(value) ||
        p.Category.toLowerCase().includes(value) ||
        p.SellerName.toLowerCase().includes(value)
    );
    currentPage = 1;
    renderTable();
});

function renderPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(filteredProducts.length / rowsPerPage) || 1;
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, filteredProducts.length);
    paginationInfo.innerText = `Showing ${start} - ${end} of ${filteredProducts.length}`;

    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement("li");
        li.className = "page-item";
        const a = document.createElement("a");
        a.href = "#";
        a.className = `page-link ${i === currentPage ? "active" : ""}`;
        a.innerText = i;
        a.addEventListener("click", e => { e.preventDefault(); currentPage = i; renderTable(); });
        li.appendChild(a);
        pagination.appendChild(li);
    }
}

// Handle edit/delete buttons
tableBody.addEventListener("click", async (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    const id = Number(row.dataset.id);

    if (e.target.closest(".delete-btn")) {
        if (!confirm("Delete this product?")) return;
        await deleteProduct(id);
        products = products.filter(p => p.Id !== id);
        filteredProducts = [...products];
        renderTable();
    }

    if (e.target.closest(".edit-btn")) {
        const product = products.find(p => p.Id === id);
        selectedProductId = id;

        ["editName","editPrice","editQuantity","editCategory","editColor","editSellerName","editDiscount","editRate","editDescription"]
        .forEach(field => document.getElementById(field).value = product[field.replace("edit","")] || "");

        ["errorEditName","errorEditPrice","errorEditQuantity","errorEditCategory","errorEditColor","errorEditSellerName","errorEditDiscount","errorEditRate","errorEditDescription"]
        .forEach(err => document.getElementById(err).innerText = "");

        editModal.show();
    }
});

// Save edit
document.getElementById("saveEdit").addEventListener("click", async () => {
    const Name = document.getElementById("editName").value.trim();
    const Price = Number(document.getElementById("editPrice").value);
    const Quantity = Number(document.getElementById("editQuantity").value);
    const Category = document.getElementById("editCategory").value.trim();
    const Color = document.getElementById("editColor").value.trim();
    const SellerName = document.getElementById("editSellerName").value.trim();
    const Discount = Number(document.getElementById("editDiscount").value);
    const Rate = Number(document.getElementById("editRate").value);
    const Description = document.getElementById("editDescription").value.trim();

    const errorIds = ["errorEditName","errorEditPrice","errorEditQuantity","errorEditCategory","errorEditColor","errorEditSellerName","errorEditDiscount","errorEditRate","errorEditDescription"];
    errorIds.forEach(id => document.getElementById(id).innerText = "");

    let hasError = false;
    const lettersOnly = /^[A-Za-z\s]+$/;

    if(!Name || !lettersOnly.test(Name)) { document.getElementById("errorEditName").innerText = "Name is required and letters only"; hasError = true; }
    if(isNaN(Price) || Price <= 0) { document.getElementById("errorEditPrice").innerText = "Price must be positive"; hasError = true; }
    if(isNaN(Quantity) || Quantity < 0) { document.getElementById("errorEditQuantity").innerText = "Quantity must be 0 or more"; hasError = true; }
    if(!Category) { document.getElementById("errorEditCategory").innerText = "Category required"; hasError = true; }
    else if(!categoriesFromDB.includes(Category)) { document.getElementById("errorEditCategory").innerText = `Category must be one of: ${categoriesFromDB.join(", ")}`; hasError = true; }
    if(!Color || !lettersOnly.test(Color)) { document.getElementById("errorEditColor").innerText = "Color is required and letters only"; hasError = true; }
    if(SellerName && !lettersOnly.test(SellerName)) { document.getElementById("errorEditSellerName").innerText = "Seller Name must be letters only"; hasError = true; }
    if(isNaN(Discount) || Discount < 0 || Discount > 100) { document.getElementById("errorEditDiscount").innerText = "Discount 0-100"; hasError = true; }
    if(isNaN(Rate) || Rate < 0 || Rate > 5) { document.getElementById("errorEditRate").innerText = "Rate 0-5"; hasError = true; }

    if(hasError) return;

    const updatedProduct = products.find(p => p.Id === selectedProductId);
    updatedProduct.Name = Name;
    updatedProduct.Price = Price;
    updatedProduct.Quantity = Quantity;
    updatedProduct.Category = Category;
    updatedProduct.Color = Color;
    updatedProduct.SellerName = SellerName || "Admin";
    updatedProduct.Discount = Discount;
    updatedProduct.Rate = Rate;
    updatedProduct.Description = Description;

    const success = await UpdateProduct(updatedProduct);
    if(success) { editModal.hide(); renderTable(); }
});

// Save add
document.getElementById("saveAddProduct").addEventListener("click", async () => {
    const Name = document.getElementById("addName").value.trim();
    const Price = Number(document.getElementById("addPrice").value);
    const Quantity = Number(document.getElementById("addQuantity").value);
    const Category = document.getElementById("addCategory").value.trim();
    const Color = document.getElementById("addColor").value.trim();
    let SellerName = document.getElementById("addSellerName").value.trim() || "Admin";
    const Discount = Number(document.getElementById("addDiscount").value);
    const Rate = Number(document.getElementById("addRate").value);
    const Description = document.getElementById("addDescription").value.trim();

    const errorIds = ["errorName","errorPrice","errorQuantity","errorCategory","errorColor","errorSellerName","errorDiscount","errorRate","errorDescription"];
    errorIds.forEach(id => document.getElementById(id).innerText = "");

    let hasError = false;
    const lettersOnly = /^[A-Za-z\s]+$/;

    if(!Name || !lettersOnly.test(Name)) { document.getElementById("errorName").innerText = "Name required and letters only"; hasError = true; }
    if(isNaN(Price) || Price <= 0) { document.getElementById("errorPrice").innerText = "Price must be positive"; hasError = true; }
    if(isNaN(Quantity) || Quantity < 0) { document.getElementById("errorQuantity").innerText = "Quantity must be 0 or more"; hasError = true; }
    if(!Category) { document.getElementById("errorCategory").innerText = "Category required"; hasError = true; }
    else if(!categoriesFromDB.includes(Category)) { document.getElementById("errorCategory").innerText = `Category must be one of: ${categoriesFromDB.join(", ")}`; hasError = true; }
    if(!Color || !lettersOnly.test(Color)) { document.getElementById("errorColor").innerText = "Color required and letters only"; hasError = true; }
    if(SellerName && !lettersOnly.test(SellerName)) { document.getElementById("errorSellerName").innerText = "Seller Name must be letters only"; hasError = true; }
    if(isNaN(Discount) || Discount < 0 || Discount > 100) { document.getElementById("errorDiscount").innerText = "Discount 0-100"; hasError = true; }
    if(isNaN(Rate) || Rate < 0 || Rate > 5) { document.getElementById("errorRate").innerText = "Rate 0-5"; hasError = true; }

    if(hasError) return;

    const newProduct = { Name, Price, Quantity, Category, Color, SellerName, Discount, Rate, Description, ImageUrl: [], IsBestSeller: false, IsFeatured: false, CreatedAt: new Date().toISOString() };

    try {
        await addProduct(newProduct);
        loadProducts();
        addModal.hide();
    } catch (err) {
        console.error(err);
        alert("Failed to add product. Try again.");
    }
});

loadProducts();