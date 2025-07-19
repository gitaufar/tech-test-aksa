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

/*************  ✨ Windsurf Command 🌟  *************/
export function addLostItem(item) {
    const items = getLostItems();
    items.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
/*******  c6fc2d25-7bb7-404f-94d7-7e3dc30717b5  *******/

export function deleteLostItem(id) {
    const items = getLostItems();
    const updatedItems = items.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
}

export function updateLostItem(id, updatedItem) {
    const items = getLostItems();
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
        items[index] = updatedItem;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
}


export function searchLostItem(query) {
    const items = getLostItems();
    return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
}
