import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <ul className="flex flex-wrap md:flex-nowrap justify-between navbar items-center bg-gradient-to-r from-green-300 via-white to-red-300 p-4 shadow-md">
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
                    to="/newOrder" 
                    className="navbar-link text-xl font-serif italic text-black hover:text-red-800 transition duration-200"
                >
                    New Order
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
            
            {localStorage.getItem("shepherds_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link 
                        to="" 
                        className="navbar-link text-xl font-serif italic text-black hover:text-red-800 transition duration-200"
                        onClick={() => {
                            localStorage.removeItem("shepherds_user")
                            navigate("/login", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : ( 
                ""
            )}
        </ul>
    )
}