const STORAGE_KEY = "auth";

export function changeName(name) {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEY));
    profile.name = name;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}