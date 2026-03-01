export function showToast(message, options = {}) {
    let {
        title = 'Furnishop',
        icon = '/assets/images/bell-regular-full.svg',
        duration = 2000
    } = options;
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'position-fixed top-50 start-50 translate-middle w-100 d-flex justify-content-center align-items-center';
        toastContainer.style.zIndex = 9999;
        document.body.appendChild(toastContainer);
    }
    let toast = document.createElement('div');
    toast.className = 'toast show';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="toast-header">
            <img src="${icon}" class="rounded me-2" alt="${title}" style="width:24px;height:24px;">
            <strong class="me-auto">${title}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 500);
    }, duration);
    toast.querySelector('.btn-close').addEventListener('click', () => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 500);
    });
}