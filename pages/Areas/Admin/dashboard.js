import * as LSManager from "../../../shared/js/local-storage-management.js";
import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";
import * as OrderService from "../../../services/orders.service.js  ";
import * as ProductService from "../../../services/product.service.js  ";
import * as UserService from "../../../services/users.service.js  ";

// fetch data
let allOrders   = await OrderService.getAllOrders();
let allProducts = await ProductService.getAllProducts();
let allUsers    = await UserService.getAllUsers();

// get elements
let statRevenue = document.getElementById("statRevenue");
let statOrders = document.getElementById("statOrders");
let statProducts = document.getElementById("statProducts");
let statUsers = document.getElementById("statUsers");
let bestSellingProductsTbody = document.getElementById("bestSellingProductsTbody");
let filterByBtn   = document.getElementById("filterByBtn");
let sortByBtn     = document.getElementById("sortByBtn");
let filterInStock    = document.getElementById("filterInStock");
let filterOutOfStock = document.getElementById("filterOutOfStock");
let sortLowToHigh  = document.getElementById("sortLowToHigh");
let sortHighToLow  = document.getElementById("sortHighToLow");
let logoutBtn = document.getElementById("logoutBtn");
let usersStat = document.getElementById("users-stat");

// filter/sort state
let allBestSellingProducts = [];
let currentFilter = "all";
let currentSort   = "relevance";

await loadSidebar("dashboard");

logoutBtn.addEventListener("click", () => {
    LSManager.removeFromLocalStorage("currentUser");
    LSManager.saveToLocalStorage("isLoggedIn", false);
    window.location.href = "/pages/auth/login/login.html";
});

initTopbarPanels();

let currentUser = LSManager.getCurrentUser();

renderDashboard();

initFilterSortListeners();

// check if user is authorized
function checkAuthorization() {
    if (currentUser.Role == "Admin" || currentUser.Role == "Seller") {
        return true;
    } else {
        window.location.href = "/pages/auth/login/login.html";
        return false;
    }
}

// return Role after checking authorization
function getRole() {
    if (checkAuthorization()) {
        return currentUser.Role;
    }
}

// render dashboard based on role
function renderDashboard() {
    if (getRole() == "Admin") {
        renderAdminDashboard();
    } else if (getRole() == "Seller") {
        renderSellerDashboard();
    }
}

// render admin dashboard
async function renderAdminDashboard() {
    updateStatsForAdmin();
    renderReturnsChart();
    renderSalesChartForAdmin();
    await renderBestSellingProductsForAdmin();
}

// render seller dashboard
async function renderSellerDashboard() {
    updateStatsForSeller();
    renderReturnsChart();
    renderSalesChartForSeller();
    await renderBestSellingProductsForSeller();
}

