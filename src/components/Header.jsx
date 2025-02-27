import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountData } from '../redux/slices/accountSlice';
import { setESimData } from '../redux/slices/eSimSlice';
import { performSearch } from '../utils/searchUtils';

const Header = ({ accounts }) => {
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState(null);
    const [searchType, setSearchType] = useState('Account Name');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const activeItem = useSelector((state) => state.activeMenu.activeItem);

    const searchOptions = [
        { value: 'account_name', label: 'Account Name' },
        { value: 'eSim_iccid', label: 'ICCID' },
        { value: 'eSim_msisdn', label: 'MSISDN' },
        { value: 'eSim_activation', label: 'eSIM Activation code' },
        { value: 'account', label: 'Account' },
        { value: 'customer_name', label: 'Customer Name' },
        { value: 'customer_email', label: 'Customer Email' },
    ];

    // Create debounced search function
    const debouncedSearch = useCallback(
        debounce((searchType, query) => {
            if (!query && searchType !== 'account') return;
            
            const fetchSearchData = async () => {
                console.log("####### searchType: ", searchType);
                try {
                    const data = await performSearch(searchType, query);
                    
                    if (searchType === 'account' || searchType === 'account_name') {
                        dispatch(setAccountData(data.account));
                    } else if (searchType.startsWith('eSim_')) {
                        dispatch(setESimData(data.eSim));
                    }
                } catch (err) {
                    console.error("Error: ", err);
                    setError('Error fetching data');
                }
            };
    
            fetchSearchData();
        }, 500),
        [dispatch]
    );

    // Effect to trigger search when query changes
    useEffect(() => {
        console.log("searchType: ", searchType);
        if ((searchQuery && searchQuery.length > 2) || searchType === 'account') {
            console.log("start search");
            debouncedSearch(searchType, searchQuery);
        }
    }, [searchQuery, searchType]);

    const handleSearchTypeChange = (selectedOption) => {
        setSearchType(selectedOption.value);
        setSearchQuery('');
        setSelectedAccount(null);
        setSearchData(null);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAccountChange = (selectedOption) => {
        setSelectedAccount(selectedOption);
    };

    const handleExportCSV = () => {
        // Dummy data for CSV export
        const data = searchData?.account?.nodes || searchData?.eSim?.nodes || searchData?.customer?.nodes || [];

        const csvContent = [
            data.length > 0 ? Object.keys(data[0]) : [],
            ...data.map(item => [data.length > 0 ? Object.values(item) : []]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'search_results.csv');
    };

    return (
        <header className='container'>
            <div className='search-bar px-2 py-2 flex items-center justify-between'>
                <Select
                    value={searchOptions.find(option => option.value === searchType)}
                    onChange={handleSearchTypeChange}
                    options={searchOptions}
                />
                {searchType === 'Account' ? (
                    <Select
                        className='search-input color-black'
                        value={selectedAccount}
                        onChange={handleAccountChange}
                        options={accounts.map(account => ({ value: account.id, label: account.name }))}
                    />
                ) : (
                    <input
                        className='search-input mx-2 rounded-xl flex-grow'
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder={`Search by ${searchType}`}
                    />
                )}
                <button onClick={handleExportCSV}>Export CSV</button>
            </div>
        </header>
    );
};

export default Header;