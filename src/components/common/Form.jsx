export default function Form({ isOpen, onClose, formData, setFormData, handleSubmit }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-40 dark:text-white" onClick={onClose}>
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded shadow-md dark:bg-gray-800 flex flex-col space-y-4 w-full max-w-md p-4"
            >
                <p className="font-semibold text-center text-gray-900 dark:text-white">Masukkan Data Barang Hilang Anda</p>

                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <input
                    type="text"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
}
