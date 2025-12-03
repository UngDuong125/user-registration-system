const HomePage = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Welcome
            </h1>
            <div className="space-x-4">
                <a href="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-indigo-700 transition duration-300">
                    Sign Up
                </a>
                <a href="/login" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl text-lg hover:bg-indigo-50 transition duration-300">
                    Login
                </a>
            </div>
        </div>
    );
};

export default HomePage;