import { useState } from 'react';
import { useRouter } from 'next/router';
import UpdateProfile from '../components/UpdateProfile';
import { withAuth } from '../utils/withAuth';

const ProfilePage = ({ user }) => {
    const router = useRouter();
    const [token, setToken] = useState(user.token);
    const [userId, setUserId] = useState(user.id);

    const handleClose = () => {
        router.back();
    };

    if (!token || !userId) {
        return <div>Failed to load profile</div>;
    }

    return (
        <section className="border-red-500 min-h-screen flex items-center justify-center w-full lg:w-[800px]">
            <div className="bg-white dark:bg-dark p-10 rounded-2xl shadow-lg w-full relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <UpdateProfile token={token} userId={userId} />
            </div>
        </section>
    );
};

export const getServerSideProps = withAuth(async (context) => {
    console.log("User: ", context.user);
    return {
        props: {
            user: context.user,
        },
        notFound: false,
    };
});

export default ProfilePage;