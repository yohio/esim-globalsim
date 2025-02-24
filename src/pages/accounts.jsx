import AccountRows from '../components/AccountRows';

const Accounts = () => {
	return (
		<section className="border-red-500 min-h-screen flex items-center justify-center w-full lg:w-[800px]">
			<div className="bg-white dark:bg-dark p-10 rounded-2xl shadow-lg w-full">
				<AccountRows />
			</div>
		</section>
	);
};

export default Accounts;