// dashboard tab helpers
// get total revenue
function getTotalRevenue() {
    let totalRevenue = 0;
    allOrders.forEach(order => {
        totalRevenue += order.TotalPrice;
    });
    return totalRevenue;
}
// get total revenue by seller name
function getTotalRevenueBySellerName(sellerName){
    let totalRevenue = 0;
    allOrders.forEach(order => {
        if (order.Items[0].SellerName == sellerName) {
            totalRevenue += order.TotalPrice;
        }
    });
    return totalRevenue;
}
// get total orders
function getTotalOrdersCount() {
    return allOrders.length;
}
// get total orders by seller name
function getTotalOrdersCountBySellerName(sellerName){
    let totalOrders = 0;
    allOrders.forEach(order => {
        if (order.Items[0].SellerName == sellerName) {
            totalOrders++;
        }
    });
    return totalOrders;
}
// get total products
function getTotalProductsCount() {
    return allProducts.length;
}
// get total products by seller name
function getTotalProductsCountBySellerName(sellerName){
    let totalProducts = 0;
    allProducts.forEach(product => {
        if (product.SellerName == sellerName) {
            totalProducts++;
        }
    });
    return totalProducts;
}
// get total users
function getTotalUsersCount() {
    return allUsers.length;
}
// get order count per month
function getOrderCountPerMonth() {
    let orderCountPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    allOrders.forEach(order => {
        let month = new Date(order.Timestamp).getMonth();
        orderCountPerMonth[month]++;
    });
    return orderCountPerMonth;
}
// get order count per month by seller name
function getOrderCountPerMonthBySellerName(sellerName){
    let orderCountPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    allOrders.forEach(order => {
        if (order.Items[0].SellerName == sellerName) {
            let month = new Date(order.Timestamp).getMonth();
            orderCountPerMonth[month]++;
        }
    });
    return orderCountPerMonth;
}
// get order returns per month
function getOrderReturnsPerMonth(){
    return [6, 1, 8, 3, 2, 4, 0, 9, 12, 7, 2, 5];
}
// get best selling products
async function getBestSellingProducts(limit = 3) {
    let productMap = new Map();
    allOrders.forEach(order => {
        order.Items.forEach(item => {
            if (productMap.has(item.ProductId)) {
                let existing = productMap.get(item.ProductId);
                existing.Quantity += item.Quantity;
                existing.Total    += item.Total;
            } else {
                productMap.set(item.ProductId, {
                    ProductId:   item.ProductId,
                    ProductName: item.ProductName,
                    Color:       item.Color,
                    Price:       item.Price,
                    Quantity:    item.Quantity,
                    Total:       item.Total
                });
            }
        });
    });
    let bestSellingProducts = Array.from(productMap.values());
    bestSellingProducts.sort((a, b) => b.Quantity - a.Quantity).slice(0, limit);
    let firstBestSeller =  await ProductService.GetProductById(bestSellingProducts[0].ProductId);
    let secondBestSeller = await ProductService.GetProductById(bestSellingProducts[1].ProductId);
    let thirdBestSeller = await ProductService.GetProductById(bestSellingProducts[2].ProductId);
    return [firstBestSeller, secondBestSeller, thirdBestSeller];
}
// best selling for seller
async function getBestSellingProductsBySellerName(sellerName, limit = 3) {
    let productMap = new Map();
    allOrders.forEach(order => {
        order.Items.forEach(item => {
            if (item.SellerName == sellerName) {
                if (productMap.has(item.ProductId)) {
                    let existing = productMap.get(item.ProductId);
                    existing.Quantity += item.Quantity;
                    existing.Total    += item.Total;
                } else {
                    productMap.set(item.ProductId, {
                        ProductId:   item.ProductId,
                        ProductName: item.ProductName,
                        Color:       item.Color,
                        Price:       item.Price,
                        Quantity:    item.Quantity,
                        Total:       item.Total
                    });
                }
            }
        });
    });
    let bestSellingProducts = Array.from(productMap.values());
    bestSellingProducts.sort((a, b) => b.Quantity - a.Quantity).slice(0, limit);
    let firstBestSeller =  await ProductService.GetProductById(bestSellingProducts[0].ProductId);
    let secondBestSeller = await ProductService.GetProductById(bestSellingProducts[1].ProductId);
    let thirdBestSeller = await ProductService.GetProductById(bestSellingProducts[2].ProductId);
    return [firstBestSeller, secondBestSeller, thirdBestSeller];
}

// topbar panel toggle (bell + profile)
function initTopbarPanels() {
    let pairs = [
        ["desktopBellBtn",    "desktopBellPanel"],
        ["desktopProfileBtn", "desktopProfilePanel"],
        ["mobileBellBtn",     "mobileBellPanel"],
        ["mobileProfileBtn",  "mobileProfilePanel"],
    ];

    let allPanels = pairs.map(([, pid]) => document.getElementById(pid)).filter(Boolean);

    pairs.forEach(([btnId, panelId]) => {
        let btn   = document.getElementById(btnId);
        let panel = document.getElementById(panelId);
        if (!btn || !panel) return;
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            let isOpen = panel.classList.contains("show");
            allPanels.forEach(p => p.classList.remove("show"));
            if (!isOpen) panel.classList.add("show");
        });
    });

    document.addEventListener("click", () => {
        allPanels.forEach(p => p.classList.remove("show"));
    });
}

// update stats for Admin
function updateStatsForAdmin() {
    statRevenue.innerText = "$" + getTotalRevenue();
    statOrders.innerText = getTotalOrdersCount();
    statProducts.innerText = getTotalProductsCount();
    statUsers.innerText = getTotalUsersCount();
}
// update stats for seller
function updateStatsForSeller() {
    statRevenue.innerText = "$" + getTotalRevenueBySellerName(currentUser.Name);
    statOrders.innerText = getTotalOrdersCountBySellerName(currentUser.Name);
    statProducts.innerText = getTotalProductsCountBySellerName(currentUser.Name);
    usersStat.style.display = "none";
}

// returns chart
function renderReturnsChart() {
    new Chart(
        document.getElementById('returnsChart'),
        {
        type: 'bar',
        options: {
            animation: true,
            plugins: {
            legend: {
                display: false
            }
            }
        },
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
            {
                label: 'Returns',
                data: getOrderReturnsPerMonth(),
                backgroundColor: 'rgba(38, 125, 146, 1)'
            }
            ]
        }
        }
    );
}

