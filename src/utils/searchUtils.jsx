import { fetchGraphQL } from './wpApi';
import { queries } from './queries';

export const performSearch = async (searchType, searchQuery) => {
    try {
        let query;
        let variables = {};

        switch (searchType) {
            case 'account':
                query = queries.account;
                break;
            case 'account_name':
                query = queries.searchAccount;
                variables = { name: searchQuery };
                break;
            case 'esim_iccid':
                query = queries.searchESim.byIccid;
                variables = { iccid: searchQuery };
                break;
            case 'esim_msisdn':
                query = queries.searchESim.byMsisdn;
                variables = { msisdn: searchQuery };
                break;
            case 'esim_activation':
                query = queries.searchESim.byActivation;
                variables = { activation: searchQuery };
                break;
            case 'customer_name':
                query = queries.customer.byName;
                variables = { name: searchQuery };
                break;
            case 'customer_email':
                query = queries.customer.byEmail;
                variables = { email: searchQuery };
                break;
            default:
                throw new Error(`Unsupported search type: ${searchType}`);
        }

        const response = await fetchGraphQL(query, variables);
        return response.data;
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
};