import { AddUser, getAllUsers } from "../../../services/users.service.js";
import { saveToLocalStorage, getFromLocalStorage ,isAuthenticated} from "../../../shared/js/local-storage-management.js";

// If already logged in, redirect to home page
if (isAuthenticated()) {
    window.location.replace("../../../index.html");
}

const signupForm = document.getElementById("signupForm");
const formMessage = document.getElementById("formMessage");

// Show Message
function showMessage(message, type = "danger") {
    formMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}

function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + "Error");

    input.classList.add("is-invalid");
    errorDiv.textContent = message;
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + "Error");

    input.classList.remove("is-invalid");
    errorDiv.textContent = "";
}

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value.trim();
    const role = document.getElementById("roleSelect").value;
    const privacyChecked = document.getElementById("privacyCheck").checked;

    formMessage.innerHTML = "";

    let isValid = true;

    if (!firstName) {
        setError("firstName", "First name is required");
        isValid = false;
    } else clearError("firstName");

    if (!lastName) {
        setError("lastName", "Last name is required");
        isValid = false;
    } else clearError("lastName");

    if (!email) {
        setError("email", "Email is required");
        isValid = false;
    } else clearError("email");

    if (!password) {
        setError("password", "Password is required");
        isValid = false;
    } else if (password.length < 6) {
        setError("password", "At least 6 characters");
        isValid = false;
    } else clearError("password");

    if (!address) {
        setError("address", "Address is required");
        isValid = false;
    } else clearError("address");

    if (!role) {
        setError("roleSelect", "Select a role");
        isValid = false;
    } else clearError("roleSelect");

    if (!privacyChecked) {
        setError("privacyCheck", "You must agree to the Privacy Policy!");
        isValid = false;
    } else clearError("privacyCheck");

    if (!isValid) return;

    try {
        const usersObject = await getAllUsers();
        const usersArray = Object.values(usersObject);

        const exists = usersArray.some(u => u.Username === email);

        if (exists) {
            showMessage("This email is already registered!");
            return;
        }

        const newUser = {
            Name: `${firstName} ${lastName}`,
            Username: email,
            Password: password,
            Role: role,
            Address: address,
            CreatedAt: new Date().toISOString()
        };

        const addedUser = await AddUser(newUser);

        if (!addedUser) {
            showMessage("Something went wrong. Please try again.");
            return;
        }

        // ✅ تسجيل دخول مباشر باستخدام service
        saveToLocalStorage("currentUser", {
            Id: addedUser.Id,
            Name: addedUser.Name,
            Username: addedUser.Username,
            Role: addedUser.Role,
            Address: addedUser.Address
        });

        saveToLocalStorage("isLoggedIn", true);

        showMessage(`Welcome ${firstName}! 🎉`, "success");

        setTimeout(() => {
            window.location.replace("../../../index.html");
        }, 1500);

    } catch (error) {
        console.error(error);
        showMessage("Server error. Please try again.");
    }
});