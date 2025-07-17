const STORAGE_KEY = "barang_hilang";

export function getLostItems() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function addLostItem(item) {
    const items = getLostItems();
    items.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function updateLostItem(index, updatedItem) {
    const items = getLostItems();
    items[index] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function searchLostItem(query) {
    const items = getLostItems();
    return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
}
