import Image from 'next/image';
import { useState } from 'react';
import { FaTimes, FaTimesCircle } from 'react-icons/fa';
import loginBg from '../assets/images/login-bg.jpeg';
// import AuthWithGoogle from '../components/AuthWithGoogle'; // Bring in the AuthWithGoogle component when you're ready to implement Google OAuth
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
	const [errorMessage, setErrorMessage] = useState('');

  	return (
		<section className="border-red-500 min-h-screen flex items-center justify-center w-full lg:w-[800px]">
			<div className="bg-white dark:bg-dark flex flex-col md:flex-row gap-10 p-10 rounded-2xl shadow-lg w-full">
				<div className="md:w-1/2">
					{errorMessage && (
						<div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto bg-red-500 text-white p-4 rounded-md shadow-lg transition duration-300 ease-in-out transform translate-y-0">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FaTimes className="w-6 h-6 mr-2" />
									<p dangerouslySetInnerHTML={{ __html: errorMessage }} />
								</div>
								<button onClick={() => setErrorMessage('')} className="text-white ml-3 focus:outline-none">
									<FaTimesCircle className="w-6 h-6" />
								</button>
							</div>
						</div>
					)}
					
					<LoginForm setErrorMessage={setErrorMessage} />
				</div>
				<div className="w-1/2 md:block hidden">
					<Image
						src={loginBg}
						className="rounded-2xl h-full object-cover"
						alt="page img"
						width={360}
						height={550}
						/>
				</div>
			</div>
		</section>
	);
};

export default LoginPage;