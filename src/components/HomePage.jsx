import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">Welcome to Our Website!</h1>
            <p className="text-lg mb-6">Ready to get started?</p>
            
            <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded inline-block shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                Login Now
            </Link>
        </div>
    );
};

export default HomePage;