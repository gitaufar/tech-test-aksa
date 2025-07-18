import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const dummyAccounts = [
    { id: 1, username: "budi", password: "budi123", name: "Budi Santoso" },
    { id: 2, username: "agus", password: "agus123", name: "Agus Santoso" },
    { id: 3, username: "rina", password: "rina123", name: "Rina Santoso" },
];

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const found = dummyAccounts.find(
            (user) => user.username === username && user.password === password
        );
        if (found) {
            login(found);
            navigate("/");
        } else {
            setError("Username atau password salah");
        }
    };

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                    Login
                </h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Masukkan username"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Masukkan password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}
