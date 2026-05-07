import { NavLink } from "react-router"

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <NavLink
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-indigo-600"
                >
                    RRV7 CRUD
                </NavLink>

                <div className="flex items-center gap-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                                : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`
                        }
                    >
                        Items
                    </NavLink>

                    <NavLink
                        to="/new"
                        className={({ isActive }) =>
                            `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                                : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`
                        }
                    >
                        Create Item
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}