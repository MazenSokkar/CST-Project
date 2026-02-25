let htmlPath = new URL("./sidebar.html", import.meta.url).href;

export async function loadSidebar(activePage = "") {
    let placeholder = document.getElementById("sidebar-placeholder");
    let res = await fetch(htmlPath);
    placeholder.innerHTML = await res.text();
    if (activePage) {
        let links = placeholder.querySelectorAll(".sidebar-link");
        links.forEach(link => {
            let span = link.querySelector("span");
            if (span && span.textContent.trim().toLowerCase() === activePage.toLowerCase()) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    let collapseBtn = document.getElementById("sidebarCollapseBtn");
    if (collapseBtn) {
        collapseBtn.addEventListener("click", toggleSidebar);
    }
    let hamburger = document.getElementById("mobileHamburger");
    let backdrop  = document.getElementById("sidebarBackdrop");
    let sidebar   = document.getElementById("sidebar");

    if (hamburger && backdrop && sidebar) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.add("mobile-open");
            backdrop.classList.add("active");
        });

        backdrop.addEventListener("click", () => {
            sidebar.classList.remove("mobile-open");
            backdrop.classList.remove("active");
        });
    }
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}
