import React, { useEffect, useState } from 'react';

import { fetchGraphQL } from '../utils/wpApi';

const AccountRows = () => {
    const [accountRows, setAccountRows] = useState([]);
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
                setAccountRows(response.data.account.nodes);
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
        <div className="account-rows-holder">
            <h2>Accounts</h2>
            <div className="account-rows">
                {accountRows.map((accountRow) => (
                    <div key={accountRow._ID} className="account-row">
                        <h3>{accountRow.account_name}</h3>
                        <p>{accountRow.account_owner}</p>
                        <p>{accountRow.account_balance}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountRows;