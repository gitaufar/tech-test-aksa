export default function Form({ isOpen, formData, setFormData, handleSubmit }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white flex flex-col space-y-4 w-full max-w-md p-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                <input
                    type="text"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
        </div>

    )
}
