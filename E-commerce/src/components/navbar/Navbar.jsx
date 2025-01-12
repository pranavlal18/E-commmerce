import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../searchBar/SearchBar";

const Navbar = () => {
    // Retrieve the user data from localStorage
    const user = JSON.parse(localStorage.getItem('users'));

    // Navigation hook
    const navigate = useNavigate();

    // Logout function
    const logout = () => {
        localStorage.removeItem('users'); // Only remove 'users' key
        navigate("/login");
    };

    // Navigation list items
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Products */}
            <li>
                <Link to={'/allproduct'}>All Products</Link>
            </li>

            {/* Signup */}
            {!user && (
                <li>
                    <Link to={'/signup'}>Signup</Link>
                </li>
            )}

            {/* Login */}
            {!user && (
                <li>
                    <Link to={'/login'}>Login</Link>
                </li>
            )}

            {/* User Dashboard */}
            {user?.role === "user" && (
                <li>
                    <Link to={'/userdashboard'}>User Dashboard</Link>
                </li>
            )}

            {/* Admin Dashboard */}
            {user?.role === "admin" && (
                <li>
                    <Link to={'/admindashboard'}>Admin Dashboard</Link>
                </li>
            )}

            {/* Logout */}
            {user && (
                <li className="cursor-pointer" onClick={logout}>
                    Logout
                </li>
            )}

            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart (0) {/* Replace 0 with dynamic cart count in the future */}
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-blue-600 sticky top-0 z-50">
            {/* Main Container */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
                {/* Left Section */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl text-center">
                            E-Store
                        </h2>
                    </Link>
                </div>

                {/* Navigation List */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* User Greeting and Search Bar */}
                <div className="flex items-center space-x-4">
                    {user && (
                        <span className="text-white font-medium">
                            Welcome, {user.name || "Guest"}!
                        </span>
                    )}
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
