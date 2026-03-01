import * as LSManager from "../../../shared/js/local-storage-management.js";
import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";

await loadSidebar("Customer Service");

// get elements 
let logoutBtns = document.querySelectorAll("#logoutBtn");

// add event listeners
logoutBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        LSManager.removeFromLocalStorage("currentUser");
        LSManager.saveToLocalStorage("isLoggedIn", false);
        window.location.href = "/pages/auth/login/login.html";
    });
});

// Initialize topbar panels
initTopbarPanels();
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

// get customer messages from localStorage and display them
function displayCustomerMessages() {
    let messages = LSManager.getFromLocalStorage("contacts") || [];
    let container = document.getElementById("customerMessagesContainer");
    if (!container) return;
    container.innerHTML = "";
    if (messages.length === 0) {
        container.innerHTML = "<p class='text-muted'>No customer messages found.</p>";
        return;
    }
    messages.forEach(msg => {
        let card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">
                    ${msg.firstName} ${msg.lastName}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">${msg.email}</h6>
                <p class="card-text">${msg.message}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
displayCustomerMessages();