// sales chart for admin
function renderSalesChartForAdmin() {
    new Chart(
        document.getElementById('salesChart'),
        {
        type: 'line',
        options: {
            animation: true,
            plugins: {
            legend: {
                display: false
            }
            }
        },
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
            {
                label: 'Sales',
                data: getOrderCountPerMonth(),
                backgroundColor: 'rgba(38, 125, 146, 1)',
                borderColor: 'rgba(38, 125, 146, 1)'
            }
            ]
        }
        }
    );
}

// sales chart for seller
function renderSalesChartForSeller() {
    new Chart(
        document.getElementById('salesChart'),
        {
        type: 'line',
        options: {
            animation: true,
            plugins: {
            legend: {
                display: false
            }
            }
        },
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
            {
                label: 'Sales',
                data: getOrderCountPerMonthBySellerName(currentUser.Name),
                backgroundColor: 'rgba(38, 125, 146, 1)',
                borderColor: 'rgba(38, 125, 146, 1)'
            }
            ]
        }
        }
    );
}

// render best selling products
async function renderBestSellingProducts(bestSellingProducts) {
    bestSellingProducts.forEach(product => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${product.Id}</td>
            <td><img src="../../../assets/${product.ImageUrl[getRandomInt(0, product.ImageUrl.length - 1)]}" alt=""></td>
            <td>${product.Name}</td>
            <td>${(product.Price) - (product.Price * product.Discount / 100)}</td>
            <td>${product.Quantity}</td>
            <td><span class="${product.Quantity > 0 ? "in-stock" : "out-of-stock"}">${product.Quantity > 0 ? "In Stock" : "Out of Stock"}</span></td>
            <td>
                <a href="#" class="btn btn-sm"><i class="fa-solid fa-edit"></i></a>
                <a href="#" class="btn btn-sm"><i class="fa-solid fa-trash"></i></a>
            </td>
        `;
        bestSellingProductsTbody.appendChild(tr);
    });
}

// render best selling products for seller
async function renderBestSellingProductsForSeller(bestSellingProducts) {
    let bestSellingProductsForSeller = await getBestSellingProductsBySellerName(currentUser.Name);
    allBestSellingProducts = bestSellingProductsForSeller;
    renderBestSellingProducts(bestSellingProductsForSeller);
}

// render best selling products for admin
async function renderBestSellingProductsForAdmin() {
    let bestSellingProductsForAdmin = await getBestSellingProducts();
    allBestSellingProducts = bestSellingProductsForAdmin;
    renderBestSellingProducts(bestSellingProductsForAdmin);
}

// best selling filters and sort
function applyFiltersAndRender() {
    let result = [...allBestSellingProducts];
    if (currentFilter === "inStock") {
        result = result.filter(p => p.Quantity > 0);
    } else if (currentFilter === "outOfStock") {
        result = result.filter(p => p.Quantity <= 0);
    }
    if (currentSort === "lowToHigh") {
        result.sort((a, b) =>
            (a.Price - a.Price * a.Discount / 100) - (b.Price - b.Price * b.Discount / 100)
        );
    } else if (currentSort === "highToLow") {
        result.sort((a, b) =>
            (b.Price - b.Price * b.Discount / 100) - (a.Price - a.Price * a.Discount / 100)
        );
    }
    bestSellingProductsTbody.innerHTML = "";
    renderBestSellingProducts(result);
}

// best selling filters and sort listeners
function initFilterSortListeners() {
    filterInStock.addEventListener("click", (e) => {
        e.preventDefault();
        currentFilter = "inStock";
        filterByBtn.innerHTML = `In Stock <i class="fa-solid fa-filter ms-1"></i>`;
        applyFiltersAndRender();
    });

    filterOutOfStock.addEventListener("click", (e) => {
        e.preventDefault();
        currentFilter = "outOfStock";
        filterByBtn.innerHTML = `Out of Stock <i class="fa-solid fa-filter ms-1"></i>`;
        applyFiltersAndRender();
    });

    sortLowToHigh.addEventListener("click", (e) => {
        e.preventDefault();
        currentSort = "lowToHigh";
        sortByBtn.innerHTML = `Sort By: Low to High <i class="fa-solid fa-arrow-down-wide-short ms-1"></i>`;
        applyFiltersAndRender();
    });

    sortHighToLow.addEventListener("click", (e) => {
        e.preventDefault();
        currentSort = "highToLow";
        sortByBtn.innerHTML = `Sort By: High to Low <i class="fa-solid fa-arrow-down-wide-short ms-1"></i>`;
        applyFiltersAndRender();
    });
}

//get random number between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}