// forgot-password.js
import { getAllUsers } from "../../../services/users.service.js";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const loginError = document.getElementById("loginError");

const backToLoginBtn = document.querySelector(".btn-custom1");

// Validate email format
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Submit event
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.style.display = "none";

    const email = emailInput.value.trim();

    // Check if email is empty
    if (!email) {
        emailError.style.display = "block";
        emailError.textContent = "Email is required";
        return;
    }

    // Check if email format is valid
    if (!isValidEmail(email)) {
        emailError.style.display = "block";
        emailError.textContent = "Invalid email format";
        return;
    }

    // Hide error if valid
    emailError.style.display = "none";

    try {
        const users = await getAllUsers();
        const user = Object.values(users).find(
            u => u.Username.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
            loginError.style.display = "block";
            loginError.textContent = "Email not found!";
            return;
        }

        // Simulate sending reset link
        alert(`A reset link has been sent to ${user.Username}`);
        loginError.style.display = "block";
        loginError.style.color = "green";
        loginError.textContent = `A reset link has been sent to ${user.Username}`;

    } catch (err) {
        console.error(err);
        loginError.style.display = "block";
        loginError.style.color = "red";
        loginError.textContent = "Server error. Please try again later.";
    }
});

// Back to Login button
backToLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../login/login.html";
});