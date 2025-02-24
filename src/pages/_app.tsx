import "@/styles/globals.css";
import { Provider } from 'react-redux';
import { store } from '../utils/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from "next/app";
import Header from '../components/Header';
import { Inter } from "next/font/google";
import ThemeSwitcher from '../components/ThemeSwitcher';
import MenuSidebar from '../components/MenuSidebar';
import React, { useEffect, useState } from 'react';
import { fetchGraphQL } from '../utils/wpApi';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

	const [accountData, setAccountData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccountData = async () => {
            const query = `
                {
                    account {
                        nodes {
                            _ID
                            account_balance
                            account_name
                            account_owner
                        }
                    }
                }
            `;
            try {
                const response = await fetchGraphQL(query);
                console.log("Response: ", response);
                setAccountData(response.data.account.nodes);
            } catch (err) {
                console.log("Error: ", err);
                setError('Error fetching menu data');
            } finally {
                setLoading(false);
            }
        };

        fetchAccountData();
    }, []);

    if (loading) return <div>Loading Accounts...</div>;
    if (error) return <div>{error}</div>;
    
	return (
		<Provider store={store}>
			<Header accounts={accountData} />
			<div className="flex max-h-screen"> 
			<MenuSidebar/>                 
				<GoogleOAuthProvider clientId={clientId}>
					<div className={`flex max-h-screen flex-col items-center justify-between mx-10 flex-grow ${inter.className}`}>
						<Component {...pageProps} />
					</div>
					<ThemeSwitcher />
				</GoogleOAuthProvider>
			</div>
		</Provider>
	);
}