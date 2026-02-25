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

await loadSidebar("dashboard");

initTopbarPanels();

updateStats();

let currentUser = LSManager.getCurrentUser();

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
function renderAdminDashboard() {
    
}

// render seller dashboard
function renderSellerDashboard() {
    
}

function renderDashboardTab() {
    
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
// get total orders
function getTotalOrdersCount() {
    return allOrders.length;
}
// get total products
function getTotalProductsCount() {
    return allProducts.length;
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

// update stats
function updateStats() {
    statRevenue.innerText = "$" + getTotalRevenue();
    statOrders.innerText = getTotalOrdersCount();
    statProducts.innerText = getTotalProductsCount();
    statUsers.innerText = getTotalUsersCount();
}
