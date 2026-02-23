import { getAllUsers } from "../../../services/users.service.js";
import { saveToLocalStorage, getFromLocalStorage ,isAuthenticated} from "../../../shared/js/local-storage-management.js";

// If already logged in, redirect to home page
if (isAuthenticated()) {
    window.location.replace("../../../index.html");
}

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginError = document.getElementById("loginError");
const passwordError = document.getElementById("passwordError");
const emailError = document.getElementById("emailError");

// Show / Hide Password
togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    togglePassword.innerHTML =
        type === "password"
            ? '<i class="bi bi-eye"></i>'
            : '<i class="bi bi-eye-slash"></i>';
});

// Login
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;
    loginError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";

    // Email validation 
    if (!email) {
        emailError.style.display = "block";
        emailInput.classList.add("is-invalid");
        isValid = false;
    } else {
        emailInput.classList.remove("is-invalid");
    }

    // Password validation
    if (!password || password.length < 6) {
        passwordError.style.display = "block";
        passwordInput.classList.add("is-invalid");
        isValid = false;
    } else {
        passwordInput.classList.remove("is-invalid");
    }

    if (!isValid) return;

    try {
        const usersObject = await getAllUsers();

        // transform object to array
        const usersArray = Object.values(usersObject);

        const user = usersArray.find(
            u => u.Username === email && u.Password === password
        );

        if (user) {
            saveToLocalStorage("isLoggedIn", true);
            saveToLocalStorage("currentUser", user);

            window.location.href = "../../../index.html";
        } else {
            loginError.textContent = "Invalid Username or Password ❌";
            loginError.style.display = "block";
        }
    } catch (error) {
        console.error(error);
        loginError.textContent = "Something went wrong ❌";
        loginError.style.display = "block";
    }
});