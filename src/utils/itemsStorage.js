const STORAGE_KEY = "barang_hilang";

export function getLostItems() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function getPaginatedItems(getItems, page = 1, limit = 5) {
    const item = getItems();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return item.slice(startIndex, endIndex);
}

export function addLostItem(item) {
    const items = getLostItems();
    items.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function deleteLostItem(index) {
    const items = getLostItems();
    items.splice(index, 1);
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
