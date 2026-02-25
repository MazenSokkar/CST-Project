import {
    getFromLocalStorage,
    saveToLocalStorage
} from "../../../shared/js/local-storage-management.js";

import {
    getAllUsers,
    deleteUser as deleteUserFromAPI,
    updateUser,
    AddUser
} from "../../../services/users.service.js";

const tableBody = document.getElementById("userTable");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");
const paginationInfo = document.getElementById("paginationInfo");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const addUserModal = new bootstrap.Modal(document.getElementById("addUserModal"));

let users = [];
let filteredUsers = [];
let currentPage = 1;
const rowsPerPage = 5;
let selectedUserId = null;

//load users from API or localStorage
async function loadUsers() {
    try {
        const apiUsers = await getAllUsers();
        if (apiUsers.length > 0) {
            users = apiUsers.map(u => ({
                id: u.Id.toString(),
                name: u.Name,
                email: u.Username,
                phone: u.Address || "",
                role: u.Role || "Customer",
                date: new Date(u.CreatedAt).toLocaleDateString()
            }));
            saveToLocalStorage("users", users);
        } else {
            users = getFromLocalStorage("users") || [];
        }
    } catch (error) {
        users = getFromLocalStorage("users") || [];
    }

    filteredUsers = [...users];
    renderTable();
}

// Render table based on current page and filtered users
function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const paginated = filteredUsers.slice(start, start + rowsPerPage);

    paginated.forEach(user => {
        tableBody.innerHTML += `
            <tr data-id="${user.id}">
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.role}</td>
                <td>${user.date}</td>
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

// Render pagination controls
function renderPagination() {
    pagination.innerHTML = "";

    const pageCount = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, filteredUsers.length);

    paginationInfo.innerText = `Showing ${start} - ${end} of ${filteredUsers.length}`;

    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement("li");
        li.className = "page-item";
        const a = document.createElement("a");
        a.href = "#";
        a.className = `page-link ${i === currentPage ? "active" : ""}`;
        a.dataset.page = i;
        a.innerText = i;
        a.addEventListener("click", (e) => {
            e.preventDefault(); // منع refresh
            currentPage = Number(a.dataset.page);
            renderTable();
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }
}

//FORCE CLEAR SEARCH INPUT ON LOAD

window.addEventListener("DOMContentLoaded", () => {
    // delete any existing value in the search input
    searchInput.value = "";

    // disable autocomplete and autocorrect to prevent browser from filling the input
    searchInput.setAttribute("autocomplete", "off");
    searchInput.setAttribute("autocorrect", "off");
    searchInput.setAttribute("autocapitalize", "off");
    searchInput.setAttribute("spellcheck", "false");

    // in case some browsers still autofill, clear the input after a short delay
    setTimeout(() => searchInput.value = "", 50);
});

// Search functionality
// remove search on page load to prevent autofill issues
window.addEventListener("DOMContentLoaded", () => {
    searchInput.value = "";
});

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value)
    );
    currentPage = 1;
    renderTable();
});

//event delegation for edit and delete buttons because they are dynamically generated
tableBody.addEventListener("click", async (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    const user = users.find(u => u.id === id);
    if (!user) return;

    // EDIT
    if (e.target.closest(".edit-btn")) {
        selectedUserId = id;
        document.getElementById("editName").value = user.name;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editAddress").value = user.phone;
        document.getElementById("editRole").value = user.role;
        editModal.show();
    }

    // DELETE
    if (e.target.closest(".delete-btn")) {
        if (!confirm("Delete this user?")) return;

        const success = await deleteUserFromAPI(id);
        if (success) {
            users = users.filter(u => u.id !== id);
            filteredUsers = filteredUsers.filter(u => u.id !== id);
            saveToLocalStorage("users", users);

            if ((currentPage - 1) * rowsPerPage >= filteredUsers.length) {
                currentPage = Math.max(1, currentPage - 1);
            }

            renderTable();
        } else {
            alert("Delete failed");
        }
    }
});

// Save edited user details to API and update local state and localStorage on success
document.getElementById("saveEdit").addEventListener("click", async () => {
    const Name = document.getElementById("editName").value.trim();
    const Username = document.getElementById("editEmail").value.trim();
    const Address = document.getElementById("editAddress").value.trim();
    const Role = document.getElementById("editRole").value.trim();

    if (!Name || !Username) {
        alert("Name and Email are required!");
        return;
    }

    const updated = await updateUser(selectedUserId, { Name, Username, Address, Role });
    if (updated) {
        users = users.map(u => u.id === selectedUserId ? {
            ...u,
            name: Name,
            email: Username,
            phone: Address,
            role: Role
        } : u);
        filteredUsers = [...users];
        saveToLocalStorage("users", users);

        editModal.hide();
        renderTable();
    } else {
        alert("Update failed");
    }
});

// Show add user modal with empty fields
document.getElementById("addUserBtn").addEventListener("click", () => {
    document.getElementById("addName").value = "";
    document.getElementById("addEmail").value = "";
    document.getElementById("addAddress").value = "";
    document.getElementById("addPassword").value = "";
    document.getElementById("addRole").value = "Customer";

    addUserModal.show();
});

// Save new user to API and update local state and localStorage on success
document.getElementById("saveAddUser").addEventListener("click", async () => {
    const Name = document.getElementById("addName").value.trim();
    const Username = document.getElementById("addEmail").value.trim();
    const Address = document.getElementById("addAddress").value.trim();
    const Password = document.getElementById("addPassword").value.trim();
    const Role = document.getElementById("addRole").value.trim();
    const CreatedAt = new Date().toISOString();

    if (!Name || !Username || !Password) {
        alert("Name, Email, and Password are required!");
        return;
    }

    const newUser = await AddUser({ Name, Username, Address, Password, Role, CreatedAt });
    if (newUser) {
        users.push({
            id: newUser.Id.toString(),
            name: newUser.Name,
            email: newUser.Username,
            phone: newUser.Address || "",
            role: newUser.Role,
            date: new Date(newUser.CreatedAt).toLocaleDateString()
        });

        filteredUsers = [...users];
        saveToLocalStorage("users", users);
        addUserModal.hide();
        renderTable();
    } else {
        alert("Failed to add user. Username might already exist.");
    }
});

// Initial load
loadUsers();