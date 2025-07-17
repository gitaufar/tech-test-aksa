import { useState, useEffect } from "react";
import { LuSun } from "react-icons/lu";
import { IoIosMoon } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const applyTheme = (newTheme) => {
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else if (newTheme === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    const setDefaultOsTheme = () => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    }

    const toggleTheme = () => {
        if (theme === "dark") {
            localStorage.setItem("theme", "light");
            setTheme("light");
        } else {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    };

    useEffect(() => {
        applyTheme(theme);
        const saved = localStorage.getItem("auth");
        if (saved) {
            const user = JSON.parse(saved);
            setUsername(user.name);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "auth") {
                if (e.newValue) {
                    const user = JSON.parse(e.newValue);
                    setUsername(user.name);
                } else {
                    setUsername("");
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const logout = () => {
        localStorage.removeItem("auth");
        window.location.href = "/login";
    };

    return (
        <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow z-50 transition-colors">
            <div className="flex items-center py-4 px-12 justify-between">
                <div className="flex flex-row gap-6">
                    <button onClick={toggleTheme} className="cursor-pointer duration-300 hover:rotate-180">
                        {theme === "dark" ? (
                            <IoIosMoon className="text-4xl dark:text-white" />
                        ) : (
                            <LuSun className="text-4xl dark:text-white" />
                        )}
                    </button>
                    <button onClick={setDefaultOsTheme} className="text-gray-900 dark:text-white cursor-pointer dark:hover:bg-gray-600 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded text-base">
                        Default
                    </button>
                </div>

                <a href="/" className="text-2xl font-medium p-4 rounded hover:bg-gray-200 duration-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white">
                    Home
                </a>

                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="text-gray-900 dark:text-white cursor-pointer dark:hover:bg-gray-600 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded text-base"
                    >
                        {username}
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute text-gray-900 right-0 mt-2 w-full dark:text-white bg-white dark:bg-gray-700 shadow flex flex-col rounded">
                            <button
                                onClick={() => navigate("/profil")}
                                className="text-left px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Profil
                            </button>
                            <button
                                onClick={logout}
                                className="text-left px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}