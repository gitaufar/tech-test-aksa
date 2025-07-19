import React from 'react'

export default function Table({
    lostItems,
    page,
    allItemsLength,
    user,
    setPage,
    setFormData,
    setIndex,
    setIsEdit,
    setIsDelete
}) {
    return (
        <div className="w-full hidden md:block">
            <table className="min-w-full table-auto border bg-white dark:bg-black dark:text-white">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-800">
                        <th className="border px-2 py-2">No.</th>
                        <th className="border px-2 py-2">Item Name</th>
                        <th className="border px-2 py-2">Description</th>
                        <th className="border px-2 py-2">Location</th>
                        <th className="border px-2 py-2">Date</th>
                        <th className="border px-2 py-2">Contact</th>
                        <th className="border px-2 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lostItems.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center p-4">No lost items found.</td>
                        </tr>
                    ) : (
                        lostItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border px-2 py-2">{((idx + 1) + (page - 1) * 5)}</td>
                                <td className="border px-2 py-2">{item.name}</td>
                                <td className="border px-2 py-2">{item.description}</td>
                                <td className="border px-2 py-2">{item.location}</td>
                                <td className="border px-2 py-2">{item.date}</td>
                                <td className="border px-2 py-2">{item.contact}</td>
                                <td className="border py-2">
                                    {user.id === item.userId ? (
                                        <div className='flex gap-2 justify-center'>
                                            <button
                                                className="bg-blue-500 text-white rounded p-2 cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFormData(item);
                                                    setIndex(item.id);
                                                    setIsEdit(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded cursor-pointer"
                                                onClick={() => {
                                                    setIndex(item.id);
                                                    setIsDelete(true);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex justify-center'>
                                            <a
                                                href={`https://wa.me/${item.contact}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-yellow-500 text-white p-2 rounded cursor-pointer inline-block text-center"
                                            >
                                                Report
                                            </a>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className='flex gap-4 mt-4 justify-center'>
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className='disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
                >
                    Previous
                </button>
                <input
                    type='number'
                    value={page}
                    onChange={(e) => {
                        let value = parseInt(e.target.value)
                        if (value > Math.ceil(allItemsLength / 5)) {
                            setPage(Math.ceil(allItemsLength / 5))
                        } else {
                            setPage(value)
                        }
                    }}
                    className='bg-white dark:bg-gray-800 p-4 rounded text-center w-20 dark:text-white'
                    max={Math.ceil(allItemsLength / 5)}
                    min={1}
                />
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= Math.ceil(allItemsLength / 5)}
                    className='disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
                >
                    Next
                </button>
            </div>
        </div>
    )
}
