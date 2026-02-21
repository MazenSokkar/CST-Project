export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
    let value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function getAllKeysFromLocalStorage() {
    return Object.keys(localStorage);
}

export function isAuthenticated() {
    if (getFromLocalStorage('isLoggedIn') && getFromLocalStorage('currentUser')) {
        return true;
    }
    return false;
}

export function getCurrentUser() {
    return getFromLocalStorage('currentUser');
}