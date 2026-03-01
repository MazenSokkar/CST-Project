import {
    getFromLocalStorage,
    saveToLocalStorage
} from "../../../shared/js/local-storage-management.js";

import {
    loadSidebar
} from "../../../shared/admin-sidebar/sidebar.js";

import {
    getAllUsers,
    deleteUser as deleteUserFromAPI,
    updateUser,
    AddUser
} from "../../../services/users.service.js";

await loadSidebar("Customers");

const tableBody = document.getElementById("userTable");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");
const paginationInfo = document.getElementById("paginationInfo");

const editModalEl = document.getElementById("editModal");
const addUserModalEl = document.getElementById("addUserModal");
const confirmModalEl = document.getElementById("confirmModal");

const editModal = new bootstrap.Modal(editModalEl);
const addUserModal = new bootstrap.Modal(addUserModalEl);
const confirmModal = new bootstrap.Modal(confirmModalEl);

const addUserBtn = document.getElementById("addUserBtn");
const saveAddUserBtn = document.getElementById("saveAddUser");
const saveEditBtn = document.getElementById("saveEdit");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

let users = [];
let filteredUsers = [];
let currentPage = 1;
const rowsPerPage = 5;

let selectedUserId = null;
let userToDelete = null;

/* ------------------ Debounce ------------------ */
function debounce(fn, delay = 300) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

/* ------------------ Load Users ------------------ */
async function loadUsers() {
    try {
        const apiUsers = await getAllUsers();

        if (apiUsers?.length) {
            users = apiUsers.map(u => ({
                id: String(u.Id),
                name: u.Name ?? "",
                email: u.Username ?? "",
                phone: u.Address ?? "",
                role: u.Role ?? "Customer",
                date: u.CreatedAt
                    ? new Date(u.CreatedAt).toLocaleDateString()
                    : "-"
            }));

            saveToLocalStorage("users", users);
        } else {
            users = getFromLocalStorage("users") ?? [];
        }
    } catch {
        users = getFromLocalStorage("users") ?? [];
    }

    filteredUsers = [...users];
    currentPage = 1;
    renderTable();
}

/* ------------------ Create Row (Safe) ------------------ */
function createRow(user) {
    const tr = document.createElement("tr");
    tr.dataset.id = user.id;

    const cells = [
        `#${user.id}`,
        user.name,
        user.email,
        user.phone,
        user.role,
        user.date
    ];

    cells.forEach(text => {
        const td = document.createElement("td");
        td.textContent = text;
        tr.appendChild(td);
    });

    const actionTd = document.createElement("td");
    actionTd.innerHTML = `
        <button class="btn btn-sm btn-outline-primary edit-btn">
            <i class="fa fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger delete-btn">
            <i class="fa fa-trash"></i>
        </button>
    `;
    tr.appendChild(actionTd);

    return tr;
}

/* ------------------ Render Table ------------------ */
function renderTable() {
    tableBody.innerHTML = "";

    const pageCount = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
    if (currentPage > pageCount) currentPage = pageCount;

    const start = (currentPage - 1) * rowsPerPage;
    const paginated = filteredUsers.slice(start, start + rowsPerPage);

    const fragment = document.createDocumentFragment();
    paginated.forEach(user => fragment.appendChild(createRow(user)));

    tableBody.appendChild(fragment);

    updatePaginationInfo();
    renderPagination(pageCount);
}

/* ------------------ Pagination Info ------------------ */
function updatePaginationInfo() {
    const total = filteredUsers.length;
    if (!total) {
        paginationInfo.textContent = "No users found";
        return;
    }

    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, total);

    paginationInfo.textContent = `Showing ${start} - ${end} of ${total}`;
}

/* ------------------ Pagination ------------------ */
function renderPagination(pageCount) {
    pagination.innerHTML = "";

    const createPageItem = (label, page, disabled = false, active = false) => {
        const li = document.createElement("li");
        li.className = `page-item ${disabled ? "disabled" : ""}`;

        const a = document.createElement("a");
        a.href = "#";
        a.className = `page-link ${active ? "active" : ""}`;
        a.textContent = label;

        if (!disabled) {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = page;
                renderTable();
            });
        }

        li.appendChild(a);
        pagination.appendChild(li);
    };

    createPageItem("«", currentPage - 1, currentPage === 1);

    for (let i = 1; i <= pageCount; i++) {
        createPageItem(i, i, false, i === currentPage);
    }

    createPageItem("»", currentPage + 1, currentPage === pageCount);
}

/* ------------------ Search ------------------ */
const handleSearch = debounce(() => {
    const value = searchInput.value.trim().toLowerCase();

    filteredUsers = !value
        ? [...users]
        : users.filter(user =>
            user.name.toLowerCase().includes(value) ||
            user.role.toLowerCase().includes(value)
        );

    currentPage = 1;
    renderTable();
}, 300);

searchInput.addEventListener("input", handleSearch);

/* ------------------ Add User ------------------ */
addUserBtn.addEventListener("click", () => {
    addUserModal.show();
});

saveAddUserBtn.addEventListener("click", async () => {
    saveAddUserBtn.disabled = true;

    const name = document.getElementById("addName").value.trim();
    const email = document.getElementById("addEmail").value.trim();
    const address = document.getElementById("addAddress").value.trim();
    const password = document.getElementById("addPassword").value.trim();
    const role = document.getElementById("addRole").value;

    if (!name || !email || !password) {
        alert("Please fill required fields");
        saveAddUserBtn.disabled = false;
        return;
    }

    const result = await AddUser({
        Name: name,
        Username: email,
        Password: password,
        Address: address,
        Role: role
    });

    saveAddUserBtn.disabled = false;

    if (result) {
        addUserModal.hide();
        clearAddModal();
        await loadUsers();
    } else {
        alert("Failed to add user");
    }
});

function clearAddModal() {
    addUserModalEl.querySelectorAll("input").forEach(i => i.value = "");
}

/* ------------------ Edit/Delete (Event Delegation) ------------------ */
tableBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    const user = users.find(u => u.id === id);
    if (!user) return;

    if (e.target.closest(".edit-btn")) {
        selectedUserId = id;

        document.getElementById("editName").value = user.name;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editAddress").value = user.phone;
        document.getElementById("editRole").value = user.role;

        editModal.show();
    }

    if (e.target.closest(".delete-btn")) {
        userToDelete = id;
        confirmModal.show();
    }
});

/* ------------------ Save Edit ------------------ */
saveEditBtn.addEventListener("click", async () => {
    saveEditBtn.disabled = true;

    const updatedUser = {
        Id: selectedUserId,
        Name: document.getElementById("editName").value,
        Username: document.getElementById("editEmail").value,
        Address: document.getElementById("editAddress").value,
        Role: document.getElementById("editRole").value
    };

    const { Id, ...data } = updatedUser;
    const success = await updateUser(Id, data);

    saveEditBtn.disabled = false;

    if (success) {
        editModal.hide();
        await loadUsers();
    } else {
        alert("Update failed");
    }
});

/* ------------------ Delete ------------------ */
confirmDeleteBtn.addEventListener("click", async () => {
    if (!userToDelete) return;

    confirmDeleteBtn.disabled = true;

    const success = await deleteUserFromAPI(userToDelete);

    confirmDeleteBtn.disabled = false;

    if (success) {
        confirmModal.hide();
        await loadUsers();
    } else {
        alert("Delete failed");
    }

    userToDelete = null;
});

/* ------------------ Init ------------------ */
loadUsers();