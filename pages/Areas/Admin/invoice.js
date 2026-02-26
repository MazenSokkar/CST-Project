import { loadSidebar } from "../../../shared/admin-sidebar/sidebar.js";
import * as LSManager from "../../../shared/js/local-storage-management.js";

await loadSidebar("dashboard");

// topbar panel toggle (bell + profile)
const pairs = [
    ["desktopBellBtn",    "desktopBellPanel"],
    ["desktopProfileBtn", "desktopProfilePanel"],
    ["mobileBellBtn",     "mobileBellPanel"],
    ["mobileProfileBtn",  "mobileProfilePanel"],
];

const allPanels = pairs.map(([, pid]) => document.getElementById(pid)).filter(Boolean);

pairs.forEach(([btnId, panelId]) => {
    const btn   = document.getElementById(btnId);
    const panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains("show");
        allPanels.forEach(p => p.classList.remove("show"));
        if (!isOpen) panel.classList.add("show");
    });
});

document.addEventListener("click", () => {
    allPanels.forEach(p => p.classList.remove("show"));
});

// logout
let btn = document.getElementById("logoutBtn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    LSManager.removeFromLocalStorage("currentUser");
    LSManager.saveToLocalStorage("isLoggedIn", false);
    window.location.href = "/pages/auth/login/login.html";
});
