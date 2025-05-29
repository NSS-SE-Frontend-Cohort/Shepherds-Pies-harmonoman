import { Link } from "react-router-dom"

export const Navbar = () => {

    return (
        <ul className="flex flex-wrap md:flex-nowrap justify-between navbar items-center bg-gradient-to-r from-green-600 via-white to-red-600 p-4 shadow-md rounded-b-xl">
            <li className="navbar-item">
                <Link 
                    to="/" 
                    className="navbar-link text-xl font-serif italic text-black hover:text-red-800 transition duration-200"
                >
                    Orders
                </Link>
            </li>
            <li className="navbar-item">
                <Link 
                    to="/employees" 
                    className="navbar-link text-xl font-serif italic text-black hover:text-red-800 transition duration-200"
                >
                    Employees
                </Link>
            </li>
            <li className="navbar-item">
                <Link 
                    to="/toppings" 
                    className="navbar-link text-xl font-serif italic text-black hover:text-red-800 transition duration-200"
                >
                    Toppings
                </Link>
            </li>
            <li className="navbar-item">
                <Link 
                    to="/logout" 
                    className="navbar-link text-xl font-serif italic text-black hover:text-red-800 transition duration-200"
                >
                    Logout
                </Link>
            </li>
        </ul>
    )
}