import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600">
                    UserApp
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600">
                        Home Page
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150">
                        Sign Up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;