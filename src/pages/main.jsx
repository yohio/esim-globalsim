import { useState, useEffect } from 'react';
import { withAuth } from '../utils/withAuth';
import { wpApi } from '../utils/wpApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { performSearch } from '../utils/searchUtils';
import { setAccountData } from '../redux/slices/accountSlice';

const MainPage = ({ user }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const { token, id } = useSelector((state) => state.user);
    const userData = useSelector((state) => state.user);
    // Update selector to properly access account data
    const accountData = useSelector((state) => {
        console.log('Full Redux State:', state);
        console.log('Account State:', state.accounts);
        return state.accounts?.data || { nodes: [] };
    });
    const activeItem = useSelector((state) => state.activeMenu.activeItem);
    if (activeItem === 'Accounts') {
        const searchResults = performSearch('account', '').then((data) => {
            dispatch(setAccountData(data.account));
        });   
    };
    
    // const eSimData = useSelector((state) => state.eSim.data);
accountData
    useEffect(() => {

        // Initial user data from props
        if (user) {
            dispatch(setUser(user));
        }

        const fetchUserData = async () => {
            try {
                const response = await wpApi.get(`/wp/v2/users/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                
                // Dispatch full user data to Redux store
                dispatch(setUser({
                    ...response.data,
                    token: user.token,
                    id: user.id
                }));
            } catch (error) {
                console.log('Error fetching user data:', error);
                setErrorMessage('Error fetching user data.');
                setTimeout(() => setErrorMessage(''), 3000);
            }
        };
        
        fetchUserData();
    }, [user, dispatch]);

    const renderTableHeaders = () => {
        if (!accountData?.nodes?.[0]) return null;

        const columns = Object.keys(accountData.nodes[0]);
        
        return (
            <div className="bg-gray-50 flex border-b">
                {columns.map((column) => (
                    <div key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider flex-1">
                        {column.replace(/_/g, ' ')}
                    </div>
                ))}
            </div>
        );
    };

    const renderTableRows = () => {
        if (!accountData?.nodes) return null;

        return (
            <div className="bg-white divide-y divide-gray-200">
                {accountData.nodes.map((node, index) => (
                    <div key={index} className="flex hover:bg-gray-50">
                        {Object.values(node).map((value, cellIndex) => (
                            <div key={cellIndex} className="px-6 py-4 whitespace-nowrap flex-1">
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    if (!token || !id) {
        return <div>Failed to load profile</div>;
    };

    return (
        <section className="border-red-500 min-h-screen flex w-full lg:w-100">
			<div className="container mx-auto p-4">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="w-full">
                    {accountData ? (
                        <div>
                            {renderTableHeaders()}
                            {renderTableRows()}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No search results to display
                        </div>
                    )}
                </div>
            </div>
        </div>  
        </section>
    );
};


export const getServerSideProps = withAuth(async (context) => {
    return {
        props: {
            user: context.user,
        },
        notFound: false,
    };
});

export default MainPage;