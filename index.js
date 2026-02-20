// index.js - works for any page
// Load Navbar
fetch('/Shared/Navbar/navbar.html')   // absolute path from root
  .then(res => res.text())
  .then(html => document.getElementById('navbar-container').innerHTML = html)
  .catch(err => console.error("Error loading Navbar:", err));

// Load Footer
fetch('/Shared/Footer/footer.html')   // absolute path from root
  .then(res => res.text())
  .then(html => document.getElementById('footer-container').innerHTML = html)
  .catch(err => console.error("Error loading Footer:", err));