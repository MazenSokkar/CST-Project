// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.replace("../auth/login/login.html");
}

// Populate profile information
document.getElementById("profileName").textContent = currentUser.Name;
document.getElementById("profileEmail").textContent = currentUser.Username;
document.getElementById("profileRole").textContent = currentUser.Role;
document.getElementById("profileAddress").textContent = currentUser.Address;

// Format the joined date
const joinedDate = new Date(currentUser.CreatedAt);
document.getElementById("profileJoined").textContent =
    joinedDate.toLocaleDateString();

// Show dashboard button for Admin and Seller roles
const dashboardBtn = document.getElementById("dashboardBtn");
const logoutBtn = document.getElementById("logoutBtn");
const buttonWrapper = document.getElementById("buttonWrapper");

// If the user is Admin or Seller, show the dashboard button and adjust button widths accordingly. If the user is a Customer, make the logout button full width.
if (currentUser.Role === "Admin" || currentUser.Role === "Seller") {

    dashboardBtn.classList.remove("d-none");

    // if the user is Admin or Seller, make both buttons half width
    dashboardBtn.classList.add("w-50");
    logoutBtn.classList.add("w-50");

    dashboardBtn.addEventListener("click", () => {
        window.location.href = "/pages/Areas/Admin/dashboard.html";
    });

} else {
    // if the user is a Customer, make the logout button full width and hide the dashboard button
    dashboardBtn.classList.add("d-none");
    logoutBtn.classList.add("w-100");
}

// Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("../auth/login/login.html");
});

// Forget Password
const forgetPasswordBtn = document.getElementById("forgetPasswordBtn");

forgetPasswordBtn.addEventListener("click", () => {
    window.location.href = "../auth/forgot-password/forgot-password.html";
});