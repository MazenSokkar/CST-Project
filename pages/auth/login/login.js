import { getAllUsers } from "../../../services/users.service.js";

// If already logged in, redirect to home page
if (localStorage.getItem("isLoggedIn") === "true") {
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

    // Username validation 
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

        //transform object to array to use array methods like find
        const usersArray = Object.values(usersObject);

        const user = usersArray.find(u => u.Username === email && u.Password === password);

        if (user) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "../../../index.html";

        } else {
            loginError.textContent = "Invalid Username or Password ❌";
            loginError.style.display = "block";
        }
    } catch (error) {
        console.error(error);
        loginError.textContent = "Invalid Username or Password ❌";
        loginError.style.display = "block";
    }
});


/*

// Example of how to get current user data from localStorage
const user = JSON.parse(localStorage.getItem("currentUser"));

if (user) {
    console.log("Welcome", user.Name);
}


// Example of how to logout
function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../login/login.html";
}
*/