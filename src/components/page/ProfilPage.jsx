import { useEffect, useState } from "react";

export default function ProfilPage() {
    const [user, setUser] = useState({});
    const [newName, setNewName] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            setUser(JSON.parse(auth));
            setNewName(JSON.parse(auth).name);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name: newName };
        setUser(updatedUser);
        localStorage.setItem("auth", JSON.stringify(updatedUser));
    };

    return (
        <main className='flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900'>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md w-full max-w-md flex flex-col items-center">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-gray-900 dark:text-white text-base font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    )
}
