// جلب المستخدم الحالي من LocalStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    // تحويل المستخدم للصفحة الرئيسية أو تسجيل الدخول إذا لم يكن مسجلاً
    window.location.replace("../auth/login/login.html");
}

// تعيين البيانات في الصفحة
document.getElementById("profileName").textContent = currentUser.Name;
document.getElementById("profileEmail").textContent = currentUser.Username;
document.getElementById("profileRole").textContent = currentUser.Role;
document.getElementById("profileAddress").textContent = currentUser.Address;

// عرض تاريخ الانضمام
const joinedDate = new Date(currentUser.CreatedAt);
document.getElementById("profileJoined").textContent = joinedDate.toLocaleDateString();

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");

    // منع الرجوع للصفحة بعد Logout
    window.location.replace("../auth/login/login.html");
});