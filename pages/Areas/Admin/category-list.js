import { getAllProducts, UpdateProduct } from "../../../services/product.service.js";
import { saveToLocalStorage, getFromLocalStorage } from "../../../shared/js/local-storage-management.js";

const tableBody = document.getElementById("categoryTable");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");
const paginationInfo = document.getElementById("paginationInfo");

const addModal = new bootstrap.Modal(document.getElementById("addModal"));
const editModal = new bootstrap.Modal(document.getElementById("editModal"));

let categories = [];
let filteredCategories = [];
let currentPage = 1;
const rowsPerPage = 5;
let selectedCategory = null;


// Load categories from products
async function loadCategories() {
    const products = await getAllProducts();

    const map = {};

    products.forEach(p => {
        if (!map[p.Category]) {
            map[p.Category] = {
                id: Object.keys(map).length + 1,
                name: p.Category,
                count: 0,
                createdAt: p.CreatedAt || new Date().toISOString()
            };
        }
        map[p.Category].count++;
    });

    categories = Object.values(map);
    filteredCategories = [...categories];
    saveToLocalStorage("categories", categories);

    renderTable();
}

// Render table based on current page and filtered categories
function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const paginated = filteredCategories.slice(start, start + rowsPerPage);

    paginated.forEach(cat => {
        tableBody.innerHTML += `
        <tr>
            <td>#${cat.id}</td>
            <td>${cat.name}</td>
            <td>${cat.count}</td>
            <td>${new Date(cat.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-name="${cat.name}">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-name="${cat.name}">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });

    renderPagination();
}

// Render pagination controls
function renderPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(filteredCategories.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        pagination.innerHTML += `
        <li class="page-item">
            <a class="page-link ${i === currentPage ? "active" : ""}" href="#">${i}</a>
        </li>`;
    }

    pagination.querySelectorAll(".page-link").forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = index + 1;
            renderTable();
        });
    });

    paginationInfo.innerText =
        `Showing ${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(currentPage * rowsPerPage, filteredCategories.length)} of ${filteredCategories.length}`;
}

// Search functionality
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(value)
    );
    currentPage = 1;
    renderTable();
});

//Add category
document.getElementById("addCategoryBtn").addEventListener("click", () => {
    document.getElementById("addCategoryName").value = "";
    addModal.show();
});

document.getElementById("saveAddCategory").addEventListener("click", () => {
    const name = document.getElementById("addCategoryName").value.trim();
    if (!name) return alert("Category name required");

    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase()))
        return alert("Category already exists");

    categories.push({
        id: categories.length + 1,
        name,
        count: 0,
        createdAt: new Date().toISOString()
    });

    filteredCategories = [...categories];
    saveToLocalStorage("categories", categories);
    addModal.hide();
    renderTable();
});

// Edit & Delete category
tableBody.addEventListener("click", async (e) => {
    const name = e.target.closest("button")?.dataset.name;
    if (!name) return;

    if (e.target.closest(".edit-btn")) {
        selectedCategory = name;
        document.getElementById("editCategoryName").value = name;
        editModal.show();
    }

    if (e.target.closest(".delete-btn")) {
        if (!confirm("Delete this category?")) return;

        categories = categories.filter(c => c.name !== name);
        filteredCategories = [...categories];
        saveToLocalStorage("categories", categories);
        renderTable();
    }
});

document.getElementById("saveEditCategory").addEventListener("click", async () => {
    const newName = document.getElementById("editCategoryName").value.trim();
    if (!newName) return;

    categories = categories.map(c =>
        c.name === selectedCategory ? { ...c, name: newName } : c
    );

    filteredCategories = [...categories];
    saveToLocalStorage("categories", categories);
    editModal.hide();
    renderTable();
});

// Initial load
loadCategories();