import { useState, useEffect } from 'react';
import { withAuth } from '../utils/withAuth';
import { wpApi } from '../utils/wpApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { performSearch } from '../utils/searchUtils';
import { setAccountData, setLoadingAccount } from '../redux/slices/accountSlice';
import { setESimData } from '../redux/slices/eSimSlice';

const MainPage = ({ user }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const { token, id } = useSelector((state) => state.user);
    const userData = useSelector((state) => state.user);
    const activeItem = useSelector((state) => state.activeMenu.activeItem);
    
    // Add eSim data selector
    const eSimData = useSelector((state) => state.eSim?.data || { nodes: [] });
    const accountData = useSelector((state) => state.accounts?.data || { nodes: [] });
    const accountLoading = useSelector((state) => state.accounts?.loading || false);
    
    useEffect(() => {
        let mounted = true;

        const fetchAccounts = async () => {
            if ((activeItem !== 'Accounts' && activeItem !== 'Subscriber') || accountLoading
            ) return;

            try {
                dispatch(setLoadingAccount(true));
                console.log("fetching data");
                switch (activeItem) {
                    case 'Accounts':
                        console.log("fetching accounts");
                        const accountResponse = await performSearch('account', '');
                        if (mounted) {
                            dispatch(setAccountData(accountResponse.account));
                        }
                        break;
                    case 'Subscriber':
                        console.log("fetching eSim");
                        const eSimResponse = await performSearch('esim', '');
                        if (mounted) {
                            dispatch(setESimData(eSimResponse.eSim));
                        }
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (mounted) {
                    setErrorMessage(`Failed to fetch ${activeItem.toLowerCase()} data`);
                }
            } finally {
                if (mounted) {
                    dispatch(setLoadingAccount(false));
                }
            }
        };

        fetchAccounts();

        return () => {
            mounted = false;
        };
    }, [activeItem, dispatch]);

    useEffect(() => {

        // Initial user data from props
        if (user && user !== userData) {
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

    const renderTableHeaders = (data) => {
        // Return null if data is empty or undefined
        if (!data || !Array.isArray(data) || data.length === 0) return null;

        // Get columns from the first item
        const columns = Object.keys(data[0]);
        
        return (
            <div className="bg-gray-50 flex border-b">
                {columns.map((column) => (
                    <div 
                        key={column} 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider flex-1"
                    >
                        {column.replace(/_/g, ' ')}
                    </div>
                ))}
            </div>
        );
    };

    const renderTableRows = (data) => {
        // Return null if data is empty or undefined
        if (!data || !Array.isArray(data) || data.length === 0) return null;

        return (
            <div className="bg-white divide-y divide-gray-200">
                {data.map((node, index) => (
                    <div key={index} className="flex hover:bg-gray-50">
                        {Object.values(node).map((value, cellIndex) => (
                            <div 
                                key={cellIndex} 
                                className="px-6 py-4 whitespace-nowrap flex-1"
                            >
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    // Update the visualData assignment to handle nested data structure
    const visualData = activeItem === 'Accounts' 
        ? accountData?.nodes || []
        : activeItem === 'Subscriber'
            ? eSimData?.nodes || []
            : [];

    if (!token || !id) {
        return <div>Failed to load profile</div>;
    };

    return (
        <section className="border-red-500 min-h-screen flex w-full lg:w-100">
			<div className="container mx-auto p-4">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="w-full text-black">
                    {visualData.length > 0 ? (
                        <div>
                            {renderTableHeaders(visualData)}
                            {renderTableRows(visualData)}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No data to display
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