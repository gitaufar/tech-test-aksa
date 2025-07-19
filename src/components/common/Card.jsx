import React from 'react'

export default function Card({
    lostItems,
    user,
    setFormData,
    setIndex,
    setIsEdit,
    setIsDelete
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full dark:text-white md:hidden">
            {lostItems.length === 0 ? (
                <p className="text-center w-full">No lost items found.</p>
            ) : (
                lostItems.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                        <p><span className="font-semibold">Description:</span> {item.description}</p>
                        <p><span className="font-semibold">Location:</span> {item.location}</p>
                        <p><span className="font-semibold">Date:</span> {item.date}</p>
                        <p><span className="font-semibold">Contact:</span> {item.contact}</p>

                        <div className="mt-4 flex gap-2">
                            {user.id === item.userId ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setFormData(item);
                                            setIndex(item.id);
                                            setIsEdit(true);
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIndex(item.id);
                                            setIsDelete(true);
                                        }}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <a
                                    href={`https://wa.me/${item.contact}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm text-center"
                                >
                                    Report
                                </a>